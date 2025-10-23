import { Metadata } from 'next';
import { getCategoryBySlug } from '../api/strapi/get-category'; // Import từ lib/api/strapi
import { Category } from '../types/category'; // Import types

interface GenerateCategoryMetadataProps {
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

export async function generateCategoryMetadata({
    slug,
    parentSlug = '',
    categoryType = 'product',
    defaultMetadata = {},
    defaultImage = { url: 'https://cms.everwellmag.com/uploads/default-image.jpg', width: 1200, height: 630, alt: 'Everwell Magazine' },
}: GenerateCategoryMetadataProps): Promise<Metadata> {
    const category: Category | null = await getCategoryBySlug(slug);
    const baseUrl = `https://www.everwellmag.com${parentSlug ? `/${parentSlug}` : ''}/${slug}`;
    const fallbackTitle = defaultMetadata.title || `${slug.replace('-', ' ').toUpperCase()} - Everwell Magazine`;
    const fallbackDescription = defaultMetadata.description || `Explore ${categoryType === 'product' ? 'top products' : 'informative articles'} in ${slug.replace('-', ' ')} on Everwell Magazine.`;

    if (!category) {
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

    const description = category.description || fallbackDescription;
    let imageUrl: string | undefined;
    if (categoryType === 'product') {
        imageUrl = category.products?.[0]?.Image?.url; // Flat structure cho Strapi v5
    } else {
        imageUrl = category.articles?.[0]?.cover?.url; // Flat structure
    }
    const finalImageUrl = imageUrl || defaultImage.url; // Ensure string

    return {
        title: category.name || fallbackTitle,
        description,
        robots: { index: true, follow: true },
        alternates: { canonical: baseUrl },
        openGraph: {
            title: category.name || fallbackTitle,
            description,
            images: [
                { url: finalImageUrl, width: 1200, height: 630, alt: category.name || defaultImage.alt },
            ],
            url: baseUrl,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: category.name || fallbackTitle,
            description,
            images: [finalImageUrl],
        },
        ...defaultMetadata,
    };
}