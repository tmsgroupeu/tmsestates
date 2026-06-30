/* FULL REPLACEMENT: src/app/api/chat/route.ts */
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { fetchProperties } from '@/lib/cms';
import { z } from 'zod';
import { Resend } from 'resend';
import { areaText, bathroomText, bedroomText, formatPropertyPrice } from '@/lib/propertyDisplay';

export const maxDuration = 30;

// Initialize Email Client
// If the key is missing during dev, it handles it gracefully in the execute function
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const leadToEmail = process.env.CONTACT_TO_EMAIL || 'info@tmsestates.com';
const leadFromEmail = process.env.CONTACT_FROM_EMAIL || 'TMS Concierge <noreply@tmsgroupeu.com>';

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
        "fields[4]": "bathrooms",
        "fields[5]": "area",
        "fields[6]": "bedroomsLabel",
        "fields[7]": "bathroomsLabel",
        "fields[8]": "areaLabel",
        "fields[9]": "price",
        "fields[10]": "currency",
        "fields[11]": "propertyType",
        "fields[12]": "prop_status",
      });
      properties = response.data || [];
    } catch (error) {
      console.error("Strapi fetch error:", error);
    }

    const propertyContext = properties.length > 0 
      ? properties.map((p: any) => `
          - Title: "${p.title}"
          - Location: ${p.city}
          - Beds: ${bedroomText(p) || 'Not specified'}
          - Baths: ${bathroomText(p) || 'Not specified'}
          - Area: ${areaText(p) || 'Not specified'}
          - Price: ${formatPropertyPrice(p)}
          - Type: ${p.propertyType || 'Property'}
          - Status: ${p.prop_status || 'Available'}
          - Slug: ${p.slug}
        `).join('\n')
      : "Database temporarily unavailable.";

    // --- 2. DEFINE CORPORATE KNOWLEDGE BASE ---
    const corporateKnowledge = `
      ABOUT TMS ESTATES:
      - TMS Estates is a Cyprus-based real estate development company.
      - We create contemporary residential and mixed-use developments in carefully selected locations.
      - Our developments may include boutique apartment buildings, standalone residences and land-driven opportunities.
      - TMS Estates is backed by the strength and heritage of TMS Group.
      - Our approach focuses on careful site evaluation, location potential, market demand, quality construction, thoughtful design and long-term value.
      - Core values: Selectivity, Integrity, Excellence and Longevity.
      - Services: project information, property availability, viewing coordination, property selection and investment guidance.

      INVESTMENT IN CYPRUS (Key Selling Points):
      - Cyprus is positioned as a strategic European real estate market with lifestyle, residency and investment appeal.
      - For tax, legal, residency and financing questions, provide general guidance only and recommend speaking with qualified advisors.
      
      PERMANENT RESIDENCY:
      - Cyprus has residency routes connected to property investment, but requirements can change.
      - Do not present legal or residency details as final advice. Invite the client to contact the TMS Estates team for current guidance.

      CONTACT:
      - Email: info@tmsestates.com
      - WhatsApp / phone: +357 99 875500
      - Action: We offer follow-up consultations for property, project and investment enquiries.
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
              bedrooms: bedroomText(p) || p.bedrooms,
              area: areaText(p) || p.area,
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
                from: leadFromEmail, 
                to: [leadToEmail], 
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
