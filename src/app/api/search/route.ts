import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = 10;

    if (!q) {
        return NextResponse.json({ articles: [], products: [], totalArticles: 0, totalProducts: 0 });
    }

    // Query cho articles (giữ nguyên: lọc title, description, slug)
    const articlesParams = new URLSearchParams({
        'filters[$or][0][title][$containsi]': q,
        'filters[$or][1][description][$containsi]': q,
        'filters[$or][2][slug][$containsi]': q,
        'pagination[page]': page.toString(),
        'pagination[pageSize]': pageSize.toString(),
        'populate': '*',
        'sort': 'createdAt:desc',
    });

    // Query cho products (chỉ lọc Name)
    const productsParams = new URLSearchParams({
        'filters[Name][$containsi]': q,
        'pagination[page]': page.toString(),
        'pagination[pageSize]': pageSize.toString(),
        'populate': '*',
        'sort': 'createdAt:desc',
    });

    try {
        const [articlesRes, productsRes] = await Promise.all([
            fetch(`https://cms.everwellmag.com/api/articles?${articlesParams}`),
            fetch(`https://cms.everwellmag.com/api/products?${productsParams}`),
        ]);

        const articlesData = await articlesRes.json();
        const productsData = await productsRes.json();

        // Log để debug
        console.log('Articles response:', { status: articlesRes.status, data: articlesData.data?.length || 0 });
        console.log('Products response:', { status: productsRes.status, data: productsData.data?.length || 0 });

        return NextResponse.json({
            articles: articlesData.data || [],
            totalArticles: articlesData.meta?.pagination?.total || 0,
            products: productsData.data || [],
            totalProducts: productsData.meta?.pagination?.total || 0,
        });
    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json({ articles: [], products: [], totalArticles: 0, totalProducts: 0 }, { status: 500 });
    }
}