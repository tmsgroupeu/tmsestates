// src/lib/cms.ts

export type StrapiImageFormat = {
  url: string;
  width: number;
  height: number;
  size?: number;
  ext?: string;
  mime?: string;
};
export type StrapiImageAttrs = {
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
};
export type MediaSingle = { data: { id: number; attributes: StrapiImageAttrs } | null };
export type MediaMulti = { data: { id: number; attributes: StrapiImageAttrs }[] };

export type PropertyEntity = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    price: number;
    location: string;
    bedrooms?: number;
    bathrooms?: number;
    area?: number; // m²
    status?: "for-sale" | "for-rent" | "sold";
    featured?: boolean;
    cover?: MediaSingle;
    gallery?: MediaMulti;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
  };
};

export type ArticleEntity = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt?: string;
    cover?: MediaSingle;
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};
export type CollectionResponse<T> = { data: T[]; meta: { pagination: Pagination } };

type QueryParams = Record<string, string>;

const CMS_URL = process.env.CMS_URL as string;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN as string;

function toQuery(params?: QueryParams): string {
  if (!params) return "";
  const usp = new URLSearchParams(params);
  return `?${usp.toString()}`;
}

async function request<T>(
  path: string,
  params?: QueryParams,
  init?: Omit<RequestInit, "headers">
): Promise<T> {
  const url = `${CMS_URL}/api/${path}${toQuery(params)}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Strapi ${path}: ${res.status} ${text}`);
  }
  return (await res.json()) as T;
}

// --- API functions ---

export async function getFeaturedProperties(limit = 8) {
  return request<CollectionResponse<PropertyEntity>>("properties", {
    "filters[featured][$eq]": "true",
    "sort[0]": "publishedAt:desc",
    "pagination[pageSize]": String(limit),
    "populate[0]": "cover",
    "populate[1]": "gallery",
    publicationState: "live",
  });
}

export async function getAllProperties(limit = 12) {
  return request<CollectionResponse<PropertyEntity>>("properties", {
    "sort[0]": "publishedAt:desc",
    "pagination[pageSize]": String(limit),
    "populate[0]": "cover",
    publicationState: "live",
  });
}

export async function getPropertyBySlug(slug: string) {
  const res = await request<CollectionResponse<PropertyEntity>>("properties", {
    "filters[slug][$eq]": slug,
    "populate[0]": "cover",
    "populate[1]": "gallery",
    publicationState: "live",
  });
  return res.data[0] ?? null;
}

export async function getLatestArticles(limit = 6) {
  return request<CollectionResponse<ArticleEntity>>("articles", {
    "sort[0]": "publishedAt:desc",
    "pagination[pageSize]": String(limit),
    "populate[0]": "cover",
    publicationState: "live",
  });
}
