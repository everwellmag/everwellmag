import { fetchStrapi } from './fetch-strapi';
import type { Product } from '@/lib/types/product';

export async function getProducts(subcategorySlug: string = 'weight-loss-supplements', page: number = 1) {
    const params = {
        'filters[categories][slug][$eq]': subcategorySlug, // Filter theo subcategory slug thay vì id
        'pagination[page]': page,
        'pagination[pageSize]': 10,
        populate: '*',
    };
    const data = await fetchStrapi('products', params);
    console.log('Products API response for subcategory', subcategorySlug, ':', data); // Debug
    return data.data as Product[];
}