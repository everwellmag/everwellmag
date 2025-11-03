// src/app/article/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Article } from '@/lib/types/article';
import type { Comment } from '@/lib/types/comment';
import { getArticleBySlug } from '@/lib/api/strapi/get-article';
import { getArticles, type GetArticlesParams } from '@/lib/api/strapi/get-articles';
import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';

import CommentSection from '@/components/content/comments/comment-section';
import ArticleContent from '@/components/content/articles/article-content';
import RelatedArticles from '@/components/content/articles/related-articles';
import Breadcrumb from '@/components/common/breadcrumb';

// ✅ ISR 5 phút
export const revalidate = 300;

interface ArticlePageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function ArticlePage({ params, searchParams }: ArticlePageProps) {
    const { slug } = await params;
    const { page = '1' } = await searchParams;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = 10;

    if (!slug) notFound();

    let article: Article | null = null;
    let comments: Comment[] = [];
    let totalComments = 0;
    let relatedArticles: Article[] = [];

    try {
        // === FETCH SONG SONG (Promise.all) ===
        const [articleData] = await Promise.all([
            getArticleBySlug(slug),
        ]);

        if (!articleData) notFound();
        article = articleData;

        // === FETCH COMMENTS & RELATED SONG SONG ===
        const commentsPromise = article.documentId
            ? fetchStrapi('comments', {
                'filters[article][documentId][$eq]': article.documentId,
                populate: 'article',
                sort: 'createdAt:desc',
                'pagination[page]': pageNumber,
                'pagination[pageSize]': pageSize,
            })
            : Promise.resolve(null);

        const relatedPromise = (async () => {
            const categorySlug = article.categories?.[0]?.slug;
            const tagSlugs = article.tags?.map((t) => t.slug).filter(Boolean) || [];

            if (!categorySlug && !tagSlugs.length) return null;

            const relatedParams: GetArticlesParams = {
                'pagination[page]': 1,
                'pagination[pageSize]': 6,
                sort: 'priority:asc,createdAt:desc',
                'filters[id][$ne]': article.id,
            };

            if (categorySlug) {
                relatedParams['filters[categories][slug][$eq]'] = categorySlug;
            } else if (tagSlugs.length) {
                tagSlugs.forEach((tag) => {
                    relatedParams[`filters[tags][slug][$in][]`] = tag;
                });
            }

            const res = await getArticles('', relatedParams);
            return res.data || [];
        })();

        const [commentsResponse, relatedResponse] = await Promise.all([
            commentsPromise,
            relatedPromise,
        ]);

        if (commentsResponse) {
            comments = commentsResponse.data || [];
            totalComments = commentsResponse.meta?.pagination?.total || comments.length;
        }
        if (relatedResponse) relatedArticles = relatedResponse;
    } catch (error) {
        console.error('Error fetching article page data:', error);
    }

    if (!article) notFound();

    return (
        <>
            <main className="container mx-auto px-2 py-8 max-w-4xl">
                {/* BREADCRUMB */}
                <nav className="mb-6 pl-2 text-sm flex items-center gap-2 flex-wrap">
                    <Link
                        href="/"
                        className="font-medium transition-colors hover:text-[var(--link-hover)]"
                        style={{ color: 'var(--link-color)' }}
                    >
                        Home
                    </Link>

                    {article.categories?.[0] && (
                        <>
                            <span className="text-gray-400">/</span>
                            <Breadcrumb
                                parentSlug={article.categories?.[0]?.parent?.slug}
                                parentName={article.categories?.[0]?.parent?.name}
                                categorySlug={article.categories?.[0]?.slug}
                                categoryName={article.categories?.[0]?.name}
                            />
                        </>
                    )}
                </nav>

                {/* ARTICLE BODY */}
                <article className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6 mb-12">
                    <h1 className="text-3xl font-bold mb-4 text-[var(--foreground)] leading-tight">
                        {article.title}
                    </h1>

                    {article.description && (
                        <p className="text-[var(--text-secondary)] mb-6 text-lg italic line-clamp-3">
                            {article.description}
                        </p>
                    )}

                    {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {article.tags.map((tag) => (
                                <Link
                                    key={tag.id}
                                    href={`/tag/${tag.slug}`}
                                    className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                                    style={{
                                        backgroundColor: tag.color || '#e5e7eb',
                                        color: '#ffffff',
                                    }}
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    <ArticleContent blocks={article.blocks || []} />
                </article>

                <section className="mb-1">
                    <CommentSection
                        articleSlug={slug}
                        comments={comments}
                        totalComments={totalComments}
                        currentPage={pageNumber}
                    />
                </section>
            </main>

            {relatedArticles.length > 0 && (
                <RelatedArticles
                    currentArticle={article}
                    category={article.categories?.[0]?.slug || ''}
                />
            )}
        </>
    );
}
