import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ["9f5okpstwb.ufs.sh"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "9f5okpstwb.ufs.sh",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
