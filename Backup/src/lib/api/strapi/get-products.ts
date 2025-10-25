import { fetchStrapi } from './fetch-strapi';
import type { Product } from '@/lib/types/product';

interface GetProductsParams {
    'pagination[page]'?: number;
    'pagination[pageSize]'?: number;
    sort?: string;
}

export async function getProducts(subcategorySlug: string = 'weight-loss-supplements', params: GetProductsParams = {}) {
    const defaultParams = {
        'filters[categories][slug][$eq]': subcategorySlug,
        'pagination[page]': params['pagination[page]'] || 1,
        'pagination[pageSize]': params['pagination[pageSize]'] || 12, // Đồng bộ với articles
        sort: params.sort || 'priority:asc,createdAt:desc',
        populate: '*',
    };
    const data = await fetchStrapi('products', { ...defaultParams, ...params });
    console.log('Products API response for subcategory', subcategorySlug, ':', JSON.stringify(data, null, 2));
    return {
        data: data.data as Product[],
        meta: data.meta || { pagination: { total: data.data.length, page: 1, pageSize: 12 } },
    };
}