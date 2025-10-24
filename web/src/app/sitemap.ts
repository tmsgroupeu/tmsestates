import { fetchProperties } from "@/lib/cms";
export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  const { data } = await fetchProperties();
  return [
    { url: base, lastModified: new Date() },
    ...data.map(p => ({ url: `${base}/properties/${p.attributes.slug}`, lastModified: p.attributes.updatedAt })),
  ];
}
