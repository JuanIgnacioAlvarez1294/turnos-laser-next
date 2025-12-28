/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {

    unoptimized: false,
    
    formats: ['image/avif', 'image/webp'],

    deviceSizes: [320, 375, 420, 640, 768, 1024, 1280],
    imageSizes: [200, 300, 400, 520, 640, 800],

    // 🧠 Cache largo (Firebase lo aprovecha)
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  },
};

module.exports = nextConfig;