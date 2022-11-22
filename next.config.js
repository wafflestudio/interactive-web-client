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
  async rewrites() {
    console.log("rewrites called");
    return [
      {
        source: "/api/:path*",
        destination: "https://webgam-server.shop/api/v1/:path*/",
      },
      {
        source: "/aws-image/:path*",
        destination: "https://webgam-server.s3.amazonaws.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
