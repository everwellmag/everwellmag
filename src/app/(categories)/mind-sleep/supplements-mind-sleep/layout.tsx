// C:\Users\Kathay\everwellmag\src\app\(categories)\mind-sleep\supplements-mind-sleep\layout.tsx
import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'supplements-mind-sleep',
        parentSlug: 'mind-sleep',
        categoryType: 'product',
        defaultMetadata: {
            title: 'Mind & Sleep Supplements - Enhance Focus, Relaxation, and Restful Sleep',
            description: 'Discover the power of our Mind & Sleep supplements, carefully formulated to support mental clarity, focus, and deep, restorative sleep',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/weight_loss_supplements_c5f8cbdcec.webp',
            width: 1200,
            height: 630,
            alt: 'Mind & Sleep Supplements',
        },
    });
}

export default async function SupplementsMindSleepLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="supplements-mind-sleep"
            parentSlug="mind-sleep"
            categoryType="product"
            defaultMetadata={{
                title: 'Mind & Sleep Supplements - Enhance Focus, Relaxation, and Restful Sleep',
                description: 'Discover the power of our Mind & Sleep supplements, carefully formulated to support mental clarity, focus, and deep, restorative sleep',
            }}
        >
            {children}
        </CategoryLayout>
    );
}