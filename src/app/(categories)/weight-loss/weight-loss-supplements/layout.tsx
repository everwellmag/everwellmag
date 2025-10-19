// C:\Users\Kathay\everwellmag\src\app\weight-loss\weight-loss-supplements\layout.tsx
import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'weight-loss-supplements',
        parentSlug: 'weight-loss',
        categoryType: 'product',
        defaultMetadata: {
            title: 'Top Weight Loss Supplements Certified for Safety & Effectiveness',
            description: 'Discover the best weight loss supplements backed by clinical studies and certifications. Explore safe, effective options to support your weight management goals naturally.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/weight_loss_supplements_c5f8cbdcec.webp',
            width: 1200,
            height: 630,
            alt: 'Weight Loss Supplements',
        },
    });
}

export default async function WeightLossSupplementsLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="weight-loss-supplements"
            parentSlug="weight-loss"
            categoryType="product"
            defaultMetadata={{
                title: 'Top Weight Loss Supplements Certified for Safety & Effectiveness',
                description: 'Discover the best weight loss supplements backed by clinical studies and certifications. Explore safe, effective options to support your weight management goals naturally.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}