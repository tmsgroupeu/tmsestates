/* FULL REPLACEMENT: src/app/api/chat/route.ts */
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { fetchProperties } from '@/lib/cms';
import { z } from 'zod';
import { Resend } from 'resend';

export const maxDuration = 30;

// Initialize Email Client
// If the key is missing during dev, it handles it gracefully in the execute function
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const API_URL = process.env.STRAPI_API_URL || "https://tmsestates.onrender.com";

const getFullImageUrl = (url: string) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // --- 1. FETCH LIVE PROPERTY INDEX ("Memory") ---
    let properties = [];
    try {
      const response = await fetchProperties({
        "pagination[pageSize]": "100",
        // We fetch only essential fields for the AI context window
        "fields[0]": "title",
        "fields[1]": "city",
        "fields[2]": "slug",
        "fields[3]": "bedrooms",
      });
      properties = response.data || [];
    } catch (error) {
      console.error("Strapi fetch error:", error);
    }

    const propertyContext = properties.length > 0 
      ? properties.map((p: any) => `
          - Title: "${p.title}"
          - Location: ${p.city}
          - Beds: ${p.bedrooms}
          - Slug: ${p.slug}
        `).join('\n')
      : "Database temporarily unavailable.";

    // --- 2. DEFINE CORPORATE KNOWLEDGE BASE ---
    const corporateKnowledge = `
      ABOUT TMS ESTATES:
      - We are a professional real estate agency in Limassol with over a decade of experience.
      - Member of the TMS Group (international organization).
      - Values: Integrity, Professional Excellence, Transparency.
      - Services: Property selection, Residency guidance, Legal/Tax coordination, Banking setup.

      INVESTMENT IN CYPRUS (Key Selling Points):
      - Corporate Tax: 12.5% - 15% (One of the lowest in EU).
      - Dividends: 0% tax for non-domiciled residents.
      - Inheritance/Gift Tax: 0%.
      - VAT: Reduced 5% VAT available for first primary residence.
      
      PERMANENT RESIDENCY:
      - "Fast Track": Investment of €300,000 (+VAT) in new residential property. 
      - Valid for life, covers spouse and children.
      - Leads to citizenship eligibility after 5 years of residence.

      CONTACT:
      - Email: info@tmsestates.com
      - Action: We offer private consultations for high-net-worth individuals.
    `;

    // --- 3. SYSTEM PROMPT (The Persona) ---
    const systemPrompt = `
      You are the Senior Sales Representative for TMS Estates.
      
      KNOWLEDGE BASE:
      ${propertyContext}
      
      ${corporateKnowledge}

      BEHAVIOR & RULES:
      1. **Lead Generation (High Priority):** If a user seems interested in a specific property, asking about prices, or wants a viewing, politely ask for their Name and Contact Info (Phone/Email).
         - Once they provide it, you MUST use the 'register_interest' tool immediately.
      2. **Result Handling:**
         - If 'register_interest' returns success: Confirm with "Thank you [Name], I have registered your details."
         - If 'register_interest' returns an error: Apologize and ask them to email info@tmsestates.com directly.
      3. **Property Recommendations:** If you find a matching property in the list above, use the 'show_property' tool. 
         - Do NOT list property details in text. The card will show that.
      4. **Professionalism:** Use sophisticated language. Never mention competitors.
    `;

    // --- 4. STREAM GENERATION WITH TOOLS ---
    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      messages,
      tools: {
        // TOOL A: Show Property Card
        show_property: tool({
          description: 'Show a visual property card. Use this immediately when a property matches.',
          parameters: z.object({
            slug: z.string().describe('The slug of the property'),
          }),
          execute: async ({ slug }) => {
            // Fetch FULL details only when requested
            const { data } = await fetchProperties({
              "filters[slug][$eq]": slug,
              "populate": "*",
            });
            const p = data?.[0];
            
            if (!p) return { error: 'Property not found' };

            return {
              id: p.id,
              title: p.title,
              city: p.city,
              slug: p.slug,
              bedrooms: p.bedrooms,
              area: p.area,
              imageUrl: getFullImageUrl(p.images?.[0]?.url || p.coverImage?.url) || '/placeholder.jpg',
            };
          },
        }),

        // TOOL B: Capture & Email Lead (DEBUG MODE ACTIVATED)
        register_interest: tool({
          description: 'Save user contact details and email the broker when a client wants to proceed.',
          parameters: z.object({
            name: z.string().describe('Client Name'),
            contactInfo: z.string().describe('Phone number or Email'),
            topic: z.string().describe('What they are interested in (Specific Property, General Inquiry, Residency)'),
          }),
          execute: async ({ name, contactInfo, topic }) => {
            console.log("🔔 ATTEMPTING LEAD CAPTURE:", { name, contactInfo, topic });

            // 1. Validate API Key Presence
            if (!resend) {
                console.error("❌ RESEND_API_KEY is missing on server.");
                return { 
                    success: false, 
                    error: "Configuration Error: RESEND_API_KEY is missing." 
                };
            }

            try {
              // 2. Attempt Real Email Send
              const { data, error } = await resend.emails.send({
                from: 'TMS Concierge <noreply@tmsgroupeu.com>', 
                // ⚠️ NOTE: Only send to the email you used to SIGN UP for Resend until you verify domain
                to: ['chrysostomoss@tmsgroupeu.com'], 
                subject: `🔥 New AI Lead: ${name}`,
                html: `
                  <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2 style="color: #0A2342;">New Client Inquiry</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Contact:</strong> <a href="mailto:${contactInfo}">${contactInfo}</a></p>
                    <p><strong>Interest:</strong> ${topic || 'General Inquiry'}</p>
                    <hr />
                    <p style="font-size: 12px; color: #888;">Generated by TMS AI Website Assistant</p>
                  </div>
                `
              });

              if (error) {
                console.error("❌ Resend API returned error:", error);
                // ✅ DEBUG: Return the ACTUAL error message to the UI so you can see it
                return { success: false, error: `Provider Error: ${error.message} (${error.name})` };
              }

              console.log("✅ Email sent successfully:", data);
              return { success: true, message: "Lead emailed successfully." };

            } catch (err: any) {
              console.error("❌ Network Error:", err);
              return { success: false, error: `Network Error: ${err.message}` };
            }
          },
        }),
      },
    });

    return result.toDataStreamResponse();

  } catch (error: any) {
    console.error("CRITICAL API ERROR:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
