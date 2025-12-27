/* UPDATED: src/app/api/chat/route.ts */
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { fetchProperties } from '@/lib/cms';
import { z } from 'zod';

// ✅ FIX 1: Force Node.js runtime (Fixes fetch issues on Vercel)
export const runtime = 'nodejs';
export const maxDuration = 30;

const API_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const getFullImageUrl = (url: string) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // ✅ DEBUG LOG: Check if API Key and URL are loaded
    console.log("Chat Request Started");
    console.log("Strapi URL:", API_URL);
    console.log("OpenAI Key exists:", !!process.env.OPENAI_API_KEY);

    // 1. Fetch Context
    const { data: properties } = await fetchProperties({
      "pagination[pageSize]": "100",
      "fields[0]": "title",
      "fields[1]": "city",
      "fields[2]": "slug",
      "fields[3]": "bedrooms",
      "fields[4]": "propertyType",
    });

    if (!properties) {
      console.error("Failed to fetch properties from Strapi");
      // Continue without context rather than crashing
    }

    const propertyContext = properties?.map((p: any) => `
      - Title: "${p.title}"
      - Location: ${p.city}
      - Type: ${p.propertyType}
      - Beds: ${p.bedrooms}
      - Slug ID: ${p.slug}
    `).join('\n') || "No property data available.";

    const systemPrompt = `
      You are the Senior AI Concierge for TMS Estates in Cyprus.
      YOUR PORTFOLIO INDEX:
      ${propertyContext}
      RULES:
      1. Tone: Sophisticated, professional, concise.
      2. Use 'show_property' tool to display cards.
      3. If asked for something not in list, apologize and offer closest match.
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
            console.log("Tool executing for slug:", slug);
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

  } catch (error: any) {
    // ✅ FIX 2: Catch errors and log them, prevent generic client crash
    console.error("CRITICAL API ERROR:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}