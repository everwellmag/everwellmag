// src/lib/api/strapi/get-products.ts
import { fetchStrapi } from './fetch-strapi';
import type { Product } from '@/lib/types/product';

interface GetProductsParams {
    'pagination[page]'?: number;
    'pagination[pageSize]'?: number;
    sort?: string;
    populate?: string; // allow explicit override
    [key: string]: string | number | boolean | undefined;
}

export async function getProducts(
    subcategorySlug: string = 'weight-loss-supplements',
    params: GetProductsParams = {}
) {
    // Default minimal populate for LIST views (fast, small)
    const defaultPopulateParams: Record<string, string | number | undefined> = {
        // Only include fields needed for product cards / lists
        'populate[image][fields][0]': 'url',
        'populate[image][fields][1]': 'alternativeText',
        'populate[tags][fields][0]': 'id',
        'populate[tags][fields][1]': 'name',
        'populate[tags][fields][2]': 'slug',
        // include Pricemulti (json field) and basic scalar fields are returned automatically
        // Note: JSON fields don't require populate, but if you restrict fields, include it
        'fields[0]': 'id',
        'fields[1]': 'Name',
        'fields[2]': 'slug',
        'fields[3]': 'rating',
        'fields[4]': 'supplier',
        'fields[5]': 'ReleaseYear',
        'fields[6]': 'Pricemulti',
    };

    const searchParams: Record<string, string | number | undefined> = {
        'filters[categories][slug][$eq]': subcategorySlug,
        'pagination[page]': params['pagination[page]'] ?? 1,
        'pagination[pageSize]': params['pagination[pageSize]'] ?? 12,
        sort: params.sort ?? 'priority:asc,createdAt:desc',
        // if caller explicitly passed populate, respect it (could be '*' or deep populate)
        ...(params.populate ? { populate: params.populate } : defaultPopulateParams),
        // merge other params (filters etc.)
        ...params,
    };

    // Ensure that explicit params override defaults
    if (params.populate) {
        // remove any duplicated defaultPopulate keys (already handled by spread order above)
    }

    const data = await fetchStrapi('products', searchParams);

    return {
        data: (data.data || []) as Product[],
        meta: data.meta || { pagination: { total: data.data?.length || 0 } },
    };
}
