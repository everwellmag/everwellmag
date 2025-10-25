import { fetchStrapi } from './fetch-strapi';
import type { Article } from '@/lib/types/article';

interface GetArticlesParams {
    'pagination[page]'?: number;
    'pagination[pageSize]'?: number;
    sort?: string;
}

export async function getArticles(subcategorySlug: string = 'diet-plan', params: GetArticlesParams = {}) {
    const defaultParams = {
        'filters[categories][slug][$eq]': subcategorySlug,
        'pagination[page]': params['pagination[page]'] || 1,
        'pagination[pageSize]': params['pagination[pageSize]'] || 12, // Đồng bộ với products
        sort: params.sort || 'priority:asc,createdAt:desc',
        populate: '*',
    };
    const data = await fetchStrapi('articles', { ...defaultParams, ...params });
    console.log('Articles API response for subcategory', subcategorySlug, ':', JSON.stringify(data, null, 2));
    return {
        data: data.data as Article[],
        meta: data.meta || { pagination: { total: data.data.length, page: 1, pageSize: 12 } },
    };
}