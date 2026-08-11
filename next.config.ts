import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This proposal is intentionally a static, no-storage experience. Vinext
  // emits the export under dist/client for Vercel's static hosting runtime.
  output: "export",
};

export default nextConfig;
