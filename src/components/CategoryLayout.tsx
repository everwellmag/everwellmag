// C:\Users\Kathay\everwellmag\src\components\CategoryLayout.tsx
import { fetchFromStrapi } from '@/lib/strapi';
import { Metadata } from 'next';
import Script from 'next/script';

interface CategoryLayoutProps {
    slug: string;
    parentSlug?: string;
    categoryType?: 'product' | 'article';
    defaultMetadata?: Partial<Metadata>;
    children: React.ReactNode;
}

// Fetch category data from Strapi
const getCategoryData = async (slug: string) => {
    try {
        const data = await fetchFromStrapi(
            `categories?filters[slug][$eq]=${slug}&populate=*`
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
    return cleaned.trim().slice(0, 160) || ''; // Ensure no null, always return string
};

// Function to normalize image URL
const normalizeImageUrl = (url?: string | Blob): string | null => {
    if (!url) return null;
    if (url instanceof Blob) return URL.createObjectURL(url);
    return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
};

// Generate dynamic metadata for SEO
export const generateCategoryMetadata = async ({
    slug,
    parentSlug = '',
    categoryType = 'product',
    defaultMetadata = {},
    defaultImage = { url: 'https://cms.everwellmag.com/uploads/default-image.jpg', width: 1200, height: 630, alt: 'Everwell Magazine' },
}: {
    slug: string;
    parentSlug?: string;
    categoryType?: 'product' | 'article';
    defaultMetadata?: Partial<Metadata>;
    defaultImage?: { url: string; width?: number; height?: number; alt?: string };
}): Promise<Metadata> => {
    const category = await getCategoryData(slug);
    const baseUrl = `https://www.everwellmag.com${parentSlug ? `/${parentSlug}` : ''}/${slug}`;

    const fallbackMetadata: Metadata = {
        title: defaultMetadata.title || `${slug.replace('-', ' ')} - Everwell Magazine`,
        description: defaultMetadata.description || `Explore ${categoryType === 'product' ? 'top products' : 'informative articles'} in ${slug.replace('-', ' ')} on Everwell Magazine.`,
        robots: { index: true, follow: true },
        alternates: {
            canonical: baseUrl,
        },
        openGraph: {
            title: defaultMetadata.title || `${slug.replace('-', ' ')} - Everwell Magazine`,
            description: defaultMetadata.description || `Explore ${categoryType === 'product' ? 'top products' : 'informative articles'} in ${slug.replace('-', ' ')} on Everwell Magazine.`,
            images: [
                {
                    url: defaultImage.url,
                    width: defaultImage.width || 1200,
                    height: defaultImage.height || 630,
                    alt: defaultImage.alt || slug.replace('-', ' '),
                },
            ],
            url: baseUrl,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: defaultMetadata.title || `${slug.replace('-', ' ')} - Everwell Magazine`,
            description: defaultMetadata.description || `Explore ${categoryType === 'product' ? 'top products' : 'informative articles'} in ${slug.replace('-', ' ')} on Everwell Magazine.`,
            images: [defaultImage.url],
        },
        ...defaultMetadata,
    };

    if (!category || !category.attributes) {
        console.log('Category not found, using fallback metadata');
        return fallbackMetadata;
    }

    const description = cleanDescription(category.attributes.description || category.attributes.name || '') || (defaultMetadata.description as string) || `Explore ${categoryType === 'product' ? 'products' : 'articles'} in ${slug.replace('-', ' ')} on Everwell Magazine.`;
    const imageUrl = normalizeImageUrl(category.attributes.image?.data?.attributes?.url);

    return {
        title: category.attributes.name || fallbackMetadata.title,
        description,
        robots: { index: true, follow: true },
        alternates: {
            canonical: baseUrl,
        },
        openGraph: {
            title: category.attributes.name || fallbackMetadata.title,
            description,
            images: imageUrl
                ? [
                    {
                        url: imageUrl,
                        width: category.attributes.image?.data?.attributes?.width || defaultImage.width || 1200,
                        height: category.attributes.image?.data?.attributes?.height || defaultImage.height || 630,
                        alt: category.attributes.image?.data?.attributes?.alternativeText || category.attributes.name || defaultImage.alt,
                    },
                ]
                : [
                    {
                        url: defaultImage.url,
                        width: defaultImage.width || 1200,
                        height: defaultImage.height || 630,
                        alt: defaultImage.alt || category.attributes.name,
                    },
                ],
            url: baseUrl,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: category.attributes.name || fallbackMetadata.title,
            description,
            images: imageUrl ? [imageUrl] : [defaultImage.url],
        },
        ...defaultMetadata,
    };
};

export default async function CategoryLayout({
    slug,
    parentSlug = '',
    categoryType = 'product',
    defaultMetadata = {},
    children,
}: CategoryLayoutProps) {
    const category = await getCategoryData(slug);
    const baseUrl = `https://www.everwellmag.com${parentSlug ? `/${parentSlug}` : ''}/${slug}`;

    // Schema for CollectionPage
    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: category?.attributes?.name || defaultMetadata.title || slug.replace('-', ' '),
        description: cleanDescription(category?.attributes?.description || category?.attributes?.name || '') || defaultMetadata.description || `Explore ${categoryType === 'product' ? 'products' : 'articles'} in ${slug.replace('-', ' ')} on Everwell Magazine.`,
        url: baseUrl,
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
            parentSlug && {
                '@type': 'ListItem',
                position: 2,
                name: parentSlug.replace('-', ' '),
                item: `https://www.everwellmag.com/${parentSlug}`,
            },
            {
                '@type': 'ListItem',
                position: parentSlug ? 3 : 2,
                name: category?.attributes?.name || defaultMetadata.title || slug.replace('-', ' '),
                item: baseUrl,
            },
        ].filter(Boolean),
    };

    return (
        <>
            {/* Add canonical tag manually */}
            <link rel="canonical" href={baseUrl} />
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