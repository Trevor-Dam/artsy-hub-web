import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      new URL("https://trevordam-001-site1.ktempurl.com/**")
    ]
  }
};

export default nextConfig;
