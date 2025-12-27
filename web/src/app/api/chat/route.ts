/* UPDATED: src/app/api/chat/route.ts */
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { fetchProperties } from '@/lib/cms';
import { z } from 'zod';

export const maxDuration = 30;

// ✅ FIX 1: Hardcode the fallback to your live Render URL to guarantee connection
const API_URL = process.env.STRAPI_API_URL || "https://tmsestates.onrender.com";

const getFullImageUrl = (url: string) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log("🤖 AI Chat Started. Connecting to Strapi at:", API_URL);

  // 1. Fetch Context
  // We explicitly handle the fetch here to debug it
  let properties = [];
  try {
    const response = await fetchProperties({
      "pagination[pageSize]": "100",
      "fields[0]": "title",
      "fields[1]": "city",
      "fields[2]": "slug",
      "fields[3]": "bedrooms",
      "fields[4]": "propertyType",
    });
    properties = response.data || [];
    console.log(`✅ Success: Fetched ${properties.length} properties for AI Context.`);
  } catch (error) {
    console.error("❌ Error fetching properties for AI:", error);
  }

  // Generate the context string
  const propertyContext = properties.length > 0 
    ? properties.map((p: any) => `
        - Title: "${p.title}"
        - Location: ${p.city}
        - Type: ${p.propertyType}
        - Beds: ${p.bedrooms}
        - Slug ID: ${p.slug}
      `).join('\n')
    : "No properties currently available in the database. Apologize to the user.";

  const systemPrompt = `
    You are the Senior AI Concierge for TMS Estates in Cyprus.
    
    YOUR LIVE PORTFOLIO INDEX:
    ${propertyContext}

    RULES:
    1. Tone: Sophisticated, professional, concise.
    2. If the user asks for properties, check the INDEX above.
    3. You MUST use the 'show_property' tool to display cards if you find a match.
    4. If the portfolio index above is empty or has no matches, apologize and ask for their criteria.
  `;

  // 2. Stream Response
  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    messages,
    tools: {
      show_property: tool({
        description: 'Display a visual property card to the user.',
        parameters: z.object({
          slug: z.string().describe('The slug ID of the property to show'),
        }),
        execute: async ({ slug }) => {
          console.log("🛠️ Tool Triggered: show_property for", slug);
          const { data } = await fetchProperties({
            "filters[slug][$eq]": slug,
            "populate": "*",
          });
          
          const p = data?.[0];
          if (!p) return { error: 'Property details not found.' };

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
    },
  });

  return result.toDataStreamResponse();
}