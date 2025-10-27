// C:\Users\Kathay\everwellmag\src\app\layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer'; // Import the new Footer component
import Script from 'next/script';
import { CMS_DOMAIN, DEFAULT_OG_IMAGE, SITE_NAME, SITE_DOMAIN } from '@/lib/config'; // Import from config.ts

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: `${SITE_NAME} - Health & Wellness`, // Use SITE_NAME
    description: 'Discover expert health and wellness tips, diet plans, and products at Everwell Magazine.',
    robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large', // Support large image previews
    },
    verification: {
        google: 'E5RD3D753jQq557Fg3lZTj1BYRwNTDV-mgF-3goTXBs',
    },
    alternates: {
        canonical: SITE_DOMAIN, // Fix typo and use SITE_DOMAIN
    },
    openGraph: {
        title: `${SITE_NAME} - Health & Wellness`,
        description: 'Discover expert health and wellness tips, diet plans, and products at Everwell Magazine.',
        url: SITE_DOMAIN,
        siteName: SITE_NAME, // Use SITE_NAME
        locale: 'en_US', // Add locale
        type: 'website',
        images: [
            {
                url: DEFAULT_OG_IMAGE,
                width: 1200,
                height: 630,
                alt: SITE_NAME,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${SITE_NAME} - Health & Wellness`,
        description: 'Discover expert health and wellness tips, diet plans, and products at Everwell Magazine.',
        images: [DEFAULT_OG_IMAGE],
        site: '@everwellmag', // Add Twitter site handle
        creator: '@everwellmag', // Add Twitter creator handle
    },
};

// Schema Organization, WebPage, and BreadcrumbList for homepage
const schema = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_DOMAIN,
            logo: `${CMS_DOMAIN}/uploads/logo.jpg`, // Use CMS_DOMAIN for logo
            sameAs: [
                'https://www.facebook.com/everwellmag', // Replace with actual URL
                'https://x.com/everwellmag', // Replace with actual URL
                'https://www.instagram.com/everwellmag', // Replace with actual URL
            ],
        },
        {
            '@type': 'WebPage',
            '@id': `${SITE_DOMAIN}#webpage`,
            url: SITE_DOMAIN,
            name: `${SITE_NAME} - Health & Wellness`,
            description: 'Discover expert health and wellness tips, diet plans, and products at Everwell Magazine.',
            publisher: {
                '@type': 'Organization',
                name: SITE_NAME,
                logo: {
                    '@type': 'ImageObject',
                    url: `${CMS_DOMAIN}/uploads/logo.jpg`, // Use CMS_DOMAIN for logo
                },
            },
            inLanguage: 'en',
            isPartOf: {
                '@id': `${SITE_DOMAIN}#website`,
            },
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: SITE_DOMAIN,
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
                <Footer /> {/* Use the imported Footer component */}
            </body>
        </html>
    );
}