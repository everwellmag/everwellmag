// src/lib/seo/generate-category-metadata.ts
import type { Metadata } from 'next';

interface CategoryMetadataOptions {
    name: string;
    slug: string;
    description?: string;
    type?: 'article' | 'product' | 'mixed';
    image?: string; // URL ảnh OG từ Strapi hoặc default
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
            : `https://cms.everwellmag.com${image.startsWith('/') ? '' : '/'}${image}`
        : 'https://cms.everwellmag.com/uploads/default_image_0295f000e6.jpg';

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
            canonical: `https://www.everwellmag.com/${slug}`,
        },
        openGraph: {
            title,
            description: categoryDescription,
            url: `https://www.everwellmag.com/${slug}`,
            type: 'website',
            images: [
                {
                    url: categoryImage,
                    width: 1200, // Dùng kích thước thực từ API
                    height: 630,
                    alt: `${name} - Everwell Magazine`,
                    type: 'image/webp', // Dùng mime từ API
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