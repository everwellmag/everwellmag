import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'womens-care-tips',
        parentSlug: 'womens-health',
        categoryType: 'article',
        defaultMetadata: {
            title: 'Women’s Care Tips - Everwell Magazine',
            description: 'Explore practical tips and advice for women’s health and wellness, including self-care, prevention, and lifestyle strategies.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Supplements_For_woman_Health_2016bed2f6.webp', // Placeholder URL, to be replaced
            width: 1200,
            height: 630,
            alt: 'Women’s Care Tips',
        },
    });
}

export default async function WomensCareTipsLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="womens-care-tips"
            parentSlug="womens-health"
            categoryType="article"
            defaultMetadata={{
                title: 'Women’s Care Tips - Everwell Magazine',
                description: 'Explore practical tips and advice for women’s health and wellness, including self-care, prevention, and lifestyle strategies.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}