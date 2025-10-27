/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.everwellmagazine.com',
        port: '',
        pathname: '/uploads/**', // Giữ nguyên, nhưng sẽ test thêm /uploads/**
      },
      {
        protocol: 'https',
        hostname: 'cms.everwellmagazine.com',
        port: '',
        pathname: '/uploads/**', // Thêm để cover case chữ thường
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '^(?!localhost|www\.everwellmagazine\.com|everwellmagazine\.com|cms\.everwellmagazine\.com).*$',
          },
        ],
        destination: 'https://www.everwellmagazine.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;