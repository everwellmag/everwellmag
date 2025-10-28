// src/lib/api/strapi/fetch-strapi.ts
import { STRAPI_API_URL } from '@/lib/utils/constants';

// Hỗ trợ tất cả params Strapi: filters[...], populate, sort, v.v.
type StrapiParams = Record<string, string | number | boolean | undefined>;

export async function fetchStrapi(
    endpoint: string,
    params: StrapiParams = {},
    options?: { method?: 'POST'; body?: unknown }
) {
    const url = new URL(`${STRAPI_API_URL}/${endpoint}`);

    // Loại bỏ undefined để tránh append rỗng
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            url.searchParams.append(key, String(value));
        }
    });

    const isPost = options?.method === 'POST';
    const body = isPost ? JSON.stringify(options.body) : undefined;

    const res = await fetch(url.toString(), {
        method: isPost ? 'POST' : 'GET',
        headers: isPost ? { 'Content-Type': 'application/json' } : undefined,
        body,
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Strapi fetch failed: ${res.status} ${errorText}`);
    }

    return res.json();
}