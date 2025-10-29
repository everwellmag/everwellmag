// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // NHẤT ĐỊNH PHẢI CÓ
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.everwellmagazine.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '^(?!localhost|www\\.everwellmagazine\\.com|everwellmagazine\\.com|cms\\.everwellmagazine\\.com).*$',
          },
        ],
        destination: 'https://www.everwellmagazine.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;