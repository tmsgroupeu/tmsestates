// UPDATED: web/src/app/properties/[slug]/page.tsx
import { notFound } from 'next/navigation';
import PropertyPageClient, { Property } from '@/components/PropertyPageClient'; // Import the new client component

const API = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_API_URL || "";

// This function now correctly works in a Server Component
export async function generateStaticParams() {
  if (!API) return [];
  try {
    const res = await fetch(`${API}/api/properties?fields[0]=slug`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data?.map((item: { slug: string }) => ({ slug: item.slug })) ?? [];
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

async function fetchProperty(slug: string): Promise<Property | null> {
  if (!API) return null;
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "populate": "*",
  });
  try {
    const res = await fetch(`${API}/api/properties?${params.toString()}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0] ?? null;
  } catch (error) {
    console.error("Failed to fetch property:", error);
    return null;
  }
}

// This is now a clean Server Component
export default async function Page({ params }: { params: { slug: string } }) {
  const property = await fetchProperty(params.slug);

  if (!property) {
    notFound(); // Use Next.js's built-in 404 handler
  }

  // Pass the server-fetched data to the client component for rendering
  return <PropertyPageClient property={property} />;
}
