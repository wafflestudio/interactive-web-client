/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          source: '/api/:path*',
          destination: 'https://iwe-server.shop/:path*'
        }
      ]
    } else {
      return []
    }
  }
}

module.exports = nextConfig
