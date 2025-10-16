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
        return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
    });
};

// Function to get the first image from blocks
const getFirstImageFromBlocks = (blocks: Block[]): string | null => {
    for (const block of blocks) {
        if (block.__component === 'shared.rich-text' && 'body' in block && block.body) {
            const imageUrls = extractImageUrls(block.body);
            if (imageUrls.length > 0) {
                return imageUrls[0];
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
                const sortedArticles = data.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setArticles(sortedArticles);
                setLoading(false);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching articles');
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto p-6" style={{ color: 'var(--foreground)' }}>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: 'var(--link-color)' }}></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-6" style={{ color: 'var(--foreground)' }}>
                <div className="text-center" style={{ color: 'var(--link-color)' }}>{error}</div>
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="container mx-auto p-6" style={{ color: 'var(--foreground)' }}>
                <div className="text-center">No articles available.</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            {/* Header Section */}
            <div className="relative text-white rounded-lg p-8 mb-12" style={{ background: 'var(--gradient-primary)' }}>
                <h1 className="text-4xl font-bold mb-4">Common Eye Conditions</h1>
                <p className="text-lg max-w-2xl">
                    Learn about common eye conditions, their symptoms, and management strategies with expert insights.
                </p>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => {
                    let thumbnailUrl = normalizeCoverUrl(article.cover);
                    if (!thumbnailUrl) {
                        thumbnailUrl = getFirstImageFromBlocks(article.blocks);
                    }

                    return (
                        <div
                            key={article.id}
                            className="group relative rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden min-h-[400px] flex flex-col"
                            style={{ backgroundColor: 'var(--card-bg)' }}
                        >
                            {/* Thumbnail Image */}
                            {thumbnailUrl ? (
                                <Link href={`/article/${article.slug}`}>
                                    <Image
                                        src={thumbnailUrl}
                                        alt={article.cover?.alternativeText || article.title}
                                        width={500}
                                        height={300}
                                        className="w-full h-56 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://cms.everwellmag.com/Uploads/default-image.jpg';
                                        }}
                                        unoptimized
                                        loading="lazy"
                                    />
                                </Link>
                            ) : (
                                <div className="w-full h-56 flex items-center justify-center rounded-t-lg" style={{ backgroundColor: 'var(--placeholder-bg)' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>No Image</span>
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                                    <Link href={`/article/${article.slug}`} className="hover:underline" style={{ color: 'var(--foreground)' }}>
                                        {article.title}
                                    </Link>
                                </h2>
                                <p className="mb-4 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>{article.description}</p>
                                {article.author && (
                                    <p className="text-sm mb-4 line-clamp-1" style={{ color: 'var(--text-secondary)' }}>
                                        By {article.author.name}
                                    </p>
                                )}
                                {article.blocks.map((block, index) => {
                                    if (block.__component === 'shared.rich-text' && 'body' in block && block.body) {
                                        return (
                                            <div key={index} className="mb-4 line-clamp-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                <ReactMarkdown
                                                    components={{
                                                        p: ({ ...props }) => <p {...props} />,
                                                        h1: ({ ...props }) => <h1 className="text-lg font-bold" {...props} />,
                                                        h2: ({ ...props }) => <h2 className="text-base font-semibold" {...props} />,
                                                        strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                                                        em: ({ ...props }) => <em className="italic" {...props} />,
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
                                            <blockquote key={index} className="border-l-4 pl-4 italic mb-4 line-clamp-2" style={{ borderColor: 'var(--link-color)' }}>
                                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{block.body}</p>
                                                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>— {block.title}</p>
                                            </blockquote>
                                        );
                                    }
                                    return null;
                                })}
                                <div className="mt-auto">
                                    <Link
                                        href={`/article/${article.slug}`}
                                        className="inline-block btn-gradient text-white px-4 py-2 rounded-md"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}