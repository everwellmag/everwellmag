// src/components/content/products/related-products.tsx
import { getProducts } from '@/lib/api/strapi/get-products';
import ProductCard from './product-card';
import type { Product } from '@/lib/types/product';

interface RelatedProductsProps {
    currentProduct: Product;
    category: string;
}

export default async function RelatedProducts({ currentProduct, category }: RelatedProductsProps) {
    const currentId = currentProduct.id;

    try {
        const { data: related } = await getProducts(category, {
            'pagination[page]': 1,
            'pagination[pageSize]': 12,
            sort: 'priority:asc,createdAt:desc',
            'filters[id][$ne]': currentId,
        });

        if (!related || related.length === 0) return null;

        return (
            <section className="container mx-auto px-6 md:px-4 lg:px-6 py-8 mt-12">
                <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--title-color)' }}>
                    Related Supplements ({related.length})
                </h2>

                {/* GRID ĐÚNG NHƯ product-list.tsx */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
                    {related.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            category={category}
                            subcategory=""
                        />
                    ))}
                </div>
            </section>
        );
    } catch (error) {
        console.error('Failed to load related products:', error);
        return null;
    }
}