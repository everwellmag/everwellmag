// C:\Users\Kathay\everwellmag\src\app\product\[slug]\layout.tsx
import { PropsWithChildren } from 'react';
import { fetchFromStrapi } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';

// Define TypeScript interfaces
interface PriceMulti {
    quantity: number;
    price: number;
    currency: string;
}

// Function to normalize image URL
const normalizeImageUrl = (image?: { url?: string | Blob } | null): string | null => {
    if (!image || !image.url) return null;
    const url = image.url;
    if (typeof url === 'string') {
        return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
    } else if (url instanceof Blob) {
        return URL.createObjectURL(url);
    }
    return null;
};

// Function to clean Markdown for description
const cleanDescription = (text: string): string => {
    let cleaned = text.replace(/!\[.*?\]\(.*?\)/g, '');
    cleaned = cleaned.replace(/\[([^\]]*?)\]\(.*?\)/g, '$1');
    return cleaned.trim().slice(0, 160);
};

// Fetch product data
const getProductData = async (slug: string) => {
    const data = await fetchFromStrapi(
        `products?filters[slug][$eq]=${slug}&populate=*`
    );
    return data.data?.[0] || null;
};

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const product = await getProductData(resolvedParams.slug);

    if (!product) {
        return {
            title: 'Product Not Found - Everwell Magazine',
            description: 'Discover health and wellness products on Everwell Magazine.',
            robots: { index: true, follow: true },
            alternates: {
                canonical: `https://www.everwellmag.com/product/${resolvedParams.slug}`,
            },
            openGraph: {
                title: 'Product Not Found - Everwell Magazine',
                description: 'Discover health and wellness products on Everwell Magazine.',
                images: [
                    {
                        url: 'https://cms.everwellmag.com/Uploads/default-image.jpg',
                        width: 1200,
                        height: 630,
                        alt: 'Everwell Magazine',
                    },
                ],
                url: `https://www.everwellmag.com/product/${resolvedParams.slug}`,
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: 'Product Not Found - Everwell Magazine',
                description: 'Discover health and wellness products on Everwell Magazine.',
                images: ['https://cms.everwellmag.com/Uploads/default-image.jpg'],
            },
        };
    }

    const imageUrl = normalizeImageUrl(product.Image);
    const description = cleanDescription(product.Description) || `Buy ${product.Name} from ${product.Supplier} on Everwell Magazine.`;

    return {
        title: `${product.Name} - Everwell Magazine`,
        description,
        robots: { index: true, follow: true },
        alternates: {
            canonical: `https://www.everwellmag.com/product/${resolvedParams.slug}`,
        },
        openGraph: {
            title: `${product.Name} - Everwell Magazine`,
            description,
            images: imageUrl
                ? [
                    {
                        url: imageUrl,
                        width: product.Image?.width || 1200,
                        height: product.Image?.height || 630,
                        alt: product.Image?.alternativeText || product.Name,
                    },
                ]
                : [
                    {
                        url: 'https://cms.everwellmag.com/Uploads/default-image.jpg',
                        width: 1200,
                        height: 630,
                        alt: product.Name,
                    },
                ],
            url: `https://www.everwellmag.com/product/${resolvedParams.slug}`,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.Name} - Everwell Magazine`,
            description,
            images: imageUrl ? [imageUrl] : ['https://cms.everwellmag.com/Uploads/default-image.jpg'],
        },
    };
}

export default async function ProductLayout({
    children,
    params,
}: PropsWithChildren<{ params: Promise<{ slug: string }> }>) {
    const resolvedParams = await params;
    const product = await getProductData(resolvedParams.slug);

    if (!product) {
        notFound();
    }

    const imageUrl = normalizeImageUrl(product.Image);

    // Schema for Product
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.Name,
        description: cleanDescription(product.Description),
        image: imageUrl || undefined,
        brand: {
            '@type': 'Brand',
            name: product.Supplier || 'Unknown',
        },
        offers: product.Pricemulti?.length > 0
            ? product.Pricemulti.map((priceOption: PriceMulti) => ({
                '@type': 'Offer',
                priceCurrency: priceOption.currency === '$' ? 'USD' : priceOption.currency,
                price: priceOption.price,
                itemOffered: {
                    '@type': 'Product',
                    name: `${product.Name} (${priceOption.quantity} ${priceOption.quantity > 1 ? 'units' : 'unit'})`,
                },
                url: product.AffiliateLink,
                availability: 'https://schema.org/InStock',
            }))
            : undefined,
        url: `https://www.everwellmag.com/product/${resolvedParams.slug}`,
        sku: product.id.toString(),
        category: product.category.name,
    };

    // Schema for BreadcrumbList
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.everwellmag.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: product.category.name,
                item: `https://www.everwellmag.com${product.category.parent_slug ? `/${product.category.parent_slug}` : ''}/${product.category.slug}`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: product.Name,
                item: `https://www.everwellmag.com/product/${resolvedParams.slug}`,
            },
        ],
    };

    return (
        <>
            {/* Add schema markup using next/script */}
            <Script
                id="product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            {/* Add breadcrumb schema */}
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {/* Render children (page.tsx content) */}
            {children}
        </>
    );
}