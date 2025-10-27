// src/components/layout/seo/product-schema.tsx
import type { Product } from '@/lib/types/product';
import { DEFAULT_OG_LOGO, DEFAULT_OG_IMAGE } from '@/lib/config';

interface ProductSchemaProps {
    product: Product;
}

export default function ProductSchema({ product }: ProductSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.Name,
        description: product.metaDescription || (
            product.Description
                ? product.Description.replace(/[#*`[\]()]+/g, '').trim().substring(0, 160).replace(/\s+\S*$/, '...')
                : `Discover ${product.Name} on Everwell Magazine.`
        ),
        url: `https://www.everwellmagazine.com/${product.slug}`,
        image: product.image?.url || DEFAULT_OG_IMAGE,
        publisher: {
            '@type': 'Organization',
            name: 'Everwell Magazine',
            logo: {
                '@type': 'ImageObject',
                url: DEFAULT_OG_LOGO,
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}