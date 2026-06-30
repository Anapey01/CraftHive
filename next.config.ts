import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins:['3000-firebase-chdemogit-1780509661531.cluster-fbfjltn375c6wqxlhoehbz44sk.cloudworkstations.dev'],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  serverActions: {
    bodySizeLimit: '10mb',
  },
};

export default nextConfig;
