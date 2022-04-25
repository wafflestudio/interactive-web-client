/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://iwe-server.shop/:path*'
      }
    ]
  }
}

module.exports = nextConfig
