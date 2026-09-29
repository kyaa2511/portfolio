import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  // The default image loader needs a runtime server, which a static export does not have.
  images: { unoptimized: true },
};

export default nextConfig;
