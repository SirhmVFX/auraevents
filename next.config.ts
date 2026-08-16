import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Cursor opens the parent mywebsites folder; pin Turbopack to this app
  // so CSS imports like `tailwindcss` resolve from auraevents/node_modules.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
