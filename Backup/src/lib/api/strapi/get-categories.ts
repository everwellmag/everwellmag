import { fetchFromStrapi } from './fetch-strapi';
import { Category } from '../../types/category';

export async function getAllCategories(): Promise<Category[] | null> {
    try {
        const data = await fetchFromStrapi('categories?populate[products][populate]=Image&populate[articles][populate]=cover&pagination[pageSize]=10');
        if (!data || !data.data || !Array.isArray(data.data)) {
            console.error('Invalid data structure from Strapi:', data);
            return null;
        }
        return data.data as Category[];
    } catch (error) {
        console.error('Error fetching all categories:', error);
        return null;
    }
}