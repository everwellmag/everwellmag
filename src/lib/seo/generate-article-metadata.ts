// src/lib/seo/generate-article-metadata.ts
import type { Metadata } from 'next';
import type { Article } from '@/lib/types/article';

interface ArticleMetadataOptions {
    title: string;
    slug: string;
    description?: string;
    blocks?: Article['blocks'];
    image?: string;
}

export function generateArticleMetadata({ title, slug, description, blocks, image }: ArticleMetadataOptions): Metadata {
    const metaTitle = `${title} | Everwell Magazine`;
    const metaDescription = description || (
        blocks
            ? blocks
                .filter(block => block.__component === 'content.markdown' && block.body)
                .map(block => block.body!.replace(/[#*`[\]()]+/g, '').trim())
                .join(' ')
                .substring(0, 160)
                .replace(/\s+\S*$/, '...')
            : `Read more about ${title} on Everwell Magazine.`
    );

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: [
            title.toLowerCase(),
            'health',
            'wellness',
            'everwell magazine',
        ],
        alternates: {
            canonical: `https://www.everwellmag.com/article/${slug}`,
        },
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            url: `https://www.everwellmag.com/article/${slug}`,
            type: 'article',
            images: [
                {
                    url: image || '/images/og/default.jpg',
                    width: 1200,
                    height: 630,
                    alt: `${title} - Everwell Magazine`,
                },
            ],
            siteName: 'Everwell Magazine',
        },
        twitter: {
            card: 'summary_large_image',
            site: '@everwellmag',
            creator: '@everwellmag',
            title: metaTitle,
            description: metaDescription,
            images: image || '/images/og/default.jpg',
        },
    };
}