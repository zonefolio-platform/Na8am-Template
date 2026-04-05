import type { NextConfig } from "next";
import { tmpdir } from "os";
import { join } from "path";

const nextConfig: NextConfig = {
  // In development, redirect .next to local /tmp so Turbopack's dev cache
  // lands on the fast local filesystem instead of the external SSD.
  // Production builds still output to .next inside the project.
  distDir:
    process.env.NODE_ENV === "development"
      ? join(tmpdir(), "na8am-next")
      : ".next",

  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
