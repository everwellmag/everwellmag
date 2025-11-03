// src/components/layout/seo/category-schema.tsx
import type { Category } from '@/lib/types/category';
import { SITE_DOMAIN } from '@/lib/config';

interface CategorySchemaProps {
    category: Category;
}

export default function CategorySchema({ category }: CategorySchemaProps) {
    // 👇 Dùng Record<string, unknown> thay cho any
    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: category.name,
        description: category.description || `Explore ${category.name} content on Everwell Magazine.`,
        url: `${SITE_DOMAIN}/${category.parent ? `${category.parent.slug}/${category.slug}` : category.slug}`,
        publisher: {
            '@type': 'Organization',
            name: 'Everwell Magazine',
            logo: {
                '@type': 'ImageObject',
                url: 'https://cms.everwellmagazine.com/uploads/logo_everwell_magazine_156480b913.svg',
            },
        },
    };

    if (category.parent) {
        (schema as Record<string, unknown>).isPartOf = {
            '@type': 'CollectionPage',
            name: category.parent.name,
            url: `${SITE_DOMAIN}/${category.parent.slug}`,
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
