/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.everwellmag.com', // ✅ Thêm hostname Strapi
        port: '',
        pathname: '/uploads/**', // Cho phép uploads từ Strapi
      },
    ],
  },
};

module.exports = nextConfig;