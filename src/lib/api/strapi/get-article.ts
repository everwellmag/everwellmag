// src/lib/api/strapi/get-article.ts
import { fetchStrapi } from './fetch-strapi';
import type { Article } from '@/lib/types/article';

/**
 * Lấy 1 bài viết đầy đủ thông tin theo slug
 * - Bao gồm image, tags, categories, author (với avatar media), blocks (media + rich-text)
 * - Dùng populate chọn lọc (tối ưu băng thông hơn populate=*)
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        const params = {
            'filters[slug][$eq]': slug,

            // === IMAGE chính (media) ===
            'populate[image][fields][0]': 'url',
            'populate[image][fields][1]': 'alternativeText',
            'populate[image][fields][2]': 'caption',

            // === TAGS ===
            'populate[tags][fields][0]': 'id',
            'populate[tags][fields][1]': 'name',
            'populate[tags][fields][2]': 'slug',
            'populate[tags][fields][3]': 'color',

            // === CATEGORIES ===
            'populate[categories][fields][0]': 'id',
            'populate[categories][fields][1]': 'name',
            'populate[categories][fields][2]': 'slug',
            'populate[categories][fields][3]': 'type',
            'populate[categories][populate][parent][fields][0]': 'id',
            'populate[categories][populate][parent][fields][1]': 'name',
            'populate[categories][populate][parent][fields][2]': 'slug',
            'populate[categories][populate][parent][fields][3]': 'type',

            // === AUTHOR (scalar fields only) ===
            'populate[author][fields][0]': 'id',
            'populate[author][fields][1]': 'name',
            // avatar is a media relation — populate it separately:
            'populate[author][populate][avatar][fields][0]': 'url',
            'populate[author][populate][avatar][fields][1]': 'alternativeText',

            // === BLOCKS (markdown + media) ===
            // rich-text block (body)
            'populate[blocks][on][shared.rich-text][fields][0]': 'id',
            'populate[blocks][on][shared.rich-text][fields][1]': 'body',

            // media block: populate its file (media)
            'populate[blocks][on][shared.media][fields][0]': 'id',
            'populate[blocks][on][shared.media][populate][file][fields][0]': 'url',
            'populate[blocks][on][shared.media][populate][file][fields][1]': 'alternativeText',
            'populate[blocks][on][shared.media][populate][file][fields][2]': 'caption',
        };

        const response = await fetchStrapi('articles', params);

        // Safety: verify structure
        const article = response?.data?.[0] ?? null;
        return article;
    } catch (error: unknown) {
        console.error('Error fetching article by slug:', error);
        return null;
    }
}
