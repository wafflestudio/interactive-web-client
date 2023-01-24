/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true,
  },
  async rewrites() {
    console.log("rewrites called");
    return [
      {
        source: "/ping/",
        destination: "https://iwe-server.shop/ping/",
      },
      {
        source: "/api/:path*",
        destination: "https://iwe-server.shop/api/v1/:path*/",
      },
    ];
  },
};

module.exports = nextConfig;
