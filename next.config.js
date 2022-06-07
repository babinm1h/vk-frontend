/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    SERVER_URL: process.env.SERVER_URL
  },
  images: {
    domains: ['vk.com', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig
