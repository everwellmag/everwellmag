import { STRAPI_API_URL } from '@/lib/utils/constants';

type StrapiParams = Record<string, string | number | boolean>;

export async function fetchStrapi(
    endpoint: string,
    params: StrapiParams = {},
    options?: { method?: 'POST'; body?: unknown } // ← any → unknown
) {
    const url = new URL(`${STRAPI_API_URL}/${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
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