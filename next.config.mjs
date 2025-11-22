/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: process.env.REPLIT_DEV_DOMAIN 
    ? [process.env.REPLIT_DEV_DOMAIN]
    : [],
}

export default nextConfig
