import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
