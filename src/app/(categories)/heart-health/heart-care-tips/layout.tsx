import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'heart-care-tips',
        parentSlug: 'heart-health',
        categoryType: 'article',
        defaultMetadata: {
            title: 'Heart Care Tips - Everwell Magazine',
            description: 'Discover practical heart care tips to maintain cardiovascular health, prevent heart disease, and support a healthy lifestyle.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Heart_Care_Tips_1de013ba8b.webp',
            width: 1200,
            height: 630,
            alt: 'Heart Care Tips',
        },
    });
}

export default async function HeartCareTipsLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="heart-care-tips"
            parentSlug="heart-health"
            categoryType="article"
            defaultMetadata={{
                title: 'Heart Care Tips - Everwell Magazine',
                description: 'Discover practical heart care tips to maintain cardiovascular health, prevent heart disease, and support a healthy lifestyle.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}