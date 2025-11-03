// src/components/layout/seo/product-schema.tsx
import type { Product } from '@/lib/types/product';
import { SITE_DOMAIN, DEFAULT_OG_IMAGE, DEFAULT_OG_LOGO } from '@/lib/config';

interface ProductSchemaProps {
    product: Product;
}

export default function ProductSchema({ product }: ProductSchemaProps) {
    const description =
        product.metaDescription ||
        (product.Description
            ? product.Description.replace(/[#*`[\]()]+/g, '')
                .trim()
                .substring(0, 160)
                .replace(/\s+\S*$/, '...')
            : `Discover ${product.Name} on Everwell Magazine.`);

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.Name,
        description,
        url: `${SITE_DOMAIN}/product/${product.slug}`,
        image: product.image?.url ? `${SITE_DOMAIN}${product.image.url}` : DEFAULT_OG_IMAGE,
        brand: {
            '@type': 'Brand',
            name: product.supplier || 'Everwell Magazine',
        },
        aggregateRating: product.rating
            ? {
                '@type': 'AggregateRating',
                ratingValue: product.rating,
                bestRating: '5',
                ratingCount: 1,
            }
            : undefined,
        offers:
            product.Pricemulti && product.Pricemulti.length > 0
                ? {
                    '@type': 'Offer',
                    priceCurrency: product.Pricemulti[0].currency || 'USD',
                    price: product.Pricemulti[0].price,
                    availability: 'https://schema.org/InStock',
                    url: `${SITE_DOMAIN}/product/${product.slug}`,
                }
                : undefined,
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
