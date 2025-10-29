// src/app/sitemap.ts
import type { MetadataRoute } from "next";

// ---- Types for Strapi v4 responses ----
type StrapiItem<A> = { id: number; attributes: A };
type StrapiResponse<A> = { data: StrapiItem<A>[] };

interface PropertyAttr {
  slug: string;
  updatedAt?: string;
}

interface ArticleAttr {
  slug: string;
  updatedAt?: string;
}

// ---- Config ----
export const revalidate = 3600;        // Rebuild at most once per hour
export const dynamic = "force-static"; // Generate at build/ISR, cache by default

// Use the public site URL if provided; otherwise fall back to the Vercel URL at build/runtime.
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// Support both naming conventions for the CMS base URL.
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.CMS_URL ??
  process.env.STRAPI_URL ??
  "http://127.0.0.1:1337";

// ---- Helpers ----
async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;
    const json = (await res.json()) as T;
    return json;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/properties`, lastModified: new Date() },
  ];

  // ---- Properties ----
  const props = await getJson<StrapiResponse<PropertyAttr>>(
    `${API_URL}/api/properties?pagination[pageSize]=200&fields=slug,updatedAt`
  );
  if (props?.data) {
    for (const item of props.data) {
      const slug = item.attributes?.slug;
      if (slug) {
        const updated = item.attributes?.updatedAt;
        urls.push({
          url: `${BASE_URL}/properties/${slug}`,
          lastModified: updated ? new Date(updated) : new Date(),
        });
      }
    }
  }

  // ---- Articles (optional; keep if you have /insights/[slug]) ----
  const arts = await getJson<StrapiResponse<ArticleAttr>>(
    `${API_URL}/api/articles?pagination[pageSize]=200&fields=slug,updatedAt`
  );
  if (arts?.data) {
    for (const item of arts.data) {
      const slug = item.attributes?.slug;
      if (slug) {
        const updated = item.attributes?.updatedAt;
        urls.push({
          url: `${BASE_URL}/insights/${slug}`,
          lastModified: updated ? new Date(updated) : new Date(),
        });
      }
    }
  }

  return urls;
}
