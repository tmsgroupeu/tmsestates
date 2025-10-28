/* eslint-disable @typescript-eslint/no-explicit-any */

import type { StrapiMedia } from "./media";

const STRAPI_URL = process.env.STRAPI_URL || "http://127.0.0.1:1337";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

async function baseFetch(path: string, params: Record<string, string> = {}) {
  const url = new URL(`/api${path}`, STRAPI_URL);
  url.search = new URLSearchParams(params).toString();

  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers,
      next: { revalidate: 60 }
    });
    if (!res.ok) {
      console.error(`Strapi fetch error: ${res.status} ${res.statusText}`, await res.text());
      return { data: null, meta: null };
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch from Strapi:", error);
    return { data: null, meta: null };
  }
}

// --- PROPERTY TYPES & FETCHERS ---

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

export async function fetchProperties(params: Record<string, string> = {}): Promise<{ data: Property[]; meta?: any }> {
  const defaultParams = { populate: "*" };
  const mergedParams = { ...defaultParams, ...params };
  const result = await baseFetch("/properties", mergedParams);
  return { data: result.data || [], meta: result.meta };
}

export async function fetchPropertyBySlug(slug: string): Promise<Property | null> {
    const { data } = await fetchProperties({
        'filters[slug][$eq]': slug,
        'pagination[pageSize]': '1',
    });
    return data?.[0] || null;
}

// --- ARTICLE TYPES & FETCHERS ---

export type Article = {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    coverImage?: StrapiMedia; // CORRECTED TO camelCase
    publishedAt?: string;
};

export async function fetchArticles(params: Record<string, string> = {}): Promise<{ data: Article[]; meta?: any }> {
  const defaultParams = {
    sort: "publishedAt:desc",
    "pagination[pageSize]": "3",
    "populate": "*",
  };
  const mergedParams = { ...defaultParams, ...params };
  const result = await baseFetch("/articles", mergedParams);
  return { data: result.data || [], meta: result.meta };
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
    const { data } = await fetchArticles({
        'filters[slug][$eq]': slug,
        'pagination[pageSize]': '1',
    });
    return data?.[0] || null;
}
