import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'common-heart-conditions',
        parentSlug: 'heart-health',
        categoryType: 'article',
        defaultMetadata: {
            title: 'Common Heart Conditions - Everwell Magazine',
            description: 'Learn about common heart conditions, their symptoms, causes, and effective strategies for maintaining a healthy heart.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Common_Heart_Conditions_2c0c553a9c.webp',
            width: 1200,
            height: 630,
            alt: 'Common Heart Conditions',
        },
    });
}

export default async function CommonHeartConditionsLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="common-heart-conditions"
            parentSlug="heart-health"
            categoryType="article"
            defaultMetadata={{
                title: 'Common Heart Conditions - Everwell Magazine',
                description: 'Learn about common heart conditions, their symptoms, causes, and effective strategies for maintaining a healthy heart.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}