// src/app/article/[slug]/layout.tsx
import { notFound } from 'next/navigation';
import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';
import { generateArticleMetadata } from '@/lib/seo/generate-article-metadata';
import ArticleSchema from '@/components/layout/seo/article-schema';
import type { Article } from '@/lib/types/article';

interface ArticleLayoutProps {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticleLayoutProps) {
    const { slug } = await params;
    let article: Article | null = null;

    try {
        const response = await fetchStrapi('articles', {
            'filters[slug][$eq]': encodeURIComponent(slug),
            'populate': '*',
        });
        console.log('Layout fetchStrapi response:', JSON.stringify(response, null, 2));
        article = response.data?.[0] as Article;

        if (!article) {
            console.log('No article found for slug:', slug);
            return {
                title: 'Not Found | Everwell Magazine',
                description: 'Article not found.',
            };
        }
    } catch (error) {
        console.error('Error fetching article for slug:', slug, error);
        return {
            title: 'Not Found | Everwell Magazine',
            description: 'Article not found.',
        };
    }

    return generateArticleMetadata({
        title: article.title,
        slug,
        description: article.description,
        blocks: article.blocks,
        image: article.image?.url,
    });
}

export default async function ArticleLayout({ children, params }: ArticleLayoutProps) {
    const { slug } = await params;
    let article: Article | null = null;

    try {
        const response = await fetchStrapi('articles', {
            'filters[slug][$eq]': encodeURIComponent(slug),
            'populate': '*',
        });
        console.log('Layout fetchStrapi response:', JSON.stringify(response, null, 2));
        article = response.data?.[0] as Article;

        if (!article) {
            console.log('No article found for slug:', slug);
            notFound();
        }
    } catch (error) {
        console.error('Error fetching article for slug:', slug, error);
        notFound();
    }

    return (
        <>
            <ArticleSchema article={article} />
            <div>{children}</div>
        </>
    );
}