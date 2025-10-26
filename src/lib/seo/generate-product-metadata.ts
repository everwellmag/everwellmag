// src/lib/seo/generate-product-metadata.ts
import type { Metadata } from 'next';

interface ProductMetadataOptions {
    Name: string;
    slug: string;
    Description?: string;
    metaDescription?: string;
    image?: string;
}

export function generateProductMetadata({ Name, slug, Description, metaDescription, image }: ProductMetadataOptions): Metadata {
    const title = `${Name} | Everwell Magazine`;
    const productDescription = metaDescription || (
        Description
            ? Description.replace(/[#*`[\]()]+/g, '').trim().substring(0, 160).replace(/\s+\S*$/, '...')
            : `Discover ${Name} on Everwell Magazine.`
    );

    return {
        title,
        description: productDescription,
        keywords: [
            Name.toLowerCase(),
            'supplement',
            'health',
            'wellness',
            'everwell magazine',
        ],
        alternates: {
            canonical: `https://everwellmag.com/product/${slug}`,
        },
        openGraph: {
            title,
            description: productDescription,
            url: `https://everwellmag.com/product/${slug}`,
            type: 'website',
            images: [
                {
                    url: image || '/images/og/default.jpg',
                    width: 1200,
                    height: 630,
                    alt: `${Name} - Everwell Magazine`,
                },
            ],
            siteName: 'Everwell Magazine',
        },
        twitter: {
            card: 'summary_large_image',
            site: '@everwellmag',
            creator: '@everwellmag',
            title,
            description: productDescription,
            images: image || '/images/og/default.jpg',
        },
    };
}