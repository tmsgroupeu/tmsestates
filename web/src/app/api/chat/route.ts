import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { fetchProperties } from '@/lib/cms';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// ✅ HARDCODED FALLBACK: Ensures connection to Render if Env Vars fail on Vercel
const API_URL = process.env.STRAPI_API_URL || "https://tmsestates.onrender.com";

// Helper to ensure image URLs are absolute
const getFullImageUrl = (url: string) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log("🤖 AI Chat Started. Connecting to Strapi at:", API_URL);

    // --- 1. FETCH CONTEXT (The "Memory") ---
    let properties = [];
    try {
      // We explicitly fetch only safe fields that definitely exist.
      // ❌ REMOVED "propertyType" to fix the 400 Bad Request error.
      const response = await fetchProperties({
        "pagination[pageSize]": "100",
        "fields[0]": "title",
        "fields[1]": "city",
        "fields[2]": "slug",
        "fields[3]": "bedrooms",
      });
      
      properties = response.data || [];
      console.log(`✅ Success: Fetched ${properties.length} properties for AI Context.`);
    } catch (fetchError) {
      console.error("❌ Error fetching properties from Strapi:", fetchError);
      // We continue even if fetch fails, so the AI can at least apologize politely
    }

    // Format the data into a text block the AI can read
    const propertyContext = properties.length > 0 
      ? properties.map((p: any) => `
          - Title: "${p.title}"
          - Location: ${p.city}
          - Beds: ${p.bedrooms}
          - Slug ID: ${p.slug}
        `).join('\n')
      : "System Notification: The property database is currently empty or unreachable.";

    // --- 2. DEFINE PERSONA ---
    const systemPrompt = `
      You are the Senior AI Concierge for TMS Estates in Cyprus.
      
      YOUR LIVE PORTFOLIO INDEX:
      ${propertyContext}

      RULES:
      1. TONE: Sophisticated, professional, concise, and helpful.
      2. SEARCH STRATEGY: When the user asks for a property (e.g., "villas in Limassol"), check your PORTFOLIO INDEX above.
      3. VISUALS: If you find a matching property in the index, you MUST use the 'show_property' tool to display it. Do not just list the name.
      4. RECOMMENDATIONS: You can call the 'show_property' tool multiple times to show different options.
      5. FALLBACK: If the portfolio is empty or has no matches, politely apologize, explain you are checking the live database, and ask for their specific criteria to pass to a human agent.
    `;

    // --- 3. STREAM RESPONSE WITH TOOLS ---
    const result = streamText({
      model: openai('gpt-4o-mini'), // Fast, cheap, smart enough
      system: systemPrompt,
      messages,
      tools: {
        // Define the tool: "Show Property Card"
        show_property: tool({
          description: 'Display a visual property card to the user. Use this whenever recommending a specific property.',
          parameters: z.object({
            slug: z.string().describe('The slug ID of the property to show'),
          }),
          // The logic to run when the AI calls this tool
          execute: async ({ slug }) => {
            console.log("🛠️ Tool Triggered: show_property for", slug);
            
            // Fetch FULL details (images, etc) only for the specific property requested
            const { data } = await fetchProperties({
              "filters[slug][$eq]": slug,
              "populate": "*",
            });
            
            const p = data?.[0];
            
            if (!p) {
              console.log("❌ Property not found in DB for slug:", slug);
              return { error: 'Property details not found.' };
            }

            // Return the structured data for the UI card
            return {
              id: p.id,
              title: p.title,
              city: p.city,
              slug: p.slug,
              bedrooms: p.bedrooms,
              area: p.area,
              // Smartly grab the first image and ensure full URL
              imageUrl: getFullImageUrl(p.images?.[0]?.url || p.coverImage?.url) || '/placeholder.jpg',
            };
          },
        }),
      },
    });

    return result.toDataStreamResponse();

  } catch (error: any) {
    console.error("CRITICAL API ERROR:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}