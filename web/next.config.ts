/* UPDATED: next.config.ts */
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

// 1. Initialize the i18n plugin
// Point this to where we created the request.ts file earlier
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// 2. Define your existing config
const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudinaryLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

// 3. Wrap and Export
export default withNextIntl(nextConfig);