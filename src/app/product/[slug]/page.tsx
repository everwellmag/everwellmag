// src/app/product/[slug]/page.tsx
import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';
import { getProducts } from '@/lib/api/strapi/get-products';
import type { Product } from '@/lib/types/product';
import type { Comment } from '@/lib/types/comment';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/content/products/product-detail';
import RelatedProducts from '@/components/content/products/related-products';

interface ProductPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
    const { slug } = await params;
    const { page = '1' } = await searchParams;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = 10;

    if (!slug) {
        console.log('No slug provided');
        notFound();
    }

    let product: Product | null = null;
    let comments: Comment[] = [];
    let totalComments = 0;
    let relatedProducts: Product[] = [];

    try {
        // === 1. LẤY CHI TIẾT SẢN PHẨM ===
        const response = await fetchStrapi(`products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
        product = response.data[0] as Product;

        if (!product) {
            console.log('No product found for slug:', slug);
            notFound();
        }

        // === 2. LẤY BÌNH LUẬN ===
        if (product.documentId) {
            const commentsResponse = await fetchStrapi('comments', {
                'filters[product][documentId][$eq]': product.documentId,
                'populate': 'product',
                'sort': 'createdAt:desc',
                'pagination[page]': pageNumber,
                'pagination[pageSize]': pageSize,
            });
            comments = (commentsResponse.data as Comment[]) || [];
            totalComments = commentsResponse.meta?.pagination?.total || comments.length;
        }

        // === 3. LẤY RELATED PRODUCTS (cùng category, loại trừ current) ===
        const categorySlug = product.categories[0]?.slug;
        if (categorySlug) {
            const relatedResponse = await getProducts(categorySlug, {
                'pagination[page]': 1,
                'pagination[pageSize]': 12,
                sort: 'priority:asc,createdAt:desc',
                'filters[id][$ne]': product.id,
            });
            relatedProducts = relatedResponse.data || [];
        }
    } catch (error) {
        console.error('Error fetching data for product slug:', slug, error);
        // Vẫn hiển thị sản phẩm nếu có, chỉ thiếu comments/related
    }

    if (!product) {
        notFound();
    }

    return (
        <>
            {/* CHI TIẾT SẢN PHẨM */}
            <ProductDetail
                product={product}
                comments={comments}
                totalComments={totalComments}
                currentPage={pageNumber}
                slug={slug}
            />

            {/* SẢN PHẨM LIÊN QUAN – chỉ hiện nếu có */}
            {relatedProducts.length > 0 && (
                <RelatedProducts
                    currentProduct={product}
                    category={product.categories[0]?.slug || ''}
                />
            )}
        </>
    );
}