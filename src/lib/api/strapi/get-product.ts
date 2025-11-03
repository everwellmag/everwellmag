// src/lib/api/strapi/get-product.ts
import { fetchStrapi } from './fetch-strapi';
import type { Product } from '@/lib/types/product';

interface GetProductOptions {
    populate?: string; // optional override
    detailed?: boolean; // if true, include more fields
}

export async function getProductBySlug(slug: string, options: GetProductOptions = {}): Promise<Product | null> {
    try {
        const baseParams: Record<string, string | number | undefined> = {
            'filters[slug][$eq]': slug,
        };

        if (options.populate) {
            // Nếu dev truyền populate thủ công (ví dụ: '*')
            baseParams.populate = options.populate;
        } else if (options.detailed) {
            // ✅ Deep populate cho trang chi tiết Product
            Object.assign(baseParams, {
                // Ảnh chính
                'populate[image][fields][0]': 'url',
                'populate[image][fields][1]': 'alternativeText',

                // Tag
                'populate[tags][fields][0]': 'id',
                'populate[tags][fields][1]': 'name',
                'populate[tags][fields][2]': 'slug',
                'populate[tags][fields][3]': 'color',

                // Category
                'populate[categories][fields][0]': 'id',
                'populate[categories][fields][1]': 'name',
                'populate[categories][fields][2]': 'slug',
                'populate[categories][fields][3]': 'type',

                // ✅ Thêm deep populate cha
                'populate[categories][populate][parent][fields][0]': 'id',
                'populate[categories][populate][parent][fields][1]': 'name',
                'populate[categories][populate][parent][fields][2]': 'slug',
                'populate[categories][populate][parent][fields][3]': 'type',
            });
        } else {
            // Populate tối giản cho list / card
            Object.assign(baseParams, {
                'populate[image][fields][0]': 'url',
            });
        }

        const response = await fetchStrapi('products', baseParams);

        if (!response?.data?.length) return null;

        const product = response.data[0] as Product;
        return product;
    } catch (err) {
        console.error('Error fetching product:', err);
        return null;
    }
}
