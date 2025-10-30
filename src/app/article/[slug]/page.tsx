// src/app/article/[slug]/page.tsx
import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';
import { getArticles, type GetArticlesParams } from '@/lib/api/strapi/get-articles';
import type { Article } from '@/lib/types/article';
import type { Comment } from '@/lib/types/comment';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/content/comments/comment-section';
import ArticleContent from '@/components/content/articles/article-content';
import RelatedArticles from '@/components/content/articles/related-articles';
import Breadcrumb from '@/components/common/breadcrumb';

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
        // === FETCH ARTICLE BY SLUG ===
        const articleResponse = await fetchStrapi('articles', {
            'filters[slug][$eq]': slug,
            'populate[0]': 'image',
            'populate[1]': 'tags',
            'populate[2]': 'categories',
            'populate[3]': 'author',
            'populate[4]': 'blocks',
            'populate[5]': 'blocks.file',
        });

        article = articleResponse.data?.[0] ?? null;
        if (!article) notFound();

        // === FETCH COMMENTS ===
        if (article.documentId) {
            const commentsResponse = await fetchStrapi('comments', {
                'filters[article][documentId][$eq]': article.documentId,
                'populate': 'article',
                'sort': 'createdAt:desc',
                'pagination[page]': pageNumber,
                'pagination[pageSize]': pageSize,
            });
            comments = commentsResponse.data || [];
            totalComments = commentsResponse.meta?.pagination?.total || comments.length;
        }

        // === FETCH RELATED ARTICLES ===
        const categorySlug = article.categories?.[0]?.slug;
        const tagSlugs = article.tags?.map((t) => t.slug).filter(Boolean) as string[] | undefined;

        if (categorySlug || tagSlugs?.length) {
            const articleParams: GetArticlesParams = {
                'pagination[page]': 1,
                'pagination[pageSize]': 6,
                sort: 'priority:asc,createdAt:desc',
                'filters[id][$ne]': article.id,
            };

            if (categorySlug) {
                articleParams['filters[categories][slug][$eq]'] = categorySlug;
            } else if (tagSlugs?.length) {
                // Strapi hiểu $in[] khi append nhiều lần
                tagSlugs.forEach((tag) => {
                    articleParams[`filters[tags][slug][$in][]`] = tag;
                });
            }

            const relatedResponse = await getArticles('', articleParams);
            relatedArticles = relatedResponse.data || [];
        }
    } catch (error) {
        console.error('Error fetching article data:', error);
    }

    if (!article) notFound();

    return (
        <>
            <main className="container mx-auto px-2 py-8 max-w-4xl">
                <nav className="mb-6 pl-2 text-sm flex items-center gap-2 flex-wrap">
                    <Link
                        href="/"
                        className="font-medium transition-colors hover:text-[var(--link-hover)]"
                        style={{ color: 'var(--link-color)' }}
                    >
                        Home
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Breadcrumb
                        categorySlug={article.categories?.[0]?.slug}
                        categoryName={article.categories?.[0]?.name}
                    />
                </nav>

                <article className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6 mb-12">
                    <h1 className="text-3xl font-bold mb-4 text-[var(--foreground)] font-[var(--font-sans)] leading-tight">
                        {article.title}
                    </h1>

                    {article.description && (
                        <p className="text-[var(--text-secondary)] mb-6 text-lg italic font-[var(--font-sans)] line-clamp-3">
                            {article.description}
                        </p>
                    )}

                    {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {article.tags.map((tag) => (
                                <Link
                                    key={tag.id}
                                    href={`/tag/${tag.slug}`}
                                    className="inline-block px-3 py-1 text-xs font-medium rounded-full transition-colors"
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
                <RelatedArticles currentArticle={article} category={article.categories?.[0]?.slug || ''} />
            )}
        </>
    );
}