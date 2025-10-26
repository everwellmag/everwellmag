// src/lib/seo/generate-site-metadata.ts
import type { Metadata } from 'next';

interface MetadataOptions {
    title: string;
    description: string;
    keywords?: string[];
    openGraph?: {
        title?: string;
        description?: string;
        images?: string[];
    };
}

export function generateSiteMetadata(options: MetadataOptions): Metadata {
    const metaTitle = options.title;
    const metaDescription = options.description;
    const defaultImage = 'https://cms.everwellmag.com/uploads/default_image_0295f000e6.jpg';
    const images = options.openGraph?.images?.map(image =>
        image.startsWith('http')
            ? image
            : `https://cms.everwellmag.com${image.startsWith('/') ? '' : '/'}${image}`
    ) || [defaultImage];

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: options.keywords || ['health', 'wellness', 'everwell', 'magazine'],
        openGraph: {
            title: options.openGraph?.title || metaTitle,
            description: options.openGraph?.description || metaDescription,
            type: 'website',
            siteName: 'Everwell Magazine',
            images: images.map(image => ({
                url: image,
                width: 1200, // Chuẩn OG
                height: 630,
                alt: `${metaTitle} - Everwell Magazine`,
                type: 'image/webp', // Giả định WebP từ Strapi
            })),
        },
        twitter: {
            card: 'summary_large_image',
            site: '@everwellmag',
            creator: '@everwellmag',
            title: options.openGraph?.title || metaTitle,
            description: options.openGraph?.description || metaDescription,
            images: images,
        },
        other: {
            'og:image:secure_url': images[0],
            'og:image:type': 'image/webp',
            'og:image:alt': `${metaTitle} - Everwell Magazine`,
            'og:image:width': '1200',
            'og:image:height': '630',
        },
    };
}