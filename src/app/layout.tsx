import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer'; // Import the new Footer component
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
        'max-image-preview': 'large', // Support large image previews
    },
    verification: {
        google: 'E5RD3D753jQq557Fg3lZTj1BYRwNTDV-mgF-3goTXBs',
    },
    alternates: {
        canonical: 'https://www.everwellmag.com', // Clear canonical for homepage
    },
    openGraph: {
        title: 'Everwell Magazine - Health & Wellness',
        description: 'Discover expert health and wellness tips, diet plans, and products at Everwell Magazine.',
        url: 'https://www.everwellmag.com',
        siteName: 'Everwell Magazine', // Add site_name
        locale: 'en_US', // Add locale
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
            name: 'Everwell Magazine',
            url: 'https://www.everwellmag.com',
            logo: 'https://cms.everwellmag.com/Uploads/logo.jpg', // Replace with actual logo URL
            sameAs: [
                'https://www.facebook.com/everwellmag', // Replace with actual URL
                'https://x.com/everwellmag', // Replace with actual URL
                'https://www.instagram.com/everwellmag', // Replace with actual URL
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
                    url: 'https://cms.everwellmag.com/Uploads/logo.jpg', // Replace with actual logo URL
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
                <Footer /> {/* Use the imported Footer component */}
            </body>
        </html>
    );
}