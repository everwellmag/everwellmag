import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';
import type { Article } from '@/lib/types/article';
import type { Comment } from '@/lib/types/comment';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import CommentSection from '@/components/content/comments/comment-section';

// Hàm lấy URL ảnh đầu tiên từ blocks.body
const getFirstImageFromBlocks = (blocks: Article['blocks']): string | null => {
    for (const block of blocks || []) {
        if (block.__component === 'shared.rich-text' && block.body) {
            const regex = /!\[.*?\]\((.*?)\)/g;
            const matches = block.body.match(regex);
            if (matches) {
                const url = matches[0].replace(/!\[.*?\]\((.*?)\)/, '$1');
                return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
            }
        }
    }
    return null;
};

// Hàm chuẩn hóa URL ảnh
const normalizeImageUrl = (url?: string): string | null => {
    if (!url) return null;
    return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
};

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
        // Lấy bài viết bằng slug
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

        // Lấy bình luận với phân trang
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
    const imageUrl = normalizeImageUrl(article.image?.url) || getFirstImageFromBlocks(blocks) || 'https://cms.everwellmag.com/Uploads/default-image.jpg';

    return (
        <main className="container mx-auto p-4">
            <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
                Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <Image
                src={imageUrl}
                alt={title}
                width={800}
                height={600}
                className="w-full max-w-2xl mx-auto mb-4 rounded"
                style={{ width: 'auto', height: 'auto' }}
            />
            {description && <p className="mb-4 text-gray-600">{description}</p>}
            <div className="prose max-w-3xl mx-auto">
                {blocks.length > 0 ? (
                    blocks.map((block, index) => (
                        <div key={index}>
                            {block.__component === 'shared.rich-text' && block.body ? (
                                <ReactMarkdown
                                    components={{
                                        img: ({ src, alt }) => {
                                            const imageSrc = typeof src === 'string' ? normalizeImageUrl(src) || 'https://cms.everwellmag.com/Uploads/default-image.jpg' : 'https://cms.everwellmag.com/Uploads/default-image.jpg';
                                            return (
                                                <Image
                                                    src={imageSrc}
                                                    alt={alt || 'Article image'}
                                                    width={800}
                                                    height={600}
                                                    className="w-full max-w-2xl mx-auto mb-4 rounded"
                                                    style={{ width: 'auto', height: 'auto' }}
                                                />
                                            );
                                        },
                                    }}
                                >
                                    {block.body}
                                </ReactMarkdown>
                            ) : block.__component === 'shared.media' && block.file?.url ? (
                                <Image
                                    src={normalizeImageUrl(block.file.url) || 'https://cms.everwellmag.com/Uploads/default-image.jpg'}
                                    alt={block.file.alternativeText || 'Article media'}
                                    width={800}
                                    height={600}
                                    className="w-full max-w-2xl mx-auto mb-4 rounded"
                                    style={{ width: 'auto', height: 'auto' }}
                                />
                            ) : (
                                <p>No content in block</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Không có nội dung.</p>
                )}
            </div>
            <CommentSection
                articleSlug={slug}
                comments={comments}
                totalComments={totalComments}
                currentPage={pageNumber}
            />
        </main>
    );
}