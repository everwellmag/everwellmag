// src/lib/api/strapi/get-products.ts
import { fetchStrapi } from './fetch-strapi';
import type { Product } from '@/lib/types/product';

// Hỗ trợ đầy đủ params Strapi
interface GetProductsParams {
    'pagination[page]'?: number;
    'pagination[pageSize]'?: number;
    sort?: string;
    populate?: string;
    [key: string]: string | number | boolean | undefined; // Cho filters[...]
}

export async function getProducts(
    subcategorySlug: string = 'weight-loss-supplements',
    params: GetProductsParams = {}
) {
    const searchParams: Record<string, string | number | undefined> = {
        'filters[categories][slug][$eq]': subcategorySlug,
        'pagination[page]': params['pagination[page]'] ?? 1,
        'pagination[pageSize]': params['pagination[pageSize]'] ?? 12,
        sort: params.sort ?? 'priority:asc,createdAt:desc',
        populate: params.populate ?? '*',
        ...params, // Merge params (filters[id][$ne] sẽ được giữ)
    };

    const data = await fetchStrapi('products', searchParams);

    return {
        data: (data.data || []) as Product[],
        meta: data.meta || { pagination: { total: data.data?.length || 0 } },
    };
}