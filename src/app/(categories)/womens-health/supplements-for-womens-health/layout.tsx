import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'supplements-for-womens-health',
        parentSlug: 'womens-health',
        categoryType: 'product',
        defaultMetadata: {
            title: "Supplements for Women's Health - Everwell Magazine",
            description: 'Discover supplements that support women’s health, with insights on essential nutrients, benefits, and expert recommendations for overall wellness.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Supplements_for_Women_7bce0b0612.webp',
            width: 1200,
            height: 630,
            alt: 'Supplements for Women\'s Health',
        },
    });
}

export default async function SupplementsForWomensHealthLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="supplements-for-womens-health"
            parentSlug="womens-health"
            categoryType="product"
            defaultMetadata={{
                title: "Supplements for Women's Health - Everwell Magazine",
                description: 'Discover supplements that support women’s health, with insights on essential nutrients, benefits, and expert recommendations for overall wellness.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}