// src/components/layout/category-layout.tsx
import { ReactNode } from 'react';
import { Metadata } from 'next';
import CategorySchema from './seo/category-schema';
import BreadcrumbSchema from './seo/breadcrumb-schema';
import { getCategoryBySlug } from '@/lib/api/strapi/get-category';
import { generateCategoryMetadata } from '@/lib/seo/generate-category-metadata'; // Sửa đường dẫn
import { notFound } from 'next/navigation';

interface CategoryLayoutProps {
    children: ReactNode;
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryLayoutProps): Promise<Metadata> {
    const { category } = await params;
    const categoryData = await getCategoryBySlug(category);

    if (!categoryData) {
        return generateCategoryMetadata({
            name: 'Not Found',
            slug: category,
            description: '',
            type: 'mixed',
        });
    }

    return generateCategoryMetadata({
        name: categoryData.name,
        slug: category,
        description: categoryData.description,
        type: categoryData.type || 'mixed',
        image: categoryData.image?.url,
    });
}

export default async function CategoryLayout({ children, params }: CategoryLayoutProps) {
    const { category } = await params;
    const categoryData = await getCategoryBySlug(category);

    if (!categoryData) {
        notFound();
    }

    return (
        <>
            <CategorySchema category={categoryData} />
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: '/' },
                    { name: categoryData.name, url: `/${category}` },
                ]}
            />
            {children}
        </>
    );
}