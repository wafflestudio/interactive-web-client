/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    console.log("rewrites called");
    return [
      {
        source: "/ping/",
        destination: "http://iwe-server.shop/ping/",
      },
      {
        source: "/api/:path*",
        destination: "http://iwe-server.shop/api/v1/:path*/",
      },
    ];
  },
};

module.exports = nextConfig;
