// src/components/layout/seo/product-schema.tsx
import type { Product } from '@/lib/types/product';

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
        url: `https://www.everwellmag.com/${product.slug}`,
        image: product.image?.url || 'https://everwellmag.com/images/og/default.jpg',
        publisher: {
            '@type': 'Organization',
            name: 'Everwell Magazine',
            logo: {
                '@type': 'ImageObject',
                url: 'https://cms.everwellmag.com/uploads/logo_everwell_magazine_156480b913.svg',
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