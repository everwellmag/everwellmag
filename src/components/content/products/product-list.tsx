// src/components/content/products/product-list.tsx
import ProductCard from './product-card';
import Pagination from '@/components/ui/pagination';
import type { Product } from '@/lib/types/product';

interface ProductListProps {
    products: Product[];
    category: string;
    subcategory: string;
    currentPage: number;
    totalItems: number;
    pageSize: number;
    q?: string;
    showPagination?: boolean;
}

export default function ProductList({
    products,
    category,
    subcategory,
    currentPage,
    totalItems,
    pageSize,
    q,
}: ProductListProps) {
    // Sort client-side
    const sortedProducts = [...products].sort((a, b) => {
        const priorityA = a.priority ?? Number.MAX_SAFE_INTEGER;
        const priorityB = b.priority ?? Number.MAX_SAFE_INTEGER;
        if (priorityA !== priorityB) return priorityA - priorityB;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Base URL for pagination
    const baseUrl = q
        ? `/search?q=${encodeURIComponent(q)}`
        : `/${category}/${subcategory}`.replace(/\/$/, '');

    return (
        <div className="container mx-auto px-2 py-8">
            {/* RESPONSIVE GRID: 1→2→3→4 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
                {sortedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        category={category}
                        subcategory={subcategory}
                    />
                ))}
            </div>

            {totalItems > pageSize && (
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        pageSize={pageSize}
                        baseUrl={baseUrl}
                    />
                </div>
            )}
        </div>
    );
}