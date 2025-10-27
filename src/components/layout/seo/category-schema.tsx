// src/components/layout/seo/category-schema.tsx
import type { Category } from '@/lib/types/category';

interface CategorySchemaProps {
    category: Category;
}

export default function CategorySchema({ category }: CategorySchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: category.name,
        description: category.description || `Explore ${category.name} content on Everwell Magazine.`,
        url: `https://www.everwellmagazine.com/${category.slug}`,
        publisher: {
            '@type': 'Organization',
            name: 'Everwell Magazine',
            logo: {
                '@type': 'ImageObject',
                url: 'https://cms.everwellmagazine.com/uploads/logo_everwell_magazine_156480b913.svg',
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}