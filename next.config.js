/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    REST_API_KEY: process.env.NEXT_PUBLIC_REST_API_KEY,
  },
}

module.exports = nextConfig
