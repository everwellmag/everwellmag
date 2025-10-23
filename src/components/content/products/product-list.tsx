import ProductCard from './product-card';
import type { Product } from '@/lib/types/product';

interface ProductListProps {
    products: Product[];
    category: string;
    subcategory: string;
}

export default function ProductList({ products, category, subcategory }: ProductListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} category={category} subcategory={subcategory} />
            ))}
        </div>
    );
}