/* FULL REPLACEMENT: src/lib/cms.ts */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { StrapiMedia } from "./media";

const BASE_URL =
  process.env.CMS_URL ||
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:1337";

const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

// ----- Low-level Fetcher -----
async function baseFetch(path: string, params: Record<string, string> = {}) {
  const url = new URL(`/api${path}`, BASE_URL);
  url.search = new URLSearchParams(params).toString();

  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;

  // Debugging log to see exactly what URL is requested
  // console.log(`📡 API Request: ${url.toString()}`);

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers,
      next: { revalidate: 0 }, // Ensure fresh data for filtering
    });
    if (!res.ok) {
      console.error(`Strapi fetch error: ${res.status} ${res.statusText}`);
      const body = await res.text();
      console.error("Error Body:", body);
      return { data: null, meta: null };
    }
    return res.json();
  } catch (err) {
    console.error("Failed to fetch from Strapi:", err);
    return { data: null, meta: null };
  }
}

// ----- UPDATED PROPERTY TYPE TO MATCH STRAPI SCHEMA -----
export type Property = {
  id: number;
  title: string;
  slug: string;
  
  // Location
  city?: string;
  address?: string; 
  
  // Details
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  
  // Financial
  price?: number;
  currency?: 'EUR' | 'USD' | 'GBP';
  
  // ✅ FIX: Matched field name to 'prop_status' based on your screenshot
  prop_status?: 'for-sale' | 'for-rent' | 'sold' | 'rented';
  
  propertyType?: 'villa' | 'apartment' | 'penthouse' | 'townhouse' | 'commercial' | 'plot';
  
  // Metadata
  vip?: boolean;
  images?: StrapiMedia[];
  
  // SEO
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

// ----- API Functions -----
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