import type { NextConfig } from "next";

// When deploying to GitHub Pages project pages (user.github.io/repo), set
// NEXT_PUBLIC_BASE_PATH to "/repo" so assets and routes resolve correctly.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Required for static export if using next/image anywhere
    unoptimized: true,
  },
  // Apply basePath/assetPrefix only when provided (e.g., project pages)
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
};

export default nextConfig;
