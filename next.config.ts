import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/ygsgixals/mern-project/**", // This allows all paths under that hostname
      },
    ],
  },
};

export default nextConfig;
