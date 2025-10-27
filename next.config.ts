/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.everwellmag.com', // ✅ Giữ nguyên hostname Strapi
        port: '',
        pathname: '/uploads/**', // Cho phép uploads từ Strapi
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*', // Match tất cả paths
        has: [
          {
            type: 'host',
            value: '^(?!localhost).*$', // Loại trừ localhost, match mọi hostname khác
          },
        ],
        destination: 'https://www.everwellmagazine.com/:path*', // Redirect sang new domain
        permanent: true, // 301 redirect cho SEO
      },
    ];
  },
};

module.exports = nextConfig;