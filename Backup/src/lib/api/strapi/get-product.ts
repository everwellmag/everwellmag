import { fetchStrapi } from './fetch-strapi';
import type { Product } from '@/lib/types/product';

export async function getProductBySlug(slug: string, categorySlug?: string): Promise<Product | null> {
    try {
        const data = await fetchStrapi(`products?filters[slug][$eq]=${slug}&populate=*`); // Populate all fields
        if (!data || !data.data || data.data.length === 0) {
            console.warn(`No product found for slug: ${slug}`);
            return null;
        }
        const product = data.data[0] as Product;
        // Optional: Validate category if needed
        if (categorySlug && !product.categories.some(cat => cat.slug === categorySlug)) {
            return null; // Sai category
        }
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}