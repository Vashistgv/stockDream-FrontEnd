// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_TARGET_API_URL: process.env.NEXT_TARGET_API_URL,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_TARGET_API_URL
          ? `${process.env.NEXT_TARGET_API_URL}/:path*`
          : "http://localhost:5000/api/:path*",
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
