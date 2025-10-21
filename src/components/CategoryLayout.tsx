import { Metadata } from 'next';
import Script from 'next/script';

interface CategoryLayoutProps {
    slug: string;
    parentSlug?: string;
    categoryType?: 'product' | 'article';
    defaultMetadata?: Partial<Metadata>;
    children: React.ReactNode;
}

// Interface cho category từ Strapi
interface Category {
    id: number;
    attributes: {
        name: string;
        slug: string;
        description: string | null;
        parent_slug?: string | null | undefined;
        products?: {
            data: Array<{
                id: number;
                attributes: {
                    Name?: string | undefined;
                    Description?: string | undefined;
                    Image?: { data: { attributes: { url: string; alternativeText?: string } } } | undefined;
                    documentId?: string | undefined;
                    createdAt?: string | undefined;
                    updatedAt?: string | undefined;
                    publishedAt?: string | undefined;
                    // Thêm các thuộc tính khác nếu cần, tránh any
                };
            }>;
        } | undefined;
        articles?: {
            data: Array<{
                id: number;
                attributes: {
                    title?: string | undefined;
                    description?: string | undefined;
                    slug?: string | undefined;
                    cover?: { data: { attributes: { url: string; alternativeText?: string } } } | null | undefined;
                    documentId?: string | undefined;
                    createdAt?: string | undefined;
                    updatedAt?: string | undefined;
                    publishedAt?: string | undefined;
                    // Thêm các thuộc tính khác nếu cần, tránh any
                };
            }>;
        } | undefined;
    };
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

// Hàm fetch dữ liệu từ Strapi
const fetchFromStrapi = async (endpoint: string) => {
    const strapiUrl = process.env.STRAPI_URL || 'https://cms.everwellmag.com';
    const url = endpoint.startsWith('http') ? endpoint : `${strapiUrl}/api/${endpoint}`;
    console.log('Fetching from:', url);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout 10 giây
    const response = await fetch(url, {
        next: { revalidate: 60 }, // Cache dữ liệu trong 60 giây
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Strapi Error:', errorText);
        throw new Error(`Failed to fetch from Strapi: ${response.statusText} - ${errorText}`);
    }
    const data = await response.json();
    console.log('Fetched data structure:', JSON.stringify(data, null, 2));
    return data;
};

const getAllCategoriesData = async (): Promise<Category[] | null> => {
    try {
        const data = await fetchFromStrapi('categories?populate[products][populate]=Image&populate[articles][populate]=cover&pagination[pageSize]=10');
        if (!data || !data.data || !Array.isArray(data.data)) {
            console.error('Invalid data structure from Strapi:', data);
            return null;
        }
        return data.data as Category[];
    } catch (error) {
        console.error('Error fetching all categories:', error);
        return null;
    }
};

const getCategoryData = async (slug: string): Promise<Category | null> => {
    const categories = await getAllCategoriesData();
    if (!categories) return null;
    const category = categories.find((cat: Category) => cat.attributes?.slug === slug);
    if (!category) console.warn(`Category with slug ${slug} not found`);
    return category || null;
};

// Generate static metadata for SEO
export const generateCategoryMetadata = async ({
    slug,
    parentSlug = '',
    categoryType = 'product',
    defaultMetadata = {},
    defaultImage = { url: 'https://cms.everwellmag.com/uploads/default-image.jpg', width: 1200, height: 630, alt: 'Everwell Magazine' },
}: GenerateMetadataProps): Promise<Metadata> => {
    const category = await getCategoryData(slug);
    const baseUrl = `https://www.everwellmag.com${parentSlug ? `/${parentSlug}` : ''}/${slug}`;
    const fallbackTitle = defaultMetadata.title || `${slug.replace('-', ' ')} - Everwell Magazine`;
    const fallbackDescription = defaultMetadata.description || `Explore ${categoryType === 'product' ? 'top products' : 'informative articles'} in ${slug.replace('-', ' ')} on Everwell Magazine.`;

    if (!category || !category.attributes) {
        return {
            title: fallbackTitle,
            description: fallbackDescription,
            robots: { index: true, follow: true },
            alternates: { canonical: baseUrl },
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
    }

    const description = category.attributes.description || fallbackDescription;
    const imageUrl = categoryType === 'product'
        ? category.attributes.products?.data[0]?.attributes?.Image?.data?.attributes?.url
        : category.attributes.articles?.data[0]?.attributes?.cover?.data?.attributes?.url;

    // Đảm bảo imageUrl luôn là string, dùng defaultImage nếu undefined
    const finalImageUrl = imageUrl || defaultImage.url;

    return {
        title: category.attributes.name || fallbackTitle,
        description,
        robots: { index: true, follow: true },
        alternates: { canonical: baseUrl },
        openGraph: {
            title: category.attributes.name || fallbackTitle,
            description,
            images: [
                { url: finalImageUrl, width: 1200, height: 630, alt: category.attributes.name || defaultImage.alt },
            ],
            url: baseUrl,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: category.attributes.name || fallbackTitle,
            description,
            images: [finalImageUrl],
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