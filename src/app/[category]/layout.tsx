// src/app/[category]/layout.tsx
import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/api/strapi/get-category';
import CategorySchema from '@/components/layout/seo/category-schema'; // Sửa default import
import BreadcrumbSchema from '@/components/layout/seo/breadcrumb-schema';
import { generateCategoryMetadata } from '@/lib/seo/generate-category-metadata';

interface CategoryLayoutProps {
    children: React.ReactNode;
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryLayoutProps) {
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