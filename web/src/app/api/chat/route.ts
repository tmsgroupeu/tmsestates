/* UPDATED: src/app/api/chat/route.ts */
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { fetchProperties } from '@/lib/cms';
import { z } from 'zod';

export const maxDuration = 30;

const API_URL = process.env.STRAPI_API_URL || "https://tmsestates.onrender.com";

const getFullImageUrl = (url: string) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Fetch "Memory"
    let properties = [];
    try {
      const response = await fetchProperties({
        "pagination[pageSize]": "100",
        "fields[0]": "title",
        "fields[1]": "city",
        "fields[2]": "slug",
        "fields[3]": "bedrooms",
        // propertyType removed to prevent 400 error
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

    // 2. THE STRICT PERSONA
    const systemPrompt = `
      You are a Senior Sales Representative for TMS Estates, a luxury real estate agency in Cyprus.
      
      YOUR GOAL:
      Help the user find a property from OUR portfolio and get them to book a consultation.

      YOUR KNOWLEDGE BASE (Our Live Portfolio):
      ${propertyContext}

      STRICT BRAND RULES:
      1. **NO COMPETITORS:** Never mention other agencies, websites, or general market listings. If it's not in the list above, we don't represent it.
      2. **NO REPETITION:** When you recommend a property, you MUST use the 'show_property' tool. 
         - **CRITICAL:** Do NOT write the details (beds, location, title) in your text message. The Card will show that.
         - Your text should just be a polite hook. 
         - BAD: "I have the Azure Villa. It has 5 beds and is in Limassol." [Card]
         - GOOD: "Based on your needs, I highly recommend this exclusive villa." [Card]
      3. **PROFESSIONAL TONE:** You are helpful, discreet, and sophisticated. Use "We" and "Our portfolio".
      4. **THE PIVOT:** If a user asks for something we don't have (e.g. "Cheap studio in Nicosia"), politely say: "Our portfolio focuses on luxury residences in Limassol and Paphos. However, may I suggest looking at..." and show a relevant high-end option.
    `;

    // 3. Stream
    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      messages,
      tools: {
        show_property: tool({
          description: 'Show a visual property card. Use this immediately when a property matches.',
          parameters: z.object({
            slug: z.string().describe('The slug of the property'),
          }),
          execute: async ({ slug }) => {
            // Fetch details for the card
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
      },
    });

    return result.toDataStreamResponse();

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}