import Script from 'next/script';

interface CategorySchemaProps {
    categoryName: string;
    description: string;
    baseUrl: string;
}

export function CategorySchema({ categoryName, description, baseUrl }: CategorySchemaProps) {
    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: categoryName,
        description,
        url: baseUrl,
        publisher: {
            '@type': 'Organization',
            name: 'Everwell Magazine',
            logo: {
                '@type': 'ImageObject',
                url: 'https://cms.everwellmag.com/Uploads/logo.jpg',
            },
        },
    };

    return (
        <Script
            id="collection-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />
    );
}