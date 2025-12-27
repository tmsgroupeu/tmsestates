/* UPDATED: src/app/api/chat/route.ts */
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { fetchProperties } from '@/lib/cms';
import { z } from 'zod';

export const maxDuration = 30;

const API_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const getFullImageUrl = (url: string) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { data: properties } = await fetchProperties({
    "pagination[pageSize]": "100",
    "fields[0]": "title",
    "fields[1]": "city",
    "fields[2]": "slug",
    "fields[3]": "bedrooms",
    "fields[4]": "propertyType",
  });

  const propertyContext = properties?.map((p: any) => `
    - Title: "${p.title}"
    - Location: ${p.city}
    - Type: ${p.propertyType}
    - Beds: ${p.bedrooms}
    - Slug ID: ${p.slug}
  `).join('\n');

  const systemPrompt = `
    You are the Senior AI Concierge for TMS Estates in Cyprus.
    YOUR PORTFOLIO INDEX:
    ${propertyContext}
    RULES:
    1. Tone: Sophisticated, professional, concise.
    2. Use 'show_property' tool to display cards.
    3. If asked for something not in list, apologize and offer closest match.
  `;

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
        // ✅ FIX 1: Explicitly type the argument here
        execute: async ({ slug }: { slug: string }) => {
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

  // ✅ FIX 2: Ensure we call the correct response method
  return result.toDataStreamResponse();
}