import { fetchStrapi } from './fetch-strapi';
import type { Category } from '@/lib/types/category';

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
        const params = {
            'filters[slug][$eq]': slug,
            populate: '*',
        };
        const response = await fetchStrapi('categories', params);
        return response.data[0] as Category || null;
    } catch (error) {
        console.error('Error fetching category by slug:', error);
        return null;
    }
}