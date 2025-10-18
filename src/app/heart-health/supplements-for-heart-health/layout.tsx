// C:\Users\Kathay\everwellmag\src\app\heart-health\supplements-for-heart-health\layout.tsx
import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'supplements-for-heart-health',
        parentSlug: 'heart-health',
        categoryType: 'product',
        defaultMetadata: {
            title: 'Supplements for Heart Health - Everwell Magazine',
            description: 'Discover premium supplements to support optimal heart health from trusted providers. Click to shop now!',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Heart_Health_supplements_332b733a62.webp',
            width: 1200,
            height: 630,
            alt: 'Heart Health Supplements',
        },
    });
}

export default async function SupplementsForHeartHealthLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="supplements-for-heart-health"
            parentSlug="heart-health"
            categoryType="product"
            defaultMetadata={{
                title: 'Supplements for Heart Health - Everwell Magazine',
                description: 'Discover premium supplements to support optimal heart health from trusted providers. Click to shop now!',
            }}
        >
            {children}
        </CategoryLayout>
    );
}