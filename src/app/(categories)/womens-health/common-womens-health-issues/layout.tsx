import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'common-womens-health-issues',
        parentSlug: 'womens-health',
        categoryType: 'article',
        defaultMetadata: {
            title: 'Common Women’s Health Issues - Everwell Magazine',
            description: 'Discover common women’s health issues, their symptoms, causes, and effective strategies for prevention and management.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Common_Women_s_Health_Issues_790bf93ba9.webp', // Placeholder URL, to be replaced
            width: 1200,
            height: 630,
            alt: 'Common Women’s Health Issues',
        },
    });
}

export default async function CommonWomensHealthIssuesLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="common-womens-health-issues"
            parentSlug="womens-health"
            categoryType="article"
            defaultMetadata={{
                title: 'Common Women’s Health Issues - Everwell Magazine',
                description: 'Discover common women’s health issues, their symptoms, causes, and effective strategies for prevention and management.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}