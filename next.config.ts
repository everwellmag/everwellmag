/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.everwellmag.com',
        port: '',
        pathname: '/uploads/**',
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
            value: '^(?!localhost|www\.everwellmagazine\.com|everwellmagazine\.com).*$', // Loại trừ localhost và new domain
          },
        ],
        destination: 'https://www.everwellmagazine.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;