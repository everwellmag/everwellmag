import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'workout-plan',
        parentSlug: 'weight-loss',
        categoryType: 'article',
        defaultMetadata: {
            title: 'Workout Plans weight loss - Everwell Magazine',
            description: 'Explore effective workout plans designed to help you achieve your weight loss goals with expert guidance and structured routines.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Workout_Plans_weight_loss_17e0d01b33.webp',
            width: 1200,
            height: 630,
            alt: 'Workout Plans',
        },
    });
}

export default async function WorkoutPlanLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="workout-plan"
            parentSlug="weight-loss"
            categoryType="article"
            defaultMetadata={{
                title: 'Workout Plans - Everwell Magazine',
                description: 'Explore effective workout plans designed to help you achieve your weight loss goals with expert guidance and structured routines.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}