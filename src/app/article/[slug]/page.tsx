// src/app/article/[slug]/page.tsx
import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';
import { getArticles } from '@/lib/api/strapi/get-articles';
import type { Article } from '@/lib/types/article';
import type { Comment } from '@/lib/types/comment';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/content/comments/comment-section';
import ArticleContent from '@/components/content/articles/article-content';
import RelatedArticles from '@/components/content/articles/related-articles';

interface ArticlePageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function ArticlePage({ params, searchParams }: ArticlePageProps) {
    const { slug } = await params;
    const { page = '1' } = await searchParams;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = 10;

    if (!slug) {
        notFound();
    }

    let article: Article | null = null;
    let comments: Comment[] = [];
    let totalComments = 0;
    let relatedArticles: Article[] = [];

    try {
        // === LẤY BÀI VIẾT ===
        const articleResponse = await fetchStrapi('articles', {
            'filters[slug][$eq]': encodeURIComponent(slug),
            'populate': '*',
        });
        article = articleResponse.data?.[0] as Article;

        if (!article) {
            notFound();
        }

        // === LẤY BÌNH LUẬN ===
        if (article.documentId) {
            const commentsResponse = await fetchStrapi('comments', {
                'filters[article][documentId][$eq]': article.documentId,
                'populate': 'article',
                'sort': 'createdAt:desc',
                'pagination[page]': pageNumber,
                'pagination[pageSize]': pageSize,
            });
            comments = (commentsResponse.data as Comment[]) || [];
            totalComments = commentsResponse.meta?.pagination?.total || comments.length;
        }

        // === LẤY BÀI VIẾT LIÊN QUAN ===
        const categorySlug = article.categories?.[0]?.slug;
        if (categorySlug) {
            const relatedResponse = await getArticles(categorySlug, {
                'pagination[page]': 1,
                'pagination[pageSize]': 6,
                sort: 'priority:asc,createdAt:desc',
                'filters[id][$ne]': article.id,
            });
            relatedArticles = relatedResponse.data || [];
        }
    } catch (error) {
        console.error('Error fetching article data:', error);
    }

    if (!article) {
        notFound();
    }

    return (
        <>
            {/* === NỘI DUNG CHÍNH – GIỚI HẠN CHIỀU RỘNG === */}
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <Link href="/" className="text-[var(--link-color)] hover:text-[var(--link-hover)] mb-2 inline-block font-[var(--font-sans)] transition-colors">
                    ← Back to Home
                </Link>

                <article className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6 mb-12">
                    <h1 className="text-3xl font-bold mb-4 text-[var(--foreground)] font-[var(--font-sans)] leading-tight">
                        {article.title}
                    </h1>
                    {article.description && (
                        <p className="text-[var(--text-secondary)] mb-6 text-lg italic font-[var(--font-sans)] line-clamp-3">
                            {article.description}
                        </p>
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

            {/* === RELATED ARTICLES – FULLWIDTH, RA KHỎI max-w-4xl === */}
            {relatedArticles.length > 0 && (
                <RelatedArticles
                    currentArticle={article}
                    category={article.categories![0].slug}
                />
            )}
        </>
    );
}