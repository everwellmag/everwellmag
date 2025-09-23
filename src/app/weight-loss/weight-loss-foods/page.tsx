'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define TypeScript interfaces for the API response
interface Media {
    url: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
}

interface Author {
    name: string;
    email: string;
}

interface Category {
    name: string;
    slug: string;
    description: string;
}

interface Block {
    __component: string;
    id: number;
    body?: string;
    title?: string;
}

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
        if (block.__component === 'shared.rich-text' && block.body) {
            const imageUrls = extractImageUrls(block.body);
            if (imageUrls.length > 0) {
                return imageUrls[0]; // Return the first valid image URL
            }
        }
    }
    return null;
};

// Function to normalize and validate cover URL
const normalizeCoverUrl = (url: string | undefined): string | null => {
    if (!url) return null;
    return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
};

export default function WeightLossFoodsPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch articles from Strapi API
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(
                    'https://cms.everwellmag.com/api/articles?filters[category][id]=2&pagination[page]=1&pagination[pageSize]=10&populate=*',
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
                setArticles(data.data);
                setLoading(false);
            } catch (err: unknown) {
                setError((err instanceof Error ? err.message : 'An error occurred while fetching articles') || 'An error occurred while fetching articles');
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return <div className="container mx-auto p-4">Loading...</div>;
    }

    if (error) {
        return <div className="container mx-auto p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Weight Loss Foods</h1>
            <p className="text-gray-600 mb-8">
                Discover nutritious, low-calorie foods that support healthy weight loss
                without compromising on taste or essential nutrients.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => {
                    // Normalize cover URL and fallback to first image from blocks if cover fails
                    let thumbnailUrl = normalizeCoverUrl(article.cover?.url);
                    if (!thumbnailUrl || thumbnailUrl === 'https://cms.everwellmag.comnull') {
                        thumbnailUrl = getFirstImageFromBlocks(article.blocks);
                    }

                    return (
                        <div
                            key={article.id}
                            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
                        >
                            {/* Thumbnail Image */}
                            {thumbnailUrl && (
                                <Image
                                    src={thumbnailUrl}
                                    alt={article.cover?.alternativeText || article.title}
                                    width={500}
                                    height={300}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                    onError={(e) => {
                                        const fallbackUrl = getFirstImageFromBlocks(article.blocks);
                                        if (fallbackUrl) {
                                            e.currentTarget.src = fallbackUrl; // Fallback to blocks image on error
                                        } else {
                                            e.currentTarget.style.display = 'none'; // Hide if no fallback
                                        }
                                    }}
                                />
                            )}

                            {/* Title and Description */}
                            <h2 className="text-xl font-semibold mb-2">
                                <Link href={`/article/${article.slug}`} className="hover:underline">
                                    {article.title}
                                </Link>
                            </h2>
                            <p className="text-gray-600 mb-4">{article.description}</p>

                            {/* Author */}
                            {article.author && (
                                <p className="text-sm text-gray-500 mb-2">
                                    By {article.author.name}
                                </p>
                            )}

                            {/* Rich Text Preview (Text Only) */}
                            {article.blocks.map((block, index) => {
                                if (block.__component === 'shared.rich-text' && block.body) {
                                    return (
                                        <div key={index} className="mb-4">
                                            <p className="text-gray-700 line-clamp-3">{block.body}</p>
                                        </div>
                                    );
                                }
                                if (block.__component === 'shared.quote' && block.title && block.body) {
                                    return (
                                        <blockquote key={index} className="border-l-4 pl-4 italic text-gray-600 mb-4">
                                            <p>{block.body}</p>
                                            <p className="text-sm text-gray-500">— {block.title}</p>
                                        </blockquote>
                                    );
                                }
                                return null;
                            })}

                            {/* Read More Link */}
                            <Link
                                href={`/article/${article.slug}`}
                                className="text-blue-500 hover:underline"
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