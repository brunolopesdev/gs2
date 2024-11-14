import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY,
  },
};

export default nextConfig;
