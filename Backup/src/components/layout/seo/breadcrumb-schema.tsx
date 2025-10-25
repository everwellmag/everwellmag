import Script from 'next/script';

interface BreadcrumbSchemaProps {
    categoryName: string;
    baseUrl: string;
    parentSlug?: string;
}

export function BreadcrumbSchema({ categoryName, baseUrl, parentSlug }: BreadcrumbSchemaProps) {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.everwellmag.com',
            },
            parentSlug && {
                '@type': 'ListItem',
                position: 2,
                name: parentSlug.replace('-', ' '),
                item: `https://www.everwellmag.com/${parentSlug}`,
            },
            {
                '@type': 'ListItem',
                position: parentSlug ? 3 : 2,
                name: categoryName,
                item: baseUrl,
            },
        ].filter(Boolean),
    };

    return (
        <Script
            id="breadcrumb-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
    );
}