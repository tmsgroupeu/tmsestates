/* Fully Updated: ./lib/media.ts */

type MediaFormat = {
  url: string;
};

// This type now perfectly matches the 'image' objects in your JSON logs.
export type StrapiMedia = {
  url: string;
  alternativeText?: string;
  formats?: {
    large?: MediaFormat;
    medium?: MediaFormat;
    small?: MediaFormat;
    thumbnail?: MediaFormat;
  };
};

/**
 * Gets the URL from a Strapi media object from your specific flattened API.
 * It intelligently selects the best available image format.
 */
export function getStrapiMediaUrl(mediaObject?: StrapiMedia): string {
  // 1. If the media object or its URL is missing, return a placeholder path.
  if (!mediaObject?.url) {
    return '/placeholder.jpg'; // This file should exist in your /public folder.
  }

  // 2. Destructure the url and formats from the object directly.
  const { url, formats } = mediaObject;

  // 3. Prioritize an optimized format, falling back to the original URL.
  return formats?.large?.url || formats?.medium?.url || formats?.small?.url || url;
}