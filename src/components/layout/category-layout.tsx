import { ReactNode } from 'react';
import { Metadata } from 'next'; // Keep this for types
import { CategorySchema } from './seo/category-schema';
import { BreadcrumbSchema } from './seo/breadcrumb-schema';

interface CategoryLayoutProps {
    slug: string;
    parentSlug?: string;
    categoryType?: 'product' | 'article';
    defaultMetadata?: Partial<Metadata>; // Not used here, but for props
    children: ReactNode;
}

export default function CategoryLayout({
    slug,
    parentSlug = '',
    categoryType = 'product',
    children,
}: CategoryLayoutProps) {
    const baseUrl = `https://www.everwellmag.com${parentSlug ? `/${parentSlug}` : ''}/${slug}`;
    const categoryName = slug.replace('-', ' ').toUpperCase(); // Fallback name
    const description = `Explore ${categoryType === 'product' ? 'products' : 'articles'} in ${slug.replace('-', ' ')} on Everwell Magazine.`;

    return (
        <>
            {/* Removed manual <link rel="canonical"> - Handled by generateMetadata alternates.canonical */}
            <CategorySchema categoryName={categoryName} description={description} baseUrl={baseUrl} />
            <BreadcrumbSchema categoryName={categoryName} baseUrl={baseUrl} parentSlug={parentSlug} />
            {children}
        </>
    );
}