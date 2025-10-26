// src/app/product/[slug]/layout.tsx
import { notFound } from 'next/navigation';
import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';
import ProductSchema from '@/components/layout/seo/product-schema';
import BreadcrumbSchema from '@/components/layout/seo/breadcrumb-schema';
import { generateProductMetadata } from '@/lib/seo/generate-product-metadata';
import type { Product } from '@/lib/types/product';

interface ProductLayoutProps {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductLayoutProps) {
    const { slug } = await params;
    let product: Product | null = null;

    try {
        const response = await fetchStrapi(`products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
        console.log('Layout fetchStrapi response:', JSON.stringify(response, null, 2));
        product = response.data[0] as Product;

        if (!product) {
            console.log('No product found for slug:', slug);
            return {
                title: 'Not Found | Everwell Magazine',
                description: 'Product not found.',
            };
        }
    } catch (error) {
        console.error('Error fetching product for slug:', slug, error);
        return {
            title: 'Not Found | Everwell Magazine',
            description: 'Product not found.',
        };
    }

    return generateProductMetadata({
        Name: product.Name,
        slug,
        Description: product.Description,
        metaDescription: product.metaDescription,
        image: product.image?.url,
    });
}

export default async function ProductLayout({ children, params }: ProductLayoutProps) {
    const { slug } = await params;
    let product: Product | null = null;

    try {
        const response = await fetchStrapi(`products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
        console.log('Layout fetchStrapi response:', JSON.stringify(response, null, 2));
        product = response.data[0] as Product;

        if (!product) {
            console.log('No product found for slug:', slug);
            notFound();
        }
    } catch (error) {
        console.error('Error fetching product for slug:', slug, error);
        notFound();
    }

    return (
        <>
            <ProductSchema product={product} />
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: '/' },
                    { name: 'Products', url: '/products' },
                    { name: product.Name, url: `/product/${slug}` },
                ]}
            />
            <div>{children}</div>
        </>
    );
}