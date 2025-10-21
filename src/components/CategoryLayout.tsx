import { Metadata } from 'next';
import Script from 'next/script';

interface CategoryLayoutProps {
    slug: string;
    parentSlug?: string;
    categoryType?: 'product' | 'article';
    defaultMetadata?: Partial<Metadata>;
    children: React.ReactNode;
}

// Interface cho generateCategoryMetadata
interface GenerateMetadataProps {
    slug: string;
    parentSlug?: string;
    categoryType?: 'product' | 'article';
    defaultMetadata?: Partial<Metadata>;
    defaultImage?: {
        url: string;
        width?: number;
        height?: number;
        alt?: string;
    };
}

// Generate static metadata for SEO
export const generateCategoryMetadata = async ({
    slug,
    parentSlug = '',
    categoryType = 'product',
    defaultMetadata = {},
    defaultImage = { url: 'https://cms.everwellmag.com/uploads/default-image.jpg', width: 1200, height: 630, alt: 'Everwell Magazine' },
}: GenerateMetadataProps): Promise<Metadata> => {
    const baseUrl = `https://www.everwellmag.com${parentSlug ? `/${parentSlug}` : ''}/${slug}`;
    const fallbackTitle = defaultMetadata.title || `${slug.replace('-', ' ')} - Everwell Magazine`;
    const fallbackDescription = defaultMetadata.description || `Explore ${categoryType === 'product' ? 'top products' : 'informative articles'} in ${slug.replace('-', ' ')} on Everwell Magazine.`;

    return {
        title: fallbackTitle,
        description: fallbackDescription,
        robots: { index: true, follow: true },
        alternates: {
            canonical: baseUrl,
        },
        openGraph: {
            title: fallbackTitle,
            description: fallbackDescription,
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
            title: fallbackTitle,
            description: fallbackDescription,
            images: [defaultImage.url],
        },
        ...defaultMetadata,
    };
};

export default function CategoryLayout({
    slug,
    parentSlug = '',
    categoryType = 'product',
    defaultMetadata = {},
    children,
}: CategoryLayoutProps) {
    const baseUrl = `https://www.everwellmag.com${parentSlug ? `/${parentSlug}` : ''}/${slug}`;
    const categoryName = defaultMetadata.title || slug.replace('-', ' ');

    // Schema for CollectionPage
    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: categoryName,
        description: `Explore ${categoryType === 'product' ? 'products' : 'articles'} in ${slug.replace('-', ' ')} on Everwell Magazine.`,
        url: baseUrl,
        publisher: {
            '@type': 'Organization',
            name: 'Everwell Magazine',
            logo: {
                '@type': 'ImageObject',
                url: 'https://cms.everwellmag.com/Uploads/logo.jpg',
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
                name: categoryName,
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