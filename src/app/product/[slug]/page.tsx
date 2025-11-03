// src/app/product/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';
import { getProducts } from '@/lib/api/strapi/get-products';
import type { Product } from '@/lib/types/product';
import type { Comment } from '@/lib/types/comment';
import ProductDetail from '@/components/content/products/product-detail';
import RelatedProducts from '@/components/content/products/related-products';

// ✅ ISR 5 phút
export const revalidate = 300;

interface ProductPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
    const { slug } = await params;
    const { page = '1' } = await searchParams;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = 10;

    if (!slug) notFound();

    let product: Product | null = null;
    let comments: Comment[] = [];
    let totalComments = 0;
    let relatedProducts: Product[] = [];

    try {
        // === FETCH SONG SONG (Promise.all) ===
        const productPromise = fetchStrapi('products', {
            'filters[slug][$eq]': slug,

            // === IMAGE chính (media) ===
            'populate[image][fields][0]': 'url',
            'populate[image][fields][1]': 'alternativeText',

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

            // ✅ DEEP POPULATE CHA (breadcrumb cần)
            'populate[categories][populate][parent][fields][0]': 'id',
            'populate[categories][populate][parent][fields][1]': 'name',
            'populate[categories][populate][parent][fields][2]': 'slug',
            'populate[categories][populate][parent][fields][3]': 'type',
        });

        const [productResponse] = await Promise.all([productPromise]);
        product = productResponse.data?.[0] as Product;

        if (!product) notFound();

        const commentsPromise = product.documentId
            ? fetchStrapi('comments', {
                'filters[product][documentId][$eq]': product.documentId,
                populate: 'product',
                sort: 'createdAt:desc',
                'pagination[page]': pageNumber,
                'pagination[pageSize]': pageSize,
            })
            : Promise.resolve(null);

        const relatedPromise = product.categories?.[0]?.slug
            ? getProducts(product.categories[0].slug, {
                'pagination[page]': 1,
                'pagination[pageSize]': 12,
                sort: 'priority:asc,createdAt:desc',
                'filters[id][$ne]': product.id,
            })
            : Promise.resolve({ data: [] });

        const [commentsResponse, relatedResponse] = await Promise.all([
            commentsPromise,
            relatedPromise,
        ]);

        if (commentsResponse) {
            comments = commentsResponse.data || [];
            totalComments = commentsResponse.meta?.pagination?.total || comments.length;
        }
        relatedProducts = relatedResponse?.data || [];
    } catch (error) {
        console.error('Error fetching product page data:', error);
    }

    if (!product) notFound();

    return (
        <>
            <ProductDetail
                product={product}
                comments={comments}
                totalComments={totalComments}
                currentPage={pageNumber}
                slug={slug}
            />

            {relatedProducts.length > 0 && (
                <RelatedProducts
                    currentProduct={product}
                    category={product.categories?.[0]?.slug || ''}
                />
            )}
        </>
    );
}
