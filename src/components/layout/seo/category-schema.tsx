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
        url: `https://everwellmag.com/${category.slug}`,
        publisher: {
            '@type': 'Organization',
            name: 'Everwell Magazine',
            logo: {
                '@type': 'ImageObject',
                url: 'https://everwellmag.com/images/logo.svg',
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