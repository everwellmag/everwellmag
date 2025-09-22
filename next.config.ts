/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.everwellmag.com',
        pathname: '/uploads/**',
      },
    ],
  },
};
module.exports = nextConfig;