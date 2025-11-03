// src/app/product/[slug]/layout.tsx
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/api/strapi/get-product';
import ProductSchema from '@/components/layout/seo/product-schema';
import BreadcrumbSchema from '@/components/layout/seo/breadcrumb-schema';
import { generateProductMetadata } from '@/lib/seo/generate-product-metadata';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Product } from '@/lib/types/product';

interface ProductLayoutProps {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductLayoutProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug, { detailed: true });

    if (!product) {
        return {
            title: 'Not Found | Everwell Magazine',
            description: 'Product not found.',
        };
    }

    return generateProductMetadata({
        Name: product.Name,
        slug: product.slug,
        Description: product.Description,
        metaDescription: product.metaDescription,
        image: product.image?.url,
    });
}

export default async function ProductLayout({ children, params }: ProductLayoutProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug, { detailed: true });

    if (!product) notFound();

    return (
        <>
            <ProductSchema product={product} />
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: '/' },
                    { name: product.categories?.[0]?.name || 'Products', url: `/${product.categories?.[0]?.slug || 'products'}` },
                    { name: product.Name, url: `/product/${product.slug}` },
                ]}
            />
            <div>{children}</div>
        </>
    );
}
