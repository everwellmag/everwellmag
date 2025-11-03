// src/app/article/[slug]/layout.tsx
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/api/strapi/get-article';
import { generateArticleMetadata } from '@/lib/seo/generate-article-metadata';
import ArticleSchema from '@/components/layout/seo/article-schema';
interface ArticleLayoutProps {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

// === DYNAMIC METADATA ===
export async function generateMetadata({ params }: ArticleLayoutProps) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
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

// === LAYOUT WRAPPER ===
export default async function ArticleLayout({ children, params }: ArticleLayoutProps) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) notFound();

    return (
        <>
            {/* JSON-LD SEO Schema */}
            <ArticleSchema article={article} />
            <div>{children}</div>
        </>
    );
}
