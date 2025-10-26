// src/lib/seo/generate-category-metadata.ts
import type { Metadata } from 'next';
import { SITE_DOMAIN, CMS_DOMAIN, DEFAULT_OG_IMAGE } from '@/lib/config';

interface CategoryMetadataOptions {
    name: string;
    slug: string;
    description?: string;
    type?: 'article' | 'product' | 'mixed';
    image?: string;
}

export function generateCategoryMetadata({ name, slug, description, type, image }: CategoryMetadataOptions): Metadata {
    const title = `${name} | Everwell Magazine`;
    const defaultDescription = type === 'article'
        ? `Explore articles about ${name} on Everwell Magazine.`
        : type === 'product'
            ? `Discover ${name} products and supplements on Everwell Magazine.`
            : `Explore articles and products about ${name} on Everwell Magazine.`;

    const categoryDescription = description || defaultDescription;
    const categoryImage = image
        ? image.startsWith('http')
            ? image
            : `${CMS_DOMAIN}${image.startsWith('/') ? '' : '/'}${image}`
        : DEFAULT_OG_IMAGE;

    return {
        title,
        description: categoryDescription,
        keywords: [
            name.toLowerCase(),
            type || 'health',
            'wellness',
            'everwell magazine',
        ],
        alternates: {
            canonical: `${SITE_DOMAIN}/${slug}`,
        },
        openGraph: {
            title,
            description: categoryDescription,
            url: `${SITE_DOMAIN}/${slug}`,
            type: 'website',
            images: [
                {
                    url: categoryImage,
                    width: 1200,
                    height: 630,
                    alt: `${name} - Everwell Magazine`,
                    type: 'image/webp',
                },
            ],
            siteName: 'Everwell Magazine',
        },
        twitter: {
            card: 'summary_large_image',
            site: '@everwellmag',
            creator: '@everwellmag',
            title,
            description: categoryDescription,
            images: categoryImage,
        },
        other: {
            'og:image:secure_url': categoryImage,
            'og:image:type': 'image/webp',
            'og:image:alt': `${name} - Everwell Magazine`,
            'og:image:width': '1200',
            'og:image:height': '630',
        },
    };
}