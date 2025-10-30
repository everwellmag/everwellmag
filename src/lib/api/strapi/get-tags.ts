// src/lib/api/strapi/get-tags.ts
import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';

export async function getAllTags() {
    const response = await fetchStrapi('tags', {
        populate: '*',
        sort: 'name:asc',
    });
    return response as { data: Array<{ id: number; attributes: { name: string; slug: string; description?: string; color?: string } }> };
}