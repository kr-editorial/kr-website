import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local, trusted brand/cover SVGs served through next/image
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
