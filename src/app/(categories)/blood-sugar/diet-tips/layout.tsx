import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'diet-tips',
        parentSlug: 'blood-sugar',
        categoryType: 'article',
        defaultMetadata: {
            title: 'Diet Tips for Blood Sugar Control - Everwell Magazine',
            description: 'Discover diet tips to manage blood sugar levels effectively, including low-glycemic foods and balanced meal plans for better health.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/blood_sugar_diet_tips_59057e8ffa.webp',
            width: 1200,
            height: 630,
            alt: 'Diet Tips for Blood Sugar Control',
        },
    });
}

export default async function DietTipsLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="diet-tips"
            parentSlug="blood-sugar"
            categoryType="article"
            defaultMetadata={{
                title: 'Diet Tips for Blood Sugar Control - Everwell Magazine',
                description: 'Discover diet tips to manage blood sugar levels effectively, including low-glycemic foods and balanced meal plans for better health.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}