// src/lib/api/strapi/get-articles.ts
import { fetchStrapi } from './fetch-strapi';
import type { Article } from '@/lib/types/article';

// HỖ TRỢ TẤT CẢ FILTERS STRAPI
export interface GetArticlesParams {  // ← THÊM `export`
    'pagination[page]'?: number;
    'pagination[pageSize]'?: number;
    sort?: string;
    populate?: string;
    [key: string]: string | number | boolean | undefined;
}

export async function getArticles(subcategorySlug: string = 'diet-plan', params: GetArticlesParams = {}) {
    const defaultParams = {
        'filters[categories][slug][$eq]': subcategorySlug,
        'pagination[page]': params['pagination[page]'] ?? 1,
        'pagination[pageSize]': params['pagination[pageSize]'] ?? 12,
        sort: params.sort ?? 'priority:asc,createdAt:desc',
        populate: params.populate ?? '*',
    };

    const data = await fetchStrapi('articles', { ...defaultParams, ...params });

    return {
        data: (data.data || []) as Article[],
        meta: data.meta || { pagination: { total: data.data?.length || 0 } },
    };
}