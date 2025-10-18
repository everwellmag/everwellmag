// C:\Users\Kathay\everwellmag\src\app\weight-loss\weight-loss-supplements\layout.tsx
import { PropsWithChildren } from 'react';
import { fetchFromStrapi } from '@/lib/strapi';
import { Metadata } from 'next';
import Script from 'next/script';

// Fetch category data from Strapi
const getCategoryData = async (categorySlug: string) => {
    try {
        const data = await fetchFromStrapi(
            `categories?filters[slug][$eq]=${categorySlug}&populate=*`
        );
        console.log('Category API response:', JSON.stringify(data, null, 2)); // Log để debug
        return data.data?.[0] || null;
    } catch (error) {
        console.error('Error fetching category for metadata:', error);
        return null;
    }
};

// Function to clean Markdown for description
const cleanDescription = (text: string): string => {
    let cleaned = text.replace(/!\[.*?\]\(.*?\)/g, '');
    cleaned = cleaned.replace(/\[([^\]]*?)\]\(.*?\)/g, '$1');
    return cleaned.trim().slice(0, 160);
};

// Function to normalize image URL
const normalizeImageUrl = (url?: string | Blob): string | null => {
    if (!url) return null;
    if (url instanceof Blob) return URL.createObjectURL(url);
    return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
};

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    console.log('Generating metadata for slug:', resolvedParams.slug); // Log để debug
    const category = await getCategoryData('weight-loss-supplements'); // Thay bằng resolvedParams.slug nếu dùng dynamic route

    const defaultMetadata = {
        title: 'Weight Loss Supplements - Everwell Magazine',
        description: 'Explore the best weight loss supplements backed by clinical studies and certifications on Everwell Magazine.',
        robots: { index: true, follow: true },
        alternates: {
            canonical: `https://www.everwellmag.com/weight-loss/weight-loss-supplements`,
        },
        openGraph: {
            title: 'Weight Loss Supplements - Everwell Magazine',
            description: 'Explore the best weight loss supplements backed by clinical studies and certifications on Everwell Magazine.',
            images: [
                {
                    url: 'https://cms.everwellmag.com/uploads/weight_loss_supplements_c5f8cbdcec.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Weight Loss Supplements',
                },
            ],
            url: `https://www.everwellmag.com/weight-loss/weight-loss-supplements`,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Weight Loss Supplements - Everwell Magazine',
            description: 'Explore the best weight loss supplements backed by clinical studies and certifications on Everwell Magazine.',
            images: ['https://cms.everwellmag.com/uploads/weight_loss_supplements_c5f8cbdcec.webp'],
        },
    };

    if (!category || !category.attributes) {
        console.log('Category not found, using default metadata');
        return defaultMetadata;
    }

    const description = cleanDescription(category.attributes.description || category.attributes.name || '') || `Explore ${category.attributes.name || 'category'} on Everwell Magazine.`;
    const imageUrl = normalizeImageUrl(category.attributes.image?.data?.attributes?.url);

    return {
        title: `${category.attributes.name || 'Weight Loss Supplements'} - Everwell Magazine`,
        description,
        robots: { index: true, follow: true },
        alternates: {
            canonical: `https://www.everwellmag.com/weight-loss/weight-loss-supplements`,
        },
        openGraph: {
            title: `${category.attributes.name || 'Weight Loss Supplements'} - Everwell Magazine`,
            description,
            images: imageUrl
                ? [
                    {
                        url: imageUrl,
                        width: category.attributes.image?.data?.attributes?.width || 1200,
                        height: category.attributes.image?.data?.attributes?.height || 630,
                        alt: category.attributes.image?.data?.attributes?.alternativeText || category.attributes.name || 'Category',
                    },
                ]
                : [
                    {
                        url: 'https://cms.everwellmag.com/uploads/weight_loss_supplements_c5f8cbdcec.webp',
                        width: 1200,
                        height: 630,
                        alt: category.attributes.name || 'Weight Loss Supplements',
                    },
                ],
            url: `https://www.everwellmag.com/weight-loss/weight-loss-supplements`,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${category.attributes.name || 'Weight Loss Supplements'} - Everwell Magazine`,
            description,
            images: imageUrl ? [imageUrl] : ['https://cms.everwellmag.com/uploads/weight_loss_supplements_c5f8cbdcec.webp'],
        },
    };
}

export default async function WeightLossSupplementsLayout({
    children,
    params,
}: PropsWithChildren<{ params: Promise<{ slug: string }> }>) {
    const resolvedParams = await params;
    const category = await getCategoryData('weight-loss-supplements'); // Thay bằng resolvedParams.slug nếu dùng dynamic route

    // Schema for CollectionPage
    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: category?.attributes?.name || 'Weight Loss Supplements',
        description: cleanDescription(category?.attributes?.description || category?.attributes?.name || '') || 'Explore weight loss supplements on Everwell Magazine.',
        url: `https://www.everwellmag.com/weight-loss/weight-loss-supplements`,
        publisher: {
            '@type': 'Organization',
            name: 'Everwell Magazine',
            logo: {
                '@type': 'ImageObject',
                url: 'https://cms.everwellmag.com/Uploads/logo.jpg', // Thay bằng URL logo thực tế
            },
        },
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
                name: 'Weight Loss',
                item: 'https://www.everwellmag.com/weight-loss',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: category?.attributes?.name || 'Weight Loss Supplements',
                item: `https://www.everwellmag.com/weight-loss/weight-loss-supplements`,
            },
        ],
    };

    return (
        <>
            {/* Add canonical tag manually if needed */}
            <link rel="canonical" href="https://www.everwellmag.com/weight-loss/weight-loss-supplements" />
            {/* Add schema markup using next/script */}
            <Script
                id="collection-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
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