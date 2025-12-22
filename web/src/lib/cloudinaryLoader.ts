// web/src/lib/cloudinaryLoader.ts
"use client";

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // 1. If it's not a Cloudinary image (e.g. local logo), return as is.
  // This bypasses optimization for local assets, serving them raw.
  if (!src.includes('res.cloudinary.com')) {
    return src;
  }

  // 2. Setup Cloudinary Parameters
  // f_auto: Let Cloudinary choose the best format (WebP/AVIF) for the user's browser
  // q_auto: Intelligent compression (high quality, low file size)
  // w_${width}: Resize to the exact width needed by the design
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];

  // 3. Inject parameters into the URL
  // Cloudinary URLs look like: .../upload/v1234/folder/image.jpg
  // We want: .../upload/f_auto,q_auto,w_800/v1234/folder/image.jpg
  const urlParts = src.split('/upload/');
  
  if (urlParts.length === 2) {
    return `${urlParts[0]}/upload/${params.join(',')}/${urlParts[1]}`;
  }

  // Fallback if URL structure is unexpected
  return src;
}