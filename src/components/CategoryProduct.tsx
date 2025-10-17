'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Loading from './Loading';

// Define TypeScript interfaces for the API response from Products
interface PriceMulti {
    quantity: number;
    price: number;
    currency: string;
}

interface Product {
    id: number;
    Name: string;
    Description: string;
    Price: string;
    Supplier: string;
    ReleaseYear?: string;
    AffiliateLink: string;
    slug: string | null;
    Priority?: number;
    Image: {
        url: string;
        alternativeText?: string;
        width?: number;
        height?: number;
    } | null;
    category: {
        id: number;
        name: string;
        slug: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
    rating?: number;
    Pricemulti: PriceMulti[];
    createdAt: string;
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

interface CategoryProductProps {
    categoryId: number;
    title: string;
    description: string;
}

// Function to extract the first image URL from description
const getFirstImageFromDescription = (description: string): string | null => {
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = description.match(regex);
    return match ? (match[1].startsWith('http') ? match[1] : `https://cms.everwellmag.com${match[1]}`) : null;
};

// Function to normalize image URL
const normalizeImageUrl = (image?: { url?: string } | null): string | null => {
    if (!image || !image.url) return null;
    return image.url.startsWith('http') ? image.url : `https://cms.everwellmag.com${image.url}`;
};

// Function to generate star rating with decimal support using CSS clip-path
const getStarRating = (rating?: number): React.ReactNode => {
    if (rating === undefined || rating < 0) return <span>No rating</span>;
    const fullStars = Math.floor(rating);
    const decimal = rating % 1;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={`full-${i}`} style={{ color: '#FFD700', fontSize: '1.2em' }}>★</span>);
    }

    if (decimal > 0 && fullStars < 5) {
        const clipPercentage = decimal * 100;
        stars.push(
            <span
                key="decimal"
                style={{
                    color: '#FFD700',
                    fontSize: '1.2em',
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
        stars.push(<span key={`empty-${i}`} style={{ color: '#D3D3D3', fontSize: '1.2em' }}>★</span>);
    }

    return <span>{stars}</span>;
};

export default function CategoryProduct({ categoryId, title, description }: CategoryProductProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [pagination, setPagination] = useState<{
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    }>({ page: 1, pageSize: 10, pageCount: 1, total: 0 });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `https://cms.everwellmag.com/api/products?filters[category][id]=${categoryId}&pagination[page]=${page}&pagination[pageSize]=10&populate=*`,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        next: { revalidate: 3600 }
                    }
                );
                if (!response.ok) {
                    console.error(`API error: ${response.status} ${response.statusText}, URL: ${response.url}`);
                    throw new Error(`Failed to fetch products: ${response.statusText}`);
                }
                const data: ApiResponse = await response.json();
                const sortedProducts = data.data.sort((a, b) => {
                    const priorityA = a.Priority ?? Infinity;
                    const priorityB = b.Priority ?? Infinity;
                    if (priorityA !== priorityB) {
                        return priorityA - priorityB;
                    }
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });

                setProducts(sortedProducts);
                setPagination(data.meta.pagination);
                setLoading(false);
            } catch (err: unknown) {
                console.error(`Fetch error: ${err instanceof Error ? err.message : 'Unknown error'}`);
                setError((err instanceof Error ? err.message : 'An error occurred') || 'Error');
                setLoading(false);
            }
        };
        fetchProducts();
    }, [categoryId, page]);

    if (loading) return <Loading />;
    if (error) return <div className="container mx-auto p-4 text-center" style={{ color: 'var(--foreground)' }}>{error}</div>;
    if (products.length === 0) return (
        <div className="container mx-auto p-4 text-center" style={{ color: 'var(--foreground)' }}>
            No products found in this category yet. Explore our{' '}
            <Link href="/" className="text-blue-600 hover:underline">
                Home page
            </Link>{' '}
            for great options!
        </div>
    );

    return (
        <div className="container mx-auto p-4 py-8" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {title}
            </h1>
            <p className="text-center mb-12 text-lg max-w-2xl mx-auto" style={{ color: 'var(--foreground)' }}>
                {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => {
                    let imageUrl = normalizeImageUrl(product.Image);
                    if (!imageUrl) {
                        imageUrl = getFirstImageFromDescription(product.Description);
                    }
                    const productSlug = product.slug || product.id.toString();

                    return (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-blue-500"
                            style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                        >
                            {imageUrl && (
                                <Link href={`/product/${productSlug}`} aria-label={`View details for ${product.Name}`}>
                                    <div className="relative w-full h-56">
                                        <Image
                                            src={imageUrl}
                                            alt={`${product.Name} - ${title} supplement`}
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                                            priority={index === 0 || !products[index - 1]}
                                        />
                                    </div>
                                </Link>
                            )}

                            <div className="px-6 pt-6 pb-3">
                                <h2 className="text-lg font-semibold mb-2 line-clamp-2" style={{ color: 'var(--foreground)' }}>
                                    <Link href={`/product/${productSlug}`} className="hover:text-blue-600" aria-label={`View details for ${product.Name}`}>
                                        {product.Name}
                                    </Link>
                                </h2>
                                <div className="space-y-1 mb-2">
                                    {product.Pricemulti && product.Pricemulti.length > 0 ? (
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {product.Pricemulti.map((priceOption, index) => (
                                                <div
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-50 rounded-lg border border-blue-500 text-sm"
                                                    style={{ backgroundColor: 'var(--background)', borderColor: '#3B82F6' }}
                                                >
                                                    <span className="font-medium" style={{ color: 'var(--foreground)' }}>
                                                        {priceOption.quantity} {priceOption.quantity > 1 ? 'units' : 'unit'}:
                                                    </span>{' '}
                                                    <span className="font-semibold text-green-600">
                                                        {priceOption.currency}{priceOption.price}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm italic mb-2" style={{ color: 'var(--foreground)' }}>
                                            No pricing options available
                                        </p>
                                    )}
                                    <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                                        Supplier: {product.Supplier}
                                    </p>
                                    {product.ReleaseYear && (
                                        <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                                            Released: {product.ReleaseYear}
                                        </p>
                                    )}
                                    {product.rating !== undefined && (
                                        <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                                            <span className="font-medium">Rating:</span> {getStarRating(product.rating)} ({product.rating}/5)
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="pt-2 pb-4 px-4 bg-gray-50 flex gap-3" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
                                <Link
                                    href={`/product/${productSlug}`}
                                    className="flex-1 text-center py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
                                    style={{ color: 'var(--foreground)' }}
                                    aria-label={`View details for ${product.Name}`}
                                >
                                    Detail
                                </Link>
                                <a
                                    href={product.AffiliateLink}
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    className="flex-1 block text-center py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                                    aria-label={`Purchase ${product.Name}`}
                                >
                                    Buy Now
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>

            {pagination.pageCount > 1 && (
                <div className="flex justify-center items-center mt-8 gap-4">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded-lg bg-blue-500 text-white font-medium transition-all duration-200 ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        Previous
                    </button>
                    <span className="text-lg" style={{ color: 'var(--foreground)' }}>
                        Page {pagination.page} of {pagination.pageCount} (Total: {pagination.total} products)
                    </span>
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, pagination.pageCount))}
                        disabled={page === pagination.pageCount}
                        className={`px-4 py-2 rounded-lg bg-blue-500 text-white font-medium transition-all duration-200 ${page === pagination.pageCount ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}