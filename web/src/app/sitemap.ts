// app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://<your-vercel-domain>.vercel.app";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://<your-render-app>.onrender.com";

export const revalidate = 3600;        // Rebuild sitemap at most once per hour
export const dynamic = "force-static"; // Generate at build/ISR, cache by default

async function safeJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/properties`, lastModified: new Date() },
  ];

  // ---- Properties (Strapi v4-friendly) ----
  const props = await safeJson<any>(
    `${API_URL}/api/properties?pagination[pageSize]=200&fields=slug,updatedAt`
  );
  const propItems =
    (props?.data ?? []).flatMap((d: any) => {
      const slug = d?.attributes?.slug ?? d?.slug ?? null;
      const updated = d?.attributes?.updatedAt ?? d?.updatedAt ?? null;
      return slug
        ? [{ url: `${BASE_URL}/properties/${slug}`, lastModified: updated ? new Date(updated) : new Date() }]
        : [];
    }) ?? [];
  urls.push(...propItems);

  // ---- Articles (optional) ----
  const arts = await safeJson<any>(
    `${API_URL}/api/articles?pagination[pageSize]=200&fields=slug,updatedAt`
  );
  const artItems =
    (arts?.data ?? []).flatMap((d: any) => {
      const slug = d?.attributes?.slug ?? d?.slug ?? null;
      const updated = d?.attributes?.updatedAt ?? d?.updatedAt ?? null;
      return slug
        ? [{ url: `${BASE_URL}/insights/${slug}`, lastModified: updated ? new Date(updated) : new Date() }]
        : [];
    }) ?? [];
  urls.push(...artItems);

  return urls;
}
