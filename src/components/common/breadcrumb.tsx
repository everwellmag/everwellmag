// src/components/common/breadcrumb.tsx
import Link from 'next/link';
import { getCategoryBySlug } from '@/lib/api/strapi/get-category';
// XÓA DÒNG NÀY: import type { Category } from '@/lib/types/category';

interface BreadcrumbProps {
    categorySlug?: string;
    categoryName?: string;
}

export default async function Breadcrumb({ categorySlug, categoryName }: BreadcrumbProps) {
    if (!categorySlug || !categoryName) {
        return <span style={{ color: 'var(--text-secondary)' }}>Uncategorized</span>;
    }

    const childCat = await getCategoryBySlug(categorySlug);
    const parentCat = childCat?.parent;

    if (parentCat) {
        return (
            <>
                <Link
                    href={`/${parentCat.slug}`}
                    className="font-medium transition-colors hover:text-[var(--link-hover)]"
                    style={{ color: 'var(--link-color)' }}
                >
                    {parentCat.name}
                </Link>
                <span className="text-gray-400">/</span>
                <Link
                    href={`/${parentCat.slug}/${categorySlug}`}
                    className="font-medium transition-colors hover:text-[var(--link-hover)]"
                    style={{ color: 'var(--link-color)' }}
                >
                    {categoryName}
                </Link>
            </>
        );
    }

    return (
        <Link
            href={`/${categorySlug}`}
            className="font-medium transition-colors hover:text-[var(--link-hover)]"
            style={{ color: 'var(--link-color)' }}
        >
            {categoryName}
        </Link>
    );
}