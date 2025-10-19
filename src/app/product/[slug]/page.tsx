'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React from 'react';

// Define TypeScript interfaces for the API response
interface PriceMulti {
    quantity: number;
    price: number;
    currency: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    parent_slug?: string | null;
}

interface Product {
    id: number;
    Name: string;
    Description: string;
    Supplier: string;
    ReleaseYear?: string;
    AffiliateLink: string;
    slug: string | null;
    rating?: number;
    Pricemulti: PriceMulti[];
    Image: {
        url: string | Blob;
        alternativeText?: string;
        width?: number;
        height?: number;
    } | null;
    categories: Category[];
}

interface ApiResponse {
    data: Product[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

// Function to extract the first image URL from description
const getFirstImageFromDescription = (description: string): string | null => {
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = description.match(regex);
    if (!match) return null;
    const url = match[1];
    if (typeof url !== 'string') return null;
    return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
};

// Function to normalize image URL with type guard for Blob
const normalizeImageUrl = (image?: { url?: string | Blob } | null): string | null => {
    if (!image || !image.url) return null;
    const url = image.url;
    if (typeof url === 'string') {
        return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
    } else if (url instanceof Blob) {
        return URL.createObjectURL(url);
    }
    return null;
};

// Function to generate star rating with decimal support using CSS clip-path
const getStarRating = (rating?: number): React.ReactNode => {
    if (rating === undefined || rating < 0) return <span style={{ color: 'var(--text-secondary)' }}>No rating</span>;
    const fullStars = Math.floor(rating);
    const decimal = rating % 1;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={`full-${i}`} style={{ color: '#FFD700', fontSize: '1.5em' }}>★</span>);
    }

    if (decimal > 0 && fullStars < 5) {
        const clipPercentage = decimal * 100;
        stars.push(
            <span
                key="decimal"
                style={{
                    color: '#FFD700',
                    fontSize: '1.5em',
                    display: 'inline-block',
                    position: 'relative',
                }}
            >
                <span style={{ position: 'absolute', clipPath: `inset(0 ${100 - clipPercentage}% 0 0)` }}>★</span>
                <span style={{ color: '#D3D3D3' }}>★</span>
            </span>
        );
    }

    const emptyStars = 5 - fullStars - (decimal > 0 ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<span key={`empty-${i}`} style={{ color: '#D3D3D3', fontSize: '1.5em' }}>★</span>);
    }

    return <span>{stars}</span>;
};

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const resolvedParams = await params;
            try {
                const response = await fetch(
                    `https://cms.everwellmag.com/api/products?filters[slug][$eq]=${resolvedParams.slug}&populate=*`,
                    { headers: { 'Content-Type': 'application/json' } }
                );
                if (!response.ok) throw new Error(`Failed to fetch product: ${response.statusText}`);
                const data: ApiResponse = await response.json();
                if (!data.data || data.data.length === 0) throw new Error('No product found for this slug');
                setProduct(data.data[0]);
                setLoading(false);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [params]);

    if (loading) {
        return (
            <div className="container mx-auto p-6" style={{ color: 'var(--foreground)' }}>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#3B82F6' }}></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-6" style={{ color: 'var(--foreground)' }}>
                <div className="text-center" style={{ color: '#3B82F6' }}>{error}</div>
            </div>
        );
    }

    if (!product) return notFound();

    const imageUrl = normalizeImageUrl(product.Image) || getFirstImageFromDescription(product.Description);
    const primaryCategory = product.categories[0] || { slug: '', parent_slug: null, name: 'Uncategorized' };
    const categoryUrl = primaryCategory.parent_slug ? `/${primaryCategory.parent_slug}/${primaryCategory.slug}` : `/${primaryCategory.slug}`;

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            <nav className="mb-6 text-sm md:text-base flex items-center space-x-2">
                <Link
                    href="/"
                    className="relative px-3 py-1 bg-gray-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-l-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    style={{ color: '#3B82F6' }}
                >
                    Home
                    <span className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-gray-50 dark:border-l-gray-800 border-t-8 border-t-transparent border-b-8 border-b-transparent"></span>
                </Link>
                <Link
                    href={categoryUrl}
                    className="relative px-3 py-1 bg-gray-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    style={{ color: '#3B82F6' }}
                >
                    {primaryCategory.name}
                    <span className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-gray-50 dark:border-l-gray-800 border-t-8 border-t-transparent border-b-8 border-b-transparent"></span>
                </Link>
                <span className="px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-r-md">
                    {product.Name}
                </span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {product.Name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="flex justify-center">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={product.Image?.alternativeText || product.Name}
                            width={500}
                            height={500}
                            className="w-full max-w-md h-auto object-contain rounded-xl shadow-md"
                            unoptimized
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full max-w-md h-64 flex items-center justify-center border border-gray-300 rounded-xl bg-gray-50" style={{ color: 'var(--foreground)' }}>
                            No image available
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-blue-500" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
                    <h2 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>{product.Name}</h2>
                    <div className="space-y-3 mb-6">
                        <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                            <span className="font-medium">Supplier:</span> {product.Supplier}
                        </p>
                        {product.ReleaseYear && (
                            <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                                <span className="font-medium">Released:</span> {product.ReleaseYear}
                            </p>
                        )}
                        {product.rating !== undefined && (
                            <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                                <span className="font-medium">Rating:</span> {getStarRating(product.rating)} ({product.rating}/5)
                            </p>
                        )}
                        <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                            <span className="font-medium">Categories:</span> {product.categories.map(c => c.name).join(', ') || 'Uncategorized'}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Pricing Options</h3>
                        {product.Pricemulti && product.Pricemulti.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {product.Pricemulti.map((priceOption, index) => (
                                    <div
                                        key={index}
                                        className="inline-flex items-center p-2 bg-gray-50 rounded-lg border border-blue-500 hover:bg-blue-50 transition-colors"
                                        style={{ backgroundColor: 'var(--background)', borderColor: '#3B82F6' }}
                                    >
                                        <span className="text-sm font-medium mr-2" style={{ color: 'var(--foreground)' }}>
                                            {priceOption.quantity} {priceOption.quantity > 1 ? 'units' : 'unit'}
                                        </span>
                                        <span className="text-md font-semibold text-green-600">
                                            {priceOption.currency}{priceOption.price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>No pricing options available</p>
                        )}
                    </div>

                    <a
                        href={product.AffiliateLink}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="block w-full text-center py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-lg"
                    >
                        Buy Now from Official Site
                    </a>
                </div>
            </div>

            <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200 shadow-md" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
                <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Description</h3>
                <div className="prose max-w-none" style={{ color: 'var(--foreground)' }}>
                    {product.Description ? (
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({ ...props }) => <p className="mb-4 text-base md:text-lg" style={{ color: 'var(--foreground)' }} {...props} />,
                                h1: ({ ...props }) => <h1 style={{ color: 'var(--foreground)' }} className="text-3xl font-bold mb-4" {...props} />,
                                h2: ({ ...props }) => <h2 style={{ color: 'var(--foreground)' }} className="text-2xl font-semibold mb-3" {...props} />,
                                h3: ({ ...props }) => <h3 style={{ color: 'var(--foreground)' }} className="text-xl font-semibold mb-2" {...props} />,
                                h4: ({ ...props }) => <h4 style={{ color: 'var(--foreground)' }} className="text-lg font-semibold mb-2" {...props} />,
                                h5: ({ ...props }) => <h5 style={{ color: 'var(--foreground)' }} className="text-base font-semibold mb-2" {...props} />,
                                h6: ({ ...props }) => <h6 style={{ color: 'var(--foreground)' }} className="text-sm font-semibold mb-2" {...props} />,
                                ul: ({ ...props }) => <ul style={{ color: 'var(--foreground)' }} className="list-disc list-inside mb-4" {...props} />,
                                ol: ({ ...props }) => <ol style={{ color: 'var(--foreground)' }} className="list-decimal list-inside mb-4" {...props} />,
                                li: ({ ...props }) => <li className="mb-2 text-base md:text-lg" style={{ color: 'var(--foreground)' }} {...props} />,
                                blockquote: ({ ...props }) => (
                                    <blockquote
                                        style={{ color: 'var(--foreground)', borderColor: 'var(--foreground)' }}
                                        className="border-l-4 pl-4 italic my-4"
                                        {...props}
                                    />
                                ),
                                code: ({ ...props }) => (
                                    <code
                                        style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                                        className="px-1 rounded text-base md:text-lg"
                                        {...props}
                                    />
                                ),
                                pre: ({ ...props }) => (
                                    <pre
                                        style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                                        className="p-4 rounded overflow-x-auto text-base md:text-lg"
                                        {...props}
                                    />
                                ),
                                img: ({ src, alt }) => {
                                    const normalizedSrc = typeof src === 'string' ? (src.startsWith('http') ? src : `https://cms.everwellmag.com${src}`) : '';
                                    return (
                                        <Image
                                            src={normalizedSrc}
                                            alt={alt || 'Product image'}
                                            width={786}
                                            height={0}
                                            style={{ width: '100%', maxWidth: '786px', height: 'auto' }}
                                            className="w-full max-w-[786px] h-auto my-4 rounded-lg shadow-md mx-auto"
                                            unoptimized
                                            loading="lazy"
                                        />
                                    );
                                },
                                a: ({ ...props }) => (
                                    <a
                                        style={{ color: '#3B82F6' }}
                                        className="hover:underline hover:text-blue-700 font-medium text-base md:text-lg"
                                        {...props}
                                    />
                                ),
                                strong: ({ ...props }) => <strong className="font-bold text-base md:text-lg" {...props} />,
                                em: ({ ...props }) => <em className="italic text-base md:text-lg" {...props} />,
                                table: ({ ...props }) => (
                                    <div className="overflow-x-auto my-4">
                                        <table
                                            className="min-w-full border-collapse border border-gray-300"
                                            style={{ color: 'var(--foreground)', borderColor: 'var(--foreground)' }}
                                            {...props}
                                        />
                                    </div>
                                ),
                                thead: ({ ...props }) => (
                                    <thead
                                        className="bg-gray-100 dark:bg-gray-800"
                                        style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                                        {...props}
                                    />
                                ),
                                tbody: ({ ...props }) => <tbody {...props} />,
                                tr: ({ ...props }) => (
                                    <tr
                                        className="border-b border-gray-300"
                                        style={{ borderColor: 'var(--foreground)' }}
                                        {...props}
                                    />
                                ),
                                th: ({ ...props }) => (
                                    <th
                                        className="px-4 py-2 text-left font-semibold text-sm md:text-base"
                                        style={{ color: 'var(--foreground)' }}
                                        {...props}
                                    />
                                ),
                                td: ({ ...props }) => (
                                    <td
                                        className="px-4 py-2 text-sm md:text-base"
                                        style={{ color: 'var(--foreground)' }}
                                        {...props}
                                    />
                                ),
                            }}
                        >
                            {product.Description}
                        </ReactMarkdown>
                    ) : (
                        <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
                            No description available
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}