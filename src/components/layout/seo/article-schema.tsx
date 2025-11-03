// src/components/layout/seo/article-schema.tsx
import type { Article } from '@/lib/types/article';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_LOGO, SITE_DOMAIN } from '@/lib/config';

interface ArticleSchemaProps {
    article: Article;
}

export default function ArticleSchema({ article }: ArticleSchemaProps) {
    const description =
        article.description ||
        (article.blocks
            ? article.blocks
                .filter(
                    (block) =>
                        ['shared.rich-text', 'content.markdown'].includes(block.__component) &&
                        block.body
                )
                .map((block) =>
                    block.body!.replace(/[#*`[\]()]+/g, '').trim()
                )
                .join(' ')
                .substring(0, 160)
                .replace(/\s+\S*$/, '...')
            : `Read more about ${article.title} on Everwell Magazine.`);

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description,
        image: article.image?.url || DEFAULT_OG_IMAGE,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author: article.author
            ? {
                '@type': 'Person',
                name: article.author.name,
            }
            : undefined,
        publisher: {
            '@type': 'Organization',
            name: 'Everwell Magazine',
            logo: {
                '@type': 'ImageObject',
                url: DEFAULT_OG_LOGO,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_DOMAIN}/article/${article.slug}`,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
