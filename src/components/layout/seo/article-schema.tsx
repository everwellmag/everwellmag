// src/components/layout/seo/article-schema.tsx
import type { Article } from '@/lib/types/article';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_LOGO } from '@/lib/config';

interface ArticleSchemaProps {
    article: Article;
}

export default function ArticleSchema({ article }: ArticleSchemaProps) {
    const description = article.description || (
        article.blocks
            ? article.blocks
                .filter(block => block.__component === 'content.markdown' && block.body)
                .map(block => block.body!.replace(/[#*`[\]()]+/g, '').trim())
                .join(' ')
                .substring(0, 160)
                .replace(/\s+\S*$/, '...')
            : `Read more about ${article.title} on Everwell Magazine.`
    );

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description,
        image: article.image?.url || DEFAULT_OG_IMAGE,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        publisher: {
            '@type': 'Organization',
            name: 'Everwell Magazine',
            logo: {
                '@type': 'ImageObject',
                url: DEFAULT_OG_LOGO,
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}