// src/components/common/breadcrumb.tsx
import Link from 'next/link';

interface BreadcrumbProps {
    parentSlug?: string;
    parentName?: string;
    categorySlug?: string;
    categoryName?: string;
}

export default function Breadcrumb({
    parentSlug,
    parentName,
    categorySlug,
    categoryName,
}: BreadcrumbProps) {
    if (!categorySlug || !categoryName) {
        return <span style={{ color: 'var(--text-secondary)' }}>Uncategorized</span>;
    }

    // Nếu có category cha (type mixed)
    if (parentSlug && parentName) {
        return (
            <>
                <Link
                    href={`/${parentSlug}`}
                    className="font-medium transition-colors hover:text-[var(--link-hover)]"
                    style={{ color: 'var(--link-color)' }}
                >
                    {parentName}
                </Link>
                <span className="text-gray-400">/</span>
                <Link
                    href={`/${parentSlug}/${categorySlug}`}
                    className="font-medium transition-colors hover:text-[var(--link-hover)]"
                    style={{ color: 'var(--link-color)' }}
                >
                    {categoryName}
                </Link>
            </>
        );
    }

    // Nếu chỉ có category con (không có parent)
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
