// src/lib/seo/generate-product-metadata.ts
import type { Metadata } from 'next';
import { SITE_DOMAIN, CMS_DOMAIN, DEFAULT_OG_IMAGE } from '@/lib/config';

interface ProductMetadataOptions {
    Name: string;
    slug: string;
    Description?: string;
    metaDescription?: string;
    image?: string;
}

export function generateProductMetadata({
    Name,
    slug,
    Description,
    metaDescription,
    image,
}: ProductMetadataOptions): Metadata {
    const metaTitle = `${Name} | Everwell Magazine`;

    const metaDescriptionText =
        metaDescription ||
        (Description
            ? Description.replace(/[#*`[\]()]+/g, '').trim().substring(0, 160).replace(/\s+\S*$/, '...')
            : `Discover ${Name} on Everwell Magazine.`);

    const productImage = image
        ? image.startsWith('http')
            ? image
            : `${CMS_DOMAIN}${image.startsWith('/') ? '' : '/'}${image}`
        : DEFAULT_OG_IMAGE;

    return {
        title: metaTitle,
        description: metaDescriptionText,
        keywords: [
            Name.toLowerCase(),
            'supplement',
            'health',
            'wellness',
            'everwell magazine',
        ],
        alternates: {
            canonical: `${SITE_DOMAIN}/product/${slug}`,
        },
        openGraph: {
            title: metaTitle,
            description: metaDescriptionText,
            url: `${SITE_DOMAIN}/product/${slug}`,
            type: 'website', // ✅ tránh lỗi TS, vẫn hợp lệ OG
            images: [
                {
                    url: productImage,
                    width: 1200,
                    height: 630,
                    alt: `${Name} - Everwell Magazine`,
                    type: 'image/webp',
                },
            ],
            siteName: 'Everwell Magazine',
        },
        twitter: {
            card: 'summary_large_image',
            site: '@everwellmag',
            creator: '@everwellmag',
            title: metaTitle,
            description: metaDescriptionText,
            images: [productImage],
        },
        other: {
            'og:type': 'product', // ✅ vẫn thêm tag "product" thủ công để bot SEO đọc được
            'product:brand': 'Everwell Magazine',
            'product:availability': 'in stock',
            'og:image:secure_url': productImage,
            'og:image:type': 'image/webp',
            'og:image:alt': `${Name} - Everwell Magazine`,
            'og:image:width': '1200',
            'og:image:height': '630',
        },
    };
}
