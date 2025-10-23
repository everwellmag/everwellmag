import { getProducts } from '@/lib/api/strapi/get-products';
import ProductCard from './product-card';
import { Category } from '@/lib/types/category';
import { Product } from '@/lib/types/product';

interface RelatedProductsProps {
    categories: Category[];
}

export async function RelatedProducts({ categories }: RelatedProductsProps) {
    const slugs = categories.map(c => c.attributes.slug);
    const products = await getProducts(`filters[categories][slug][$in]=${slugs.join(',')}`);
    if (!products) return null;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}