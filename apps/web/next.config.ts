import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
}

export default nextConfig
