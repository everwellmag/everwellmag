// src/components/content/search-results.tsx
'use client';

import { useState, useEffect } from 'react';
import ArticleList from '@/components/content/articles/article-list';
import ProductList from '@/components/content/products/product-list';
import Link from 'next/link';
import type { Article } from '@/lib/types/article';
import type { Product } from '@/lib/types/product';

interface SearchResult {
    articles: Article[];
    totalArticles: number;
    products: Product[];
    totalProducts: number;
}

interface SearchResultsProps {
    q: string;
    page: number;
}

export default function SearchResults({ q, page }: SearchResultsProps) {
    const [results, setResults] = useState<SearchResult>({ articles: [], products: [], totalArticles: 0, totalProducts: 0 });
    const [loading, setLoading] = useState(true);
    const pageSize = 10;

    useEffect(() => {
        setLoading(true);
        fetch(`/api/search?q=${encodeURIComponent(q)}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setResults(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [q, page]);

    return (
        <div>
            {/* Waiting state */}
            {loading && (
                <div className="text-center py-8">
                    <p className="text-lg text-gray-500">Waiting...</p>
                </div>
            )}

            {/* Articles Section */}
            {!loading && results.totalArticles > 0 && (
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Articles ({results.totalArticles})</h2>
                    <ArticleList
                        articles={results.articles}
                        category=""
                        subcategory=""
                        currentPage={page}
                        totalItems={results.totalArticles}
                        pageSize={pageSize}
                        q={q}
                    />
                </section>
            )}

            {/* Products Section */}
            {!loading && results.totalProducts > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-4">Products ({results.totalProducts})</h2>
                    <ProductList
                        products={results.products}
                        category=""
                        subcategory=""
                        currentPage={page}
                        totalItems={results.totalProducts}
                        pageSize={pageSize}
                        q={q}
                    />
                </section>
            )}

            {/* No results */}
            {!loading && results.totalArticles === 0 && results.totalProducts === 0 && (
                <div className="text-center py-8">
                    <p className="text-lg text-gray-500 mb-4">No results found for &quot;{q}&quot;.</p>
                    <Link
                        href="/"
                        className="inline-block text-white px-4 py-2 rounded-md font-medium text-sm"
                        style={{
                            backgroundImage: 'var(--gradient-primary)',
                            transition: 'background-image 0.2s ease-in-out',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundImage = 'var(--gradient-primary-hover)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundImage = 'var(--gradient-primary)')}
                    >
                        Go back to Home
                    </Link>
                </div>
            )}
        </div>
    );
}