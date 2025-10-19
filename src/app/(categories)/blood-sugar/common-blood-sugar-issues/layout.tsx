import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'common-blood-sugar-issues',
        parentSlug: 'blood-sugar',
        categoryType: 'article',
        defaultMetadata: {
            title: 'Common Blood Sugar Issues - Everwell Magazine',
            description: 'Learn about common blood sugar issues, their symptoms, causes, and effective strategies for maintaining healthy glucose levels.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/blood_sugar_issues_6f8b3f2f30.webp',
            width: 1200,
            height: 630,
            alt: 'Common Blood Sugar Issues',
        },
    });
}

export default async function CommonBloodSugarIssuesLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="common-blood-sugar-issues"
            parentSlug="blood-sugar"
            categoryType="article"
            defaultMetadata={{
                title: 'Common Blood Sugar Issues - Everwell Magazine',
                description: 'Learn about common blood sugar issues, their symptoms, causes, and effective strategies for maintaining healthy glucose levels.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}