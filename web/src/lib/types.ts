export type SearchParams = {
  status?: string;
  city?: string;
  min?: string;
  max?: string;
};

type StrapiMedia = {
  url?: string;
  alternativeText?: string;
  formats?: any;
};

type ProjectRelation = {
  id?: number;
  title?: string;
  Title?: string;
  slug?: string;
  location?: string;
  Location?: string;
  locationLink?: string | null;
  coverImage?: StrapiMedia | StrapiMedia[];
};

export type Property = {
  id: number;
  title?: string;
  slug: string;
  description?: any;
  city?: string;
  address?: string;
  locationLink?: string | null;
  area?: number | string | null;
  bedrooms?: number | string | null;
  bathrooms?: number | string | null;
  propertyType?: string | null;
  price?: number | null;
  currency?: "EUR" | "USD" | "GBP" | null;
  prop_status?: "for-sale" | "for-rent" | "sold" | "rented" | null;
  marketing_label?: string | null;
  marketing_tags?: string | null;
  vip?: boolean;
  images?: StrapiMedia[] | { data?: any[] };
  project?: ProjectRelation | { data?: ProjectRelation } | null;
};
