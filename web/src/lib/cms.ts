/* eslint-disable @typescript-eslint/no-explicit-any */
// /web/src/lib/cms.ts

import type { StrapiMedia } from "./media";

// Accept either CMS_URL (Vercel) or STRAPI_URL
const BASE_URL = process.env.CMS_URL || process.env.STRAPI_URL || "http://127.0.0.1:1337";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

// ----- low-level fetcher (kept exactly like your previous version) -----
async function baseFetch(path: string, params: Record<string, string> = {}) {
  const url = new URL(`/api${path}`, BASE_URL);
  url.search = new URLSearchParams(params).toString();

  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers,
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      // keep your previous diagnostic logging
      // (don’t throw so the UI can still render empty states)
      console.error(`Strapi fetch error: ${res.status} ${res.statusText}`, await res.text());
      return { data: null, meta: null };
    }
    return res.json();
  } catch (err) {
    console.error("Failed to fetch from Strapi:", err);
    return { data: null, meta: null };
  }
}

// ----------------- YOUR types (unchanged API) -----------------
export type Property = {
  id: number;
  title: string;
  slug: string;
  city?: string;
  address?: string;
  description?: string;
  price?: number;
  currency?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  status?: string;
  images?: StrapiMedia[];
  seoTitle?: string;
  seoDescription?: string;
};

export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: StrapiMedia;
  publishedAt?: string;
};

// ----------------- ORIGINAL functions (so existing imports work) -----------------
export async function fetchProperties(params: Record<string, string> = {}): Promise<{ data: any[]; meta?: any }> {
  const result = await baseFetch("/properties", { populate: "*", ...params });
  return { data: result.data || [], meta: result.meta };
}

export async function fetchPropertyBySlug(slug: string): Promise<any | null> {
  const { data } = await fetchProperties({
    "filters[slug][$eq]": slug,
    "pagination[pageSize]": "1",
  });
  return data?.[0] || null;
}

export async function fetchArticles(params: Record<string, string> = {}): Promise<{ data: any[]; meta?: any }> {
  const result = await baseFetch("/articles", {
    sort: "publishedAt:desc",
    "pagination[pageSize]": "3",
    populate: "*",
    ...params,
  });
  return { data: result.data || [], meta: result.meta };
}

export async function fetchArticleBySlug(slug: string): Promise<any | null> {
  const { data } = await fetchArticles({
    "filters[slug][$eq]": slug,
    "pagination[pageSize]": "1",
  });
  return data?.[0] || null;
}

// ----------------- NEW helper names (used in newer pages) -----------------
export async function getAllProperties(limit = 12) {
  return fetchProperties({
    "sort[0]": "publishedAt:desc",
    "pagination[pageSize]": String(limit),
  });
}

export async function getFeaturedProperties(limit = 8) {
  return fetchProperties({
    "filters[featured][$eq]": "true",
    "sort[0]": "publishedAt:desc",
    "pagination[pageSize]": String(limit),
  });
}

export async function getPropertyBySlug(slug: string) {
  return fetchPropertyBySlug(slug);
}

export async function getLatestArticles(limit = 6) {
  return fetchArticles({
    "sort[0]": "publishedAt:desc",
    "pagination[pageSize]": String(limit),
  });
}
