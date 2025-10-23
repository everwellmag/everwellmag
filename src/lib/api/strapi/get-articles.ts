import { fetchStrapi } from './fetch-strapi';
import type { Article } from '@/lib/types/article';

export async function getArticles(subcategorySlug: string = 'diet-plan', page: number = 1) {
    const params = {
        'filters[categories][slug][$eq]': subcategorySlug,
        'pagination[page]': page,
        'pagination[pageSize]': 10,
        populate: '*',
    };
    const data = await fetchStrapi('articles', params);
    console.log('Articles API response for subcategory', subcategorySlug, ':', data);
    return data.data as Article[];
}