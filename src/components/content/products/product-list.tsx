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
    q?: string; // Thêm prop q
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
    // Sort client-side (giữ nguyên)
    const sortedProducts = [...products].sort((a, b) => {
        const priorityA = a.priority ?? Number.MAX_SAFE_INTEGER;
        const priorityB = b.priority ?? Number.MAX_SAFE_INTEGER;
        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Điều chỉnh baseUrl để hỗ trợ search
    const baseUrl = q ? `/search?q=${encodeURIComponent(q)}` : `/${category}/${subcategory}`.replace(/\/$/, '');

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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