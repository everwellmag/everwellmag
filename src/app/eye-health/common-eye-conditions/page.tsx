'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

// Define TypeScript interfaces for the API response
interface Media {
    url: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
    };
}

interface Author {
    id: number;
    documentId: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

interface Category {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

interface RichTextBlock {
    __component: 'shared.rich-text';
    id: number;
    body: string;
}

interface QuoteBlock {
    __component: 'shared.quote';
    id: number;
    title: string;
    body: string;
}

interface MediaBlock {
    __component: 'shared.media';
    id: number;
}

interface SliderBlock {
    __component: 'shared.slider';
    id: number;
}

type Block = RichTextBlock | QuoteBlock | MediaBlock | SliderBlock;

interface Article {
    id: number;
    documentId: string;
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover?: Media | null;
    author?: Author | null;
    category: Category;
    blocks: Block[];
}

interface ApiResponse {
    data: Article[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

// Function to extract image URLs from rich-text body
const extractImageUrls = (body: string): string[] => {
    const regex = /!\[.*?\]\((.*?)\)/g;
    const matches = body.match(regex) || [];
    return matches.map((match) => {
        const url = match.replace(/!\[.*?\]\((.*?)\)/, '$1');
        return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`; // Normalize URL
    });
};

// Function to get the first image from blocks
const getFirstImageFromBlocks = (blocks: Block[]): string | null => {
    for (const block of blocks) {
        if (block.__component === 'shared.rich-text' && 'body' in block && block.body) {
            const imageUrls = extractImageUrls(block.body);
            if (imageUrls.length > 0) {
                return imageUrls[0]; // Return the first valid image URL
            }
        }
    }
    return null;
};

// Function to normalize and validate cover URL
const normalizeCoverUrl = (media?: Media | null): string | null => {
    if (!media || !media.url) return null;
    return media.url.startsWith('http') ? media.url : `https://cms.everwellmag.com${media.url}`;
};

export default function CommonEyeConditionsPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch articles from Strapi API
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(
                    'https://cms.everwellmag.com/api/articles?filters[category][id]=11&pagination[page]=1&pagination[pageSize]=10&populate=*',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }

                const data: ApiResponse = await response.json();
                if (!data.data || data.data.length === 0) {
                    throw new Error('No articles found for category ID 11');
                }
                // Sort articles by createdAt in descending order (newest first)
                const sortedArticles = data.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setArticles(sortedArticles);
                setLoading(false);
            } catch (err: unknown) {
                setError((err instanceof Error ? err.message : 'An error occurred while fetching articles') || 'An error occurred');
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return <div className="container mx-auto p-4" style={{ color: 'var(--foreground)' }}>Loading...</div>;
    }

    if (error) {
        return <div className="container mx-auto p-4" style={{ color: 'var(--foreground)' }}>{error}</div>;
    }

    if (articles.length === 0) {
        return <div className="container mx-auto p-4" style={{ color: 'var(--foreground)' }}>No articles available.</div>;
    }

    return (
        <div className="container mx-auto p-4" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Common Eye Conditions</h1>
            <p className="mb-8" style={{ color: 'var(--foreground)' }}>
                Learn about common eye conditions, their symptoms, and management strategies
                with expert insights.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => {
                    // Normalize cover URL and fallback to first image from blocks if cover fails
                    let thumbnailUrl = normalizeCoverUrl(article.cover);
                    if (!thumbnailUrl) {
                        thumbnailUrl = getFirstImageFromBlocks(article.blocks);
                    }

                    return (
                        <div
                            key={article.id}
                            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition h-[450px] flex flex-col justify-between"
                            style={{ borderColor: 'var(--foreground)', color: 'var(--foreground)' }}
                        >
                            {/* Thumbnail Image */}
                            {thumbnailUrl && (
                                <Link href={`/article/${article.slug}`}>
                                    <Image
                                        src={thumbnailUrl}
                                        alt={article.cover?.alternativeText || article.title}
                                        width={500}
                                        height={300}
                                        className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none'; // Hide if image fails to load
                                        }}
                                    />
                                </Link>
                            )}

                            {/* Content Container with fixed height */}
                            <div className="flex-1 overflow-hidden">
                                {/* Title and Description */}
                                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                                    <Link href={`/article/${article.slug}`} className="hover:underline" style={{ color: 'var(--foreground)' }}>
                                        {article.title}
                                    </Link>
                                </h2>
                                <p className="mb-4 line-clamp-2" style={{ color: 'var(--foreground)' }}>{article.description}</p>

                                {/* Author */}
                                {article.author && (
                                    <p className="text-sm mb-2 line-clamp-1" style={{ color: 'var(--foreground)' }}>
                                        By {article.author.name}
                                    </p>
                                )}

                                {/* Rich Text Preview (without images, only text) */}
                                {article.blocks.map((block, index) => {
                                    if (block.__component === 'shared.rich-text' && 'body' in block && block.body) {
                                        return (
                                            <div key={index} className="mb-4 line-clamp-3">
                                                <ReactMarkdown
                                                    components={{
                                                        p: ({ ...props }) => (
                                                            <p style={{ color: 'var(--foreground)' }} {...props} />
                                                        ),
                                                        h1: ({ ...props }) => (
                                                            <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }} {...props} />
                                                        ),
                                                        h2: ({ ...props }) => (
                                                            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }} {...props} />
                                                        ),
                                                        strong: ({ ...props }) => (
                                                            <strong className="font-bold" {...props} />
                                                        ),
                                                        em: ({ ...props }) => (
                                                            <em className="italic" {...props} />
                                                        ),
                                                        img: () => null,
                                                    }}
                                                >
                                                    {block.body}
                                                </ReactMarkdown>
                                            </div>
                                        );
                                    }
                                    if (block.__component === 'shared.quote' && 'title' in block && 'body' in block && block.title && block.body) {
                                        return (
                                            <blockquote key={index} className="border-l-4 pl-4 italic mb-4 line-clamp-2" style={{ color: 'var(--foreground)', borderColor: 'var(--foreground)' }}>
                                                <p>{block.body}</p>
                                                <p className="text-sm" style={{ color: 'var(--foreground)' }}>— {block.title}</p>
                                            </blockquote>
                                        );
                                    }
                                    return null;
                                })}
                            </div>

                            {/* Read More Link (always at bottom) */}
                            <Link
                                href={`/article/${article.slug}`}
                                className="mt-2 block hover:underline"
                                style={{ color: '#3b82f6' }}
                            >
                                Read More
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}