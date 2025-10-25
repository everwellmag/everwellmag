import { Metadata } from 'next';
import { getProductBySlug } from '../api/strapi/get-product';

interface GenerateProductMetadataProps {
    slug: string;
    subcategory?: string;
}

export async function generateProductMetadata({ slug, subcategory }: GenerateProductMetadataProps): Promise<Metadata> {
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            title: 'Product Not Found | Everwell Magazine',
            description: 'The product you are looking for does not exist.',
        };
    }

    return {
        title: `${product.Name} | Best ${product.Supplier} Supplement | Everwell Magazine`,
        description: `${product.Description.substring(0, 160)}...`,
        openGraph: {
            title: `${product.Name} Review`,
            description: `${product.Description.substring(0, 160)}...`,
            type: 'website',
            images: product.Image?.url ? [{ url: product.Image.url }] : [],
        },
        alternates: {
            canonical: `/weight-loss/${subcategory}/${slug}`,
        },
    };
}