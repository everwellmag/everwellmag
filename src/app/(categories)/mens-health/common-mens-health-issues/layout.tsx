import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'common-mens-health-issues',
        parentSlug: 'mens-health',
        categoryType: 'article',
        defaultMetadata: {
            title: 'Common Men’s Health Issues - Everwell Magazine',
            description: 'Learn about common men’s health issues, their symptoms, causes, and effective strategies for prevention and management.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Common_Men_s_Health_Issues_a39fbb1616.webp',
            width: 1200,
            height: 630,
            alt: 'Common Men’s Health Issues',
        },
    });
}

export default async function CommonMensHealthIssuesLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="common-mens-health-issues"
            parentSlug="mens-health"
            categoryType="article"
            defaultMetadata={{
                title: 'Common Men’s Health Issues - Everwell Magazine',
                description: 'Learn about common men’s health issues, their symptoms, causes, and effective strategies for prevention and management.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}