// src/app/[category]/[subcategory]/layout.tsx
import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/api/strapi/get-category';
import CategorySchema from '@/components/layout/seo/category-schema';
import BreadcrumbSchema from '@/components/layout/seo/breadcrumb-schema';
import { generateCategoryMetadata } from '@/lib/seo/generate-category-metadata';

interface SubcategoryLayoutProps {
    children: React.ReactNode;
    params: Promise<{ category: string; subcategory: string }>;
}

export async function generateMetadata({ params }: SubcategoryLayoutProps) {
    const { category, subcategory } = await params;
    const subcategoryData = await getCategoryBySlug(subcategory);

    if (!subcategoryData) {
        return generateCategoryMetadata({
            name: 'Not Found',
            slug: `${category}/${subcategory}`,
            description: '',
            type: 'mixed',
        });
    }

    return generateCategoryMetadata({
        name: subcategoryData.name,
        slug: subcategory,
        parentSlug: category, // ✅ thêm parentSlug
        description: subcategoryData.description,
        type: subcategoryData.type || 'mixed',
        image: subcategoryData.image?.url,
    });
}

export default async function SubcategoryLayout({ children, params }: SubcategoryLayoutProps) {
    const { category, subcategory } = await params;
    const subcategoryData = await getCategoryBySlug(subcategory);

    if (!subcategoryData) {
        notFound();
    }

    return (
        <>
            <CategorySchema category={subcategoryData} />
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: '/' },
                    { name: subcategoryData.parent?.name || category, url: `/${subcategoryData.parent?.slug || category}` },
                    { name: subcategoryData.name, url: `/${category}/${subcategory}` },
                ]}
            />
            {children}
        </>
    );
}
