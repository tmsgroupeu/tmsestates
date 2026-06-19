import { notFound } from "next/navigation";
import PropertyPageClient, { Property } from "@/components/PropertyPageClient";
import { fetchProperties } from "@/lib/cms";

export const revalidate = 0;

export async function generateStaticParams() {
  const { data: properties } = await fetchProperties({
    "pagination[pageSize]": "50",
    "fields[0]": "slug",
  });

  if (!properties) return [];
  return properties.map((p: any) => ({ slug: p.slug, locale: "en" }));
}

async function getProperty(slug: string) {
  const { data } = await fetchProperties({
    "filters[slug][$eq]": slug,
    "populate[0]": "images",
    "populate[1]": "project.coverImage",
    "pagination[pageSize]": "1",
  });
  return data?.[0] || null;
}

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    notFound();
  }

  return <PropertyPageClient property={property as Property} />;
}
