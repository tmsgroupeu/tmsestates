/* FULL REPLACEMENT: src/lib/cms.ts */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { StrapiMedia } from "./media";

const BASE_URL =
  process.env.CMS_URL ||
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tmsestates.onrender.com";

const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

// ----- Low-level Fetcher -----
async function baseFetch(path: string, params: Record<string, string> = {}) {
  const url = new URL(`/api${path}`, BASE_URL);
  url.search = new URLSearchParams(params).toString();

  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers,
      next: { revalidate: 0 }, 
    });
    if (!res.ok) {
      console.error(`Strapi fetch error: ${res.status} ${res.statusText}`);
      return { data: null, meta: null };
    }
    return res.json();
  } catch (err) {
    console.error("Failed to fetch from Strapi:", err);
    return { data: null, meta: null };
  }
}

// ----- TYPES -----
export type Project = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  completionDate?: string;
  completionStatus?: string; // Fallback
  location?: string;
  coverImage?: StrapiMedia | any;
  coverimage?: StrapiMedia | any;
  gallery?: StrapiMedia[] | any;
  properties?: Property[] | any;
};

export type Property = {
  id: number;
  title: string;
  slug: string;
  city?: string;
  description?: string;
  bedrooms?: number;
  area?: number;
  price?: number;
  currency?: 'EUR' | 'USD' | 'GBP';
  prop_status?: 'for-sale' | 'for-rent' | 'sold' | 'rented';
  propertyType?: 'villa' | 'apartment' | 'penthouse' | 'townhouse' | 'commercial' | 'plot';
  marketing_label?: string; 
  vip?: boolean;
  images?: StrapiMedia[];
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

export async function fetchProjects(params: Record<string, string> = {}): Promise<{ data: any[]; meta?: any }> {
  const result = await baseFetch("/projects", { sort: "publishedAt:desc", populate: "*", ...params });
  return { data: result.data ||[], meta: result.meta };
}

export async function fetchProjectBySlug(slug: string): Promise<any | null> {
  const { data } = await baseFetch("/projects", {
    "filters[slug][$eq]": slug,
    "populate[0]": "coverImage",
    "populate[1]": "gallery",
    "populate[2]": "properties.images", // ✅ Correct Strapi native deep syntax
    "pagination[pageSize]": "1",
  });
  return data?.[0] || null;
}

export async function fetchProperties(params: Record<string, string> = {}): Promise<{ data: any[]; meta?: any }> {
  const result = await baseFetch("/properties", { populate: "*", ...params });
  return { data: result.data ||[], meta: result.meta };
}

export async function fetchPropertyBySlug(slug: string): Promise<any | null> {
  const { data } = await fetchProperties({ "filters[slug][$eq]": slug, "pagination[pageSize]": "1" });
  return data?.[0] || null;
}

export async function fetchArticles(params: Record<string, string> = {}): Promise<{ data: any[]; meta?: any }> {
  const result = await baseFetch("/articles", { sort: "publishedAt:desc", "pagination[pageSize]": "3", populate: "*", ...params });
  return { data: result.data ||[], meta: result.meta };
}

export async function fetchArticleBySlug(slug: string): Promise<any | null> {
  const { data } = await fetchArticles({ "filters[slug][$eq]": slug, "pagination[pageSize]": "1" });
  return data?.[0] || null;
}