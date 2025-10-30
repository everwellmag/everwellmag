// src/lib/api/strapi/get-article.ts
import { fetchStrapi } from './fetch-strapi';
import type { Article } from '@/lib/types/article';

export async function getArticle(slug: string): Promise<Article | null> {
    const response = await fetchStrapi('articles', {
        'filters[slug][$eq]': slug,
        populate: '*',
    });

    return (response.data?.[0] as Article) || null;
}