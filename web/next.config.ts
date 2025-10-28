import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "tmsestates.onrender.com" }],
  },
  eslint: {
    ignoreDuringBuilds: true,   // ✅ allow build even if ESLint errors exist
  },
};

export default nextConfig;
