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
        ? `Khám phá các bài viết về ${name} trên Everwell Magazine.`
        : type === 'product'
            ? `Khám phá các sản phẩm và bổ sung ${name} trên Everwell Magazine.`
            : `Khám phá các bài viết và sản phẩm về ${name} trên Everwell Magazine.`;

    const categoryDescription = description || defaultDescription;
    const categoryImage = image || '/images/og/default.jpg';

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
            canonical: `https://www.everwellmag.com/${slug}`, // Canonical URL để tránh duplicate content
        },
        openGraph: { // Open Graph tags cho Facebook, LinkedIn, và X (Twitter)
            title,
            description: categoryDescription,
            url: `https://www.everwellmag.com/${slug}`,
            type: 'website',
            images: [
                {
                    url: categoryImage,
                    width: 1200,
                    height: 630,
                    alt: `${name} - Everwell Magazine`,
                },
            ],
            siteName: 'Everwell Magazine',
        },
        twitter: { // Twitter Card tags (X dùng OG nhưng hỗ trợ twitter-specific để tối ưu)
            card: 'summary_large_image',
            site: '@everwellmag', // Handle X của bạn
            creator: '@everwellmag',
            title,
            description: categoryDescription,
            images: categoryImage,
        },
    };
}