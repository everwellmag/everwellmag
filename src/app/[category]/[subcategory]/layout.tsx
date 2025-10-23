import { ReactNode } from 'react';
import { Metadata } from 'next';
import CategoryLayout from '@/components/layout/category-layout';
import { getCategoryBySlug } from '@/lib/api/strapi/get-category';
import { generateCategoryMetadata } from '@/lib/seo/generate-category-metadata';
import { CategoryType } from '@/lib/types/category'; // Import CategoryType

interface SubCategoryLayoutProps {
    children: ReactNode;
    params: Promise<{ category: string; subcategory: string }>; // Await params
}

export async function generateMetadata({ params }: SubCategoryLayoutProps): Promise<Metadata> {
    const resolvedParams = await params;
    const subcategory = await getCategoryBySlug(resolvedParams.subcategory);

    // Map CategoryType to expected type for metadata (fallback 'product' cho mixed)
    const mappedType = subcategory?.type === 'mixed' ? 'product' : subcategory?.type;

    return generateCategoryMetadata({
        slug: resolvedParams.subcategory,
        parentSlug: resolvedParams.category,
        categoryType: mappedType, // ✅ Map 'mixed' sang 'product' hoặc tương tự
    });
}

export default async function SubCategoryLayout({ children, params }: SubCategoryLayoutProps) {
    const resolvedParams = await params;
    const subcategory = await getCategoryBySlug(resolvedParams.subcategory);

    // Map CategoryType to expected prop type (fallback 'product' cho mixed)
    const mappedType = subcategory?.type === 'mixed' ? 'product' : subcategory?.type;

    // Layout chung, check type để apply style/schema phù hợp
    return (
        <CategoryLayout
            slug={resolvedParams.subcategory}
            parentSlug={resolvedParams.category}
            categoryType={mappedType} // ✅ Map để tránh lỗi type
        >
            {children}
        </CategoryLayout>
    );
}