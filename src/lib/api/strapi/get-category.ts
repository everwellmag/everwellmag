// src/lib/api/strapi/get-category.ts
import { fetchStrapi } from './fetch-strapi';
import type { Category } from '@/lib/types/category';
import type { Article } from '@/lib/types/article';
import type { Product } from '@/lib/types/product';

export interface CategoryWithContent extends Category {
    articles?: Article[];
    products?: Product[];
}

export async function getCategoryBySlug(slug: string): Promise<CategoryWithContent | null> {
    try {
        const params = {
            'filters[slug][$eq]': slug,

            // Populate image
            'populate[image][fields][0]': 'url',
            'populate[image][fields][1]': 'alternativeText',

            // Populate children
            'populate[children][fields][0]': 'id',
            'populate[children][fields][1]': 'slug',
            'populate[children][fields][2]': 'name',
            'populate[children][populate][image][fields][0]': 'url',
            'populate[children][populate][image][fields][1]': 'alternativeText',

            // Populate articles
            'populate[articles][fields][0]': 'id',
            'populate[articles][fields][1]': 'title',
            'populate[articles][fields][2]': 'slug',
            'populate[articles][fields][3]': 'priority',
            'populate[articles][fields][4]': 'createdAt',
            'populate[articles][fields][5]': 'description',
            'populate[articles][populate][image][fields][0]': 'url',

            // Populate products
            'populate[products][fields][0]': 'id',
            'populate[products][fields][1]': 'Name',
            'populate[products][fields][2]': 'slug',
            'populate[products][fields][3]': 'priority',
            'populate[products][fields][4]': 'createdAt',
            'populate[products][fields][5]': 'rating',
            'populate[products][fields][6]': 'supplier',
            'populate[products][fields][7]': 'ReleaseYear',
            'populate[products][fields][8]': 'AffiliateLink',
            'populate[products][fields][9]': 'Pricemulti',   // JSON field — include here (no populate)
            'populate[products][populate][image][fields][0]': 'url',
            'populate[products][populate][tags][fields][0]': 'name',
            'populate[products][populate][tags][fields][1]': 'slug',

        };

        const response = await fetchStrapi('categories', params);
        const category = response?.data?.[0] as CategoryWithContent | undefined;

        if (!category) return null;
        return category;
    } catch (error) {
        console.error('Error fetching category by slug:', error);
        return null;
    }
}
