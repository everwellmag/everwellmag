// C:\Users\Kathay\everwellmag\src\app\layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Everwell Magazine - Health & Wellness',
  description: 'Discover expert health and wellness tips, diet plans, and products at Everwell Magazine.',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large', // Hỗ trợ preview hình ảnh lớn
  },
  verification: {
    google: 'E5RD3D753jQq557Fg3lZTj1BYRwNTDV-mgF-3goTXBs',
  },
  alternates: {
    canonical: 'https://www.everwellmag.com', // Canonical rõ ràng cho trang chủ
  },
  openGraph: {
    title: 'Everwell Magazine - Health & Wellness',
    description: 'Discover expert health and wellness tips, diet plans, and products at Everwell Magazine.',
    url: 'https://www.everwellmag.com',
    siteName: 'Everwell Magazine', // Thêm site_name
    locale: 'en_US', // Thêm locale
    type: 'website',
    images: [
      {
        url: 'https://cms.everwellmag.com/Uploads/default-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Everwell Magazine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Everwell Magazine - Health & Wellness',
    description: 'Discover expert health and wellness tips, diet plans, and products at Everwell Magazine.',
    images: ['https://cms.everwellmag.com/Uploads/default-image.jpg'],
    site: '@everwellmag', // Thêm Twitter handle site
    creator: '@everwellmag', // Thêm Twitter handle creator
  },
};

// Schema Organization, WebPage, và BreadcrumbList cho trang chủ
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Everwell Magazine',
      url: 'https://www.everwellmag.com',
      logo: 'https://cms.everwellmag.com/Uploads/logo.jpg', // Thay bằng URL logo thực tế
      sameAs: [
        'https://www.facebook.com/everwellmag', // Thay bằng URL thực tế
        'https://x.com/everwellmag', // Thay bằng URL thực tế
        'https://www.instagram.com/everwellmag', // Thay bằng URL thực tế
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.everwellmag.com#webpage',
      url: 'https://www.everwellmag.com',
      name: 'Everwell Magazine - Health & Wellness',
      description: 'Discover expert health and wellness tips, diet plans, and products at Everwell Magazine.',
      publisher: {
        '@type': 'Organization',
        name: 'Everwell Magazine',
        logo: {
          '@type': 'ImageObject',
          url: 'https://cms.everwellmag.com/Uploads/logo.jpg', // Thay bằng URL logo thực tế
        },
      },
      inLanguage: 'en',
      isPartOf: {
        '@id': 'https://www.everwellmag.com#website',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.everwellmag.com',
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9CYT8WFQCV"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9CYT8WFQCV');
          `}
        </Script>
        <Script
          id="schema-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <footer className="bg-[linear-gradient(to_right,_#3B82F6,_#9333EA)] text-white py-6 w-full mx-0">
          <div className="px-4 sm:px-6 lg:px-8 text-center">
            <p className="mb-4">
              © 2025 Everwell Magazine. All rights reserved.
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <a
                href="https://www.facebook.com/everwellmag" // Thay bằng URL thực tế
                className="text-white hover:text-gray-200 transition"
              >
                Facebook
              </a>
              <a
                href="https://x.com/everwellmag" // Thay bằng URL thực tế
                className="text-white hover:text-gray-200 transition"
              >
                X
              </a>
              <a
                href="https://www.instagram.com/everwellmag" // Thay bằng URL thực tế
                className="text-white hover:text-gray-200 transition"
              >
                Instagram
              </a>
            </div>
            <p className="mt-4 text-sm text-white flex flex-wrap justify-center gap-x-2 gap-y-1">
              Contact us: <a href="mailto:support@everwellmag.com" className="hover:underline">support@everwellmag.com</a> |
              <a href="/terms" className="hover:underline">Terms</a> |
              <a href="/privacy" className="hover:underline">Privacy</a> |
              <a href="/affiliate-disclosure" className="hover:underline">Affiliate Disclosure</a> |
              <a href="/medical-disclaimer" className="hover:underline">Medical Disclaimer</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}