// C:\Users\Kathay\everwellmag\src\app\article\[slug]\layout.tsx
import { PropsWithChildren } from 'react';
import { fetchFromStrapi } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';

// Memoize fetch to avoid duplicate calls
const getArticleData = async (slug: string) => {
    try {
        const data = await fetchFromStrapi(`articles?filters[slug][$eq]=${slug}&populate=*`);
        console.log('Article data for metadata:', JSON.stringify(data, null, 2));
        return data.data?.[0] || null;
    } catch (error) {
        console.error('Error fetching article for metadata:', error);
        return null;
    }
};

// Helper function to normalize image URL
const normalizeImageUrl = (url?: string | Blob): string | null => {
    if (!url) return null;
    if (url instanceof Blob) return URL.createObjectURL(url);
    return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
};

// Helper function to clean Markdown for description
const cleanDescription = (text: string): string => {
    let cleaned = text.replace(/!\[.*?\]\(.*?\)/g, '');
    cleaned = cleaned.replace(/\[([^\]]*?)\]\(.*?\)/g, '$1');
    return cleaned.trim().slice(0, 160);
};

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    console.log('Resolved params:', resolvedParams); // Log params
    const article = await getArticleData(resolvedParams.slug);
    const canonicalUrl = `https://www.everwellmag.com/article/${resolvedParams.slug}`;
    console.log('Generating metadata for slug:', resolvedParams.slug, 'Canonical:', canonicalUrl, 'Article:', article ? 'Found' : 'Not found');

    return {
        title: article ? `${article.title || 'Article'} - Everwell Magazine` : 'Article Not Found - Everwell Magazine',
        description: article
            ? cleanDescription(article.description || article.title || '') || `Read more about ${article.title} on Everwell Magazine.`
            : 'Discover expert insights and tips on Everwell Magazine.',
        robots: { index: true, follow: true },
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: article ? `${article.title || 'Article'} - Everwell Magazine` : 'Article Not Found - Everwell Magazine',
            description: article
                ? cleanDescription(article.description || article.title || '') || `Read more about ${article.title} on Everwell Magazine.`
                : 'Discover expert insights and tips on Everwell Magazine.',
            images: article?.cover?.url
                ? [
                    {
                        url: normalizeImageUrl(article.cover.url) || 'https://cms.everwellmag.com/Uploads/default-image.jpg',
                        width: Number(article.cover?.width) || 1200,
                        height: Number(article.cover?.height) || 630,
                        alt: article.cover?.alternativeText || article.title || 'Article',
                    },
                ]
                : [
                    {
                        url: 'https://cms.everwellmag.com/Uploads/default-image.jpg',
                        width: 1200,
                        height: 630,
                        alt: 'Everwell Magazine',
                    },
                ],
            url: canonicalUrl,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: article ? `${article.title || 'Article'} - Everwell Magazine` : 'Article Not Found - Everwell Magazine',
            description: article
                ? cleanDescription(article.description || article.title || '') || `Read more about ${article.title} on Everwell Magazine.`
                : 'Discover expert insights and tips on Everwell Magazine.',
            images: article?.cover?.url
                ? [normalizeImageUrl(article.cover.url) || 'https://cms.everwellmag.com/Uploads/default-image.jpg']
                : ['https://cms.everwellmag.com/Uploads/default-image.jpg'],
        },
    };
}

export default async function ArticleLayout({
    children,
    params,
}: PropsWithChildren<{ params: Promise<{ slug: string }> }>) {
    const resolvedParams = await params;
    const article = await getArticleData(resolvedParams.slug);

    if (!article) {
        console.log('Article not found, triggering notFound');
        notFound();
    }

    const coverImageUrl = article.cover?.url ? normalizeImageUrl(article.cover.url) : null;

    // Schema for Article
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title || 'Untitled Article',
        description: cleanDescription(article.description || article.title || ''),
        image: coverImageUrl || undefined,
        datePublished: article.publishedAt || undefined,
        author: {
            '@type': 'Organization',
            name: 'Everwell Magazine',
            url: 'https://www.everwellmag.com',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Everwell Magazine',
            logo: {
                '@type': 'ImageObject',
                url: 'https://cms.everwellmag.com/Uploads/logo.jpg', // Thay bằng URL logo thực tế
            },
        },
        url: `https://www.everwellmag.com/article/${resolvedParams.slug}`,
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
                name: article.category?.data?.attributes?.name || 'Articles',
                item: `https://www.everwellmag.com${article.category?.data?.attributes?.parent_slug ? `/${article.category.data.attributes.parent_slug}` : ''}/${article.category?.data?.attributes?.slug || 'articles'}`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: article.title || 'Article',
                item: `https://www.everwellmag.com/article/${resolvedParams.slug}`,
            },
        ],
    };

    return (
        <>
            {/* Add schema markup using next/script */}
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
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