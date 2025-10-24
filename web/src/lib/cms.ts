export type Property = {
  id: number;
  attributes: {
    title: string; slug: string;
    status: 'for-sale'|'for-rent'|'sold';
    price: number; currency: string;
    city: string; address?: string;
    bedrooms?: number; bathrooms?: number; area?: number;
    description?: string;
    seoTitle?: string; seoDescription?: string;
    images?: { data: Array<{ attributes: { url: string; alternativeText?: string } }> };
    publishedAt: string; updatedAt: string;
  };
};

const CMS = process.env.CMS_API_URL!;

export async function fetchProperties(params: Record<string,string> = {}) {
  const query = new URLSearchParams({
    'sort[0]': 'publishedAt:desc',
    'populate[images]': 'true',
    ...params,
  });
  const res = await fetch(`${CMS}/api/properties?${query}`, { next: { tags: ['properties'] } });
  if (!res.ok) throw new Error('Failed to fetch properties');
  return res.json() as Promise<{ data: Property[] }>;
}

export async function fetchPropertyBySlug(slug: string) {
  const q = new URLSearchParams({ 'filters[slug][$eq]': slug, 'populate[images]': 'true' });
  const res = await fetch(`${CMS}/api/properties?${q}`, { next: { tags: [`property-${slug}`] } });
  if (!res.ok) throw new Error('Failed to fetch property');
  const json = await res.json() as { data: Property[] };
  return json.data[0] ?? null;
}
