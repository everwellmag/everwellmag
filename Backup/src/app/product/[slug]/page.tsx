import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';
import type { Product } from '@/lib/types/product';
import type { Comment } from '@/lib/types/comment';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/content/products/product-detail';

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

    try {
        const response = await fetchStrapi(`products?filters[slug][$eq]=${slug}&populate=*`);
        console.log('Product detail API response:', JSON.stringify(response, null, 2));
        product = response.data[0] as Product;

        if (!product) {
            console.log('No product found for slug:', slug);
            notFound();
        }

        if (product.documentId) {
            console.log('Fetching comments for product documentId:', product.documentId);
            const commentsResponse = await fetchStrapi('comments', {
                'filters[product][documentId][$eq]': product.documentId,
                'populate': 'product',
                'sort': 'createdAt:desc',
                'pagination[page]': pageNumber,
                'pagination[pageSize]': pageSize,
            });
            console.log('Comments API response:', JSON.stringify(commentsResponse, null, 2));
            comments = (commentsResponse.data as Comment[]) || [];
            totalComments = commentsResponse.meta?.pagination?.total || comments.length;
        } else {
            console.warn('No product.documentId found, skipping comments');
        }
    } catch (error) {
        console.error('Error fetching product or comments for slug:', slug, error);
        console.log('Proceeding with product display, comments may be empty');
    }

    if (!product) {
        console.log('No product found for slug:', slug);
        notFound();
    }

    return (
        <ProductDetail
            product={product}
            comments={comments}
            totalComments={totalComments}
            currentPage={pageNumber}
            slug={slug}
        />
    );
}