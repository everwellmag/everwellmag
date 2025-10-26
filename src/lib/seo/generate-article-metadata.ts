// src/lib/seo/generate-article-metadata.ts
import type { Metadata } from 'next';
import type { Article } from '@/lib/types/article';
import { SITE_DOMAIN, CMS_DOMAIN, DEFAULT_OG_IMAGE } from '@/lib/config';

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

    const articleImage = image
        ? image.startsWith('http')
            ? image
            : `${CMS_DOMAIN}${image.startsWith('/') ? '' : '/'}${image}`
        : DEFAULT_OG_IMAGE;

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
            canonical: `${SITE_DOMAIN}/article/${slug}`,
        },
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            url: `${SITE_DOMAIN}/article/${slug}`,
            type: 'article',
            images: [
                {
                    url: articleImage,
                    width: 1200,
                    height: 630,
                    alt: `${title} - Everwell Magazine`,
                    type: 'image/webp',
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
            images: articleImage,
        },
        other: {
            'og:image:secure_url': articleImage,
            'og:image:type': 'image/webp',
            'og:image:alt': `${title} - Everwell Magazine`,
            'og:image:width': '1200',
            'og:image:height': '630',
        },
    };
}