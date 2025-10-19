import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'mens-care-tips',
        parentSlug: 'mens-health',
        categoryType: 'article',
        defaultMetadata: {
            title: 'Men’s Care Tips - Everwell Magazine',
            description: 'Discover practical men’s care tips to support overall health, wellness, and vitality through lifestyle and preventive measures.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Men_s_Care_Tips_8c6b2e9df2.webp',
            width: 1200,
            height: 630,
            alt: 'Men’s Care Tips',
        },
    });
}

export default async function MensCareTipsLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="mens-care-tips"
            parentSlug="mens-health"
            categoryType="article"
            defaultMetadata={{
                title: 'Men’s Care Tips - Everwell Magazine',
                description: 'Discover practical men’s care tips to support overall health, wellness, and vitality through lifestyle and preventive measures.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}