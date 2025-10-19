import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'eye-care-tips',
        parentSlug: 'eye-health',
        categoryType: 'article',
        defaultMetadata: {
            title: 'Eye Care Tips - Everwell Magazine',
            description: 'Discover practical eye care tips to maintain healthy vision, prevent eye strain, and protect your eyes from common issues.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/eye_care_tips_default.jpg',
            width: 1200,
            height: 630,
            alt: 'Eye Care Tips',
        },
    });
}

export default async function EyeCareTipsLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="eye-care-tips"
            parentSlug="eye-health"
            categoryType="article"
            defaultMetadata={{
                title: 'Eye Care Tips - Everwell Magazine',
                description: 'Discover practical eye care tips to maintain healthy vision, prevent eye strain, and protect your eyes from common issues.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}