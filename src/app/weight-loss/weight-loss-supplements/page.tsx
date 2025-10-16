'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    const fullStars = Math.floor(rating); // Số sao đầy
    const decimal = rating % 1; // Phần thập phân
    const stars = [];

    // Thêm sao đầy
    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={`full-${i}`} style={{ color: '#FFD700', fontSize: '1.2em' }}>★</span>);
    }

    // Thêm sao thập phân (nửa sao hoặc một phần sao)
    if (decimal > 0 && fullStars < 5) {
        const clipPercentage = decimal * 100; // Phần trăm đầy của sao
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
                <span style={{ color: '#D3D3D3' }}>★</span> {/* Sao nền xám */}
            </span>
        );
    }

    // Thêm sao rỗng
    const emptyStars = 5 - fullStars - (decimal > 0 ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<span key={`empty-${i}`} style={{ color: '#D3D3D3', fontSize: '1.2em' }}>★</span>);
    }

    return <span>{stars}</span>;
};

export default function WeightLossSupplementsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Fetching products...');
                const response = await fetch(
                    'https://cms.everwellmag.com/api/products?filters[category][id]=2&pagination[page]=1&pagination[pageSize]=10&populate=*',
                    { headers: { 'Content-Type': 'application/json' } }
                );
                console.log('Response status:', response.status);
                if (!response.ok) throw new Error(`Failed to fetch products: ${response.statusText}`);
                const data: ApiResponse = await response.json();
                console.log('Fetched data:', data);
                if (!data.data || data.data.length === 0) throw new Error('No products found for this category');
                setProducts(data.data);
                setLoading(false);
            } catch (err: unknown) {
                console.error('Error fetching products:', err);
                setError((err instanceof Error ? err.message : 'An error occurred') || 'Error');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div className="container mx-auto p-4 text-center" style={{ color: 'var(--foreground)' }}>Loading...</div>;
    if (error) return <div className="container mx-auto p-4 text-center" style={{ color: 'var(--foreground)' }}>{error}</div>;
    if (products.length === 0) return <div className="container mx-auto p-4 text-center" style={{ color: 'var(--foreground)' }}>No products available.</div>;

    return (
        <div className="container mx-auto p-4 py-8" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Weight Loss Supplements
            </h1>
            <p className="text-center mb-12 text-lg max-w-2xl mx-auto" style={{ color: 'var(--foreground)' }}>
                Discover top-tier weight loss supplements from trusted providers. Click to shop via our affiliate links!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                    let imageUrl = normalizeImageUrl(product.Image); // Prioritize attached image
                    if (!imageUrl) {
                        imageUrl = getFirstImageFromDescription(product.Description); // Fallback to first image in description
                    }
                    const productSlug = product.slug || product.id.toString();

                    return (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-blue-500"
                            style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                        >
                            {imageUrl && (
                                <Link href={`/product/${productSlug}`}>
                                    <div className="relative w-full h-56">
                                        <Image
                                            src={imageUrl}
                                            alt={product.Image?.alternativeText || product.Name}
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                                        />
                                    </div>
                                </Link>
                            )}

                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2 line-clamp-2" style={{ color: 'var(--foreground)' }}>
                                    <Link href={`/product/${productSlug}`} className="hover:text-blue-600">
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
                                                        {priceOption.price} {priceOption.currency}
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

                            <div className="p-4 bg-gray-50 flex gap-3" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
                                <Link
                                    href={`/product/${productSlug}`}
                                    className="flex-1 text-center py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    Detail
                                </Link>
                                <a
                                    href={product.AffiliateLink}
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    className="flex-1 block text-center py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                                >
                                    Buy Now
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}