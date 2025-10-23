import { STRAPI_API_URL } from '@/lib/utils/constants';

export async function fetchStrapi(endpoint: string, params: Record<string, any> = {}) {
    const url = new URL(`${STRAPI_API_URL}/${endpoint}`);
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    const res = await fetch(url.toString(), { next: { revalidate: 60 } }); // Caching 1 phút
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
}