/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.graphassets.com'],
    minimumCacheTTL: 2678400, // 31 giorni
  },
};

module.exports = nextConfig;
