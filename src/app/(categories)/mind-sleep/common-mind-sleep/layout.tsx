import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'common-mind-sleep',
        parentSlug: 'mind-sleep',
        categoryType: 'article',
        defaultMetadata: {
            title: 'Common Mind & Sleep Issues - Everwell Magazine',
            description: 'Explore common mind and sleep issues, their symptoms, causes, and effective strategies for improving mental health and sleep quality.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Common_Mind_Sleep_Issues_3dbee0cbdf.webp', // Placeholder URL, to be replaced
            width: 1200,
            height: 630,
            alt: 'Common Mind & Sleep Issues',
        },
    });
}

export default async function CommonMindSleepLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="common-mind-sleep"
            parentSlug="mind-sleep"
            categoryType="article"
            defaultMetadata={{
                title: 'Common Mind & Sleep Issues - Everwell Magazine',
                description: 'Explore common mind and sleep issues, their symptoms, causes, and effective strategies for improving mental health and sleep quality.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}