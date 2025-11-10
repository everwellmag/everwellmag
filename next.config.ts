// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Tối ưu hiệu suất build
  reactStrictMode: true,
  swcMinify: true,

  // ✅ Cấu hình ảnh (bắt buộc giữ `unoptimized: true`)
  images: {
    unoptimized: true, // Giữ nguyên để build static / deploy Netlify
    formats: ['image/avif', 'image/webp'], // hỗ trợ định dạng tối ưu
    minimumCacheTTL: 31536000, // cache ảnh 1 năm
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.everwellmagazine.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },

  // ✅ Cache headers
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

  // ✅ Redirect toàn bộ domain lạ về domain chính
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value:
              '^(?!localhost|www\\.everwellmagazine\\.com|everwellmagazine\\.com|cms\\.everwellmagazine\\.com).*$',
          },
        ],
        destination: 'https://www.everwellmagazine.com/:path*',
        permanent: true,
      },
    ];
  },

  // ✅ Tối ưu code JS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // xoá console.log khi build
  },

  // ✅ Chỉ target trình duyệt hiện đại để bỏ polyfill cũ
  browserslist: [
    'defaults and supports es6-module',
    'maintained node versions',
  ],

  experimental: {
    esmExternals: 'loose',
  },
};

module.exports = nextConfig;
