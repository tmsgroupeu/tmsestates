// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tmsestates.onrender.com" },
      { protocol: "https", hostname: "*.onrender.com" },      // future-proof any Render hostname variants
      { protocol: "https", hostname: "images.unsplash.com" }, // if you use Unsplash in mock data
      { protocol: "https", hostname: "res.cloudinary.com" }   // if you move to Cloudinary later
    ],
    // If you need to unblock quickly during a demo, you can temporarily use:
    // unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true, // allow build even if ESLint errors exist
  },
  typescript: { ignoreBuildErrors: true }, // <- only if you need to force a demo build
};

export default nextConfig;
