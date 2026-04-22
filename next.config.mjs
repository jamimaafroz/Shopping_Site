/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com", // <-- This fixes your red screen error!
      },
    ],
  },
};

export default nextConfig;
