import { NextRequest, NextResponse } from 'next/server';
import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';
import type { Article } from '@/lib/types/article';
import type { Product } from '@/lib/types/product';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim();

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    try {
        // Tìm kiếm articles
        const articleResponse = await fetchStrapi('articles', {
            'filters[$or][0][title][$containsi]': query,
            'filters[$or][1][description][$containsi]': query,
            'populate': 'image',
        });

        // Tìm kiếm products
        const productResponse = await fetchStrapi('products', {
            'filters[$or][0][Name][$containsi]': query,
            'filters[$or][1][Description][$containsi]': query,
            'populate': 'Image',
        });

        const results = {
            articles: (articleResponse.data || []) as Article[],
            products: (productResponse.data || []) as Product[],
        };

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error('Error searching:', error);
        return NextResponse.json({ error: 'Failed to search' }, { status: 500 });
    }
}