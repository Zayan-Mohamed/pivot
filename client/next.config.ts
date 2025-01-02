import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ad-s3-images.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      }
    ]}
  /* config options here */
};

export default nextConfig;
