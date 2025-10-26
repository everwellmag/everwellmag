// src/lib/seo/generate-site-metadata.ts
import type { Metadata } from 'next';
import { SITE_DOMAIN, CMS_DOMAIN, DEFAULT_OG_IMAGE } from '@/lib/config';

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
    const images = options.openGraph?.images?.map(image =>
        image.startsWith('http')
            ? image
            : `${CMS_DOMAIN}${image.startsWith('/') ? '' : '/'}${image}`
    ) || [DEFAULT_OG_IMAGE];

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: options.keywords || ['health', 'wellness', 'everwell', 'magazine'],
        openGraph: {
            title: options.openGraph?.title || metaTitle,
            description: options.openGraph?.description || metaDescription,
            url: `${SITE_DOMAIN}`,
            type: 'website',
            images: images.map(image => ({
                url: image,
                width: 1200,
                height: 630,
                alt: `${metaTitle} - Everwell Magazine`,
                type: 'image/webp',
            })),
            siteName: 'Everwell Magazine',
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