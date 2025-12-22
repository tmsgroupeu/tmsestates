// web/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Configure the Image Loader
  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudinaryLoader.ts',
    // We still list the domain to allow Next.js to trust the source
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  // 2. Keep your existing build settings
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
