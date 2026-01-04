/* FULL REPLACEMENT: src/app/[locale]/properties/[slug]/page.tsx */
import { notFound } from 'next/navigation';
import PropertyPageClient, { Property } from '@/components/PropertyPageClient';
import { fetchProperties } from '@/lib/cms';

export const revalidate = 0; // Ensure fresh data

// 1. Generate Static Params (Optional, helps performance)
export async function generateStaticParams() {
  const { data: properties } = await fetchProperties({ 
    "pagination[pageSize]": "50",
    "fields[0]": "slug" 
  });
  
  if (!properties) return [];
  // We return params for the default locale 'en' initially
  return properties.map((p: any) => ({ slug: p.slug, locale: 'en' }));
}

// 2. Fetch Logic
async function getProperty(slug: string) {
  const { data } = await fetchProperties({
    "filters[slug][$eq]": slug,
    "populate": "*",
  });
  return data?.[0] || null;
}

// 3. The Page Component
// ✅ FIX: Correctly type props for Next.js 15 (params is a Promise)
type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function PropertyPage({ params }: Props) {
  // ✅ FIX: Await params
  const { slug } = await params;

  const property = await getProperty(slug);

  if (!property) {
    console.error(`Property not found for slug: ${slug}`);
    notFound();
  }

  return <PropertyPageClient property={property as Property} />;
}