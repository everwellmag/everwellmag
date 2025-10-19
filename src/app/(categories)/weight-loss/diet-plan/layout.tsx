import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'diet-plan',
        parentSlug: 'weight-loss',
        categoryType: 'article',
        defaultMetadata: {
            title: 'Diet Plans - Everwell Magazine',
            description: 'Discover tailored diet plans to support your weight loss journey with balanced nutrition and sustainable eating habits.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/weight_loss_diet_plan_tip_c17ccc9a5d.webp',
            width: 1200,
            height: 630,
            alt: 'Diet Plans',
        },
    });
}

export default async function DietPlanLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="diet-plan"
            parentSlug="weight-loss"
            categoryType="article"
            defaultMetadata={{
                title: 'Diet Plans - Everwell Magazine',
                description: 'Discover tailored diet plans to support your weight loss journey with balanced nutrition and sustainable eating habits.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}