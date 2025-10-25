import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';
import type { Article } from '@/lib/types/article';
import type { Comment } from '@/lib/types/comment';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/content/comments/comment-section';
import ArticleContent from '@/components/content/articles/article-content';

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
        console.log('No slug provided');
        notFound();
    }

    let article: Article | null = null;
    let comments: Comment[] = [];
    let totalComments = 0;

    try {
        // Fetch article by slug
        const articleResponse = await fetchStrapi('articles', {
            'filters[slug][$eq]': slug,
            'populate': '*',
        });
        console.log('Article detail API response:', JSON.stringify(articleResponse, null, 2));
        article = articleResponse.data?.[0] as Article;

        if (!article) {
            console.log('No article found for slug:', slug);
            notFound();
        }

        // Fetch comments with pagination
        if (article.documentId) {
            console.log('Fetching comments for article documentId:', article.documentId);
            const commentsResponse = await fetchStrapi('comments', {
                'filters[article][documentId][$eq]': article.documentId,
                'populate': 'article',
                'sort': 'createdAt:desc',
                'pagination[page]': pageNumber,
                'pagination[pageSize]': pageSize,
            });
            console.log('Comments API response:', JSON.stringify(commentsResponse, null, 2));
            comments = (commentsResponse.data as Comment[]) || [];
            totalComments = commentsResponse.meta?.pagination?.total || comments.length;
        } else {
            console.warn('No article.documentId found, skipping comments');
        }
    } catch (error) {
        console.error('Error fetching article or comments for slug:', slug, error);
        console.log('Proceeding with article display, comments may be empty');
    }

    if (!article) {
        console.log('No article found for slug:', slug);
        notFound();
    }

    const title = article.title || 'Untitled';
    const description = article.description || '';
    const blocks = article.blocks || [];

    return (
        <main className="container mx-auto px-4 py-8 max-w-4xl rounded-md">
            <Link href="/" className="text-[var(--link-color)] hover:text-[var(--link-hover)] mb-6 inline-block font-[var(--font-sans)] transition-colors">
                Back to Home
            </Link>
            <article className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6 dark:bg-[var(--card-bg)]">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--foreground)] font-[var(--font-sans)] leading-tight">
                    {title}
                </h1>
                {description && (
                    <p className="text-[var(--text-secondary)] mb-6 text-lg italic font-[var(--font-sans)] line-clamp-3">
                        {description}
                    </p>
                )}
                <ArticleContent blocks={blocks} />
            </article>
            <section className="mt-12">
                <CommentSection
                    articleSlug={slug}
                    comments={comments}
                    totalComments={totalComments}
                    currentPage={pageNumber}
                />
            </section>
        </main>
    );
}