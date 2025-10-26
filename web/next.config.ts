// next.config.ts
import type { NextConfig } from "next";

const STRAPI = process.env.STRAPI_URL || "http://127.0.0.1:1337";
const u = new URL(STRAPI);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: u.protocol.replace(":", "") as "http" | "https",
        hostname: u.hostname,
        port: u.port || (u.protocol === "https:" ? "443" : "80"),
        pathname: "/uploads/**",
      },
      // hero background etc
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
    ],
  },
  experimental: {
    turbo: {},
  },
};

export default nextConfig;
