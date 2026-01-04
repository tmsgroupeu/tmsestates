/* UPDATED: src/lib/cloudinaryLoader.ts */
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
  // ✅ FIX: Ignore local assets (like /tms-logo.svg) and non-Cloudinary URLs
  if (src.startsWith('/') || !src.includes('res.cloudinary.com')) {
    return src;
  }

  // Cloudinary Optimization Logic
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  const urlParts = src.split('/upload/');
  
  if (urlParts.length === 2) {
    return `${urlParts[0]}/upload/${params.join(',')}/${urlParts[1]}`;
  }

  return src;
}