import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'common-eye-conditions',
        parentSlug: 'eye-health',
        categoryType: 'article',
        defaultMetadata: {
            title: 'Common Eye Conditions - Everwell Magazine',
            description: 'Learn about common eye conditions, their symptoms, causes, and effective strategies for maintaining healthy vision.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Common_Eye_Conditions_435281392e.webp',
            width: 1200,
            height: 630,
            alt: 'Common Eye Conditions',
        },
    });
}

export default async function CommonEyeConditionsLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="common-eye-conditions"
            parentSlug="eye-health"
            categoryType="article"
            defaultMetadata={{
                title: 'Common Eye Conditions - Everwell Magazine',
                description: 'Learn about common eye conditions, their symptoms, causes, and effective strategies for maintaining healthy vision.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}