// C:\Users\Kathay\everwellmag\src\app\blood-sugar\supplements-for-blood-sugar\layout.tsx
import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'supplements-for-blood-sugar',
        parentSlug: 'blood-sugar',
        categoryType: 'product',
        defaultMetadata: {
            title: 'Supplements for Blood Sugar - Everwell Magazine',
            description: 'Discover premium supplements to support healthy blood sugar levels from trusted providers. Click to shop now!',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/blood_sugar_supplements_c896f98085.webp',
            width: 1200,
            height: 630,
            alt: 'Blood Sugar Supplements',
        },
    });
}

export default async function SupplementsForBloodSugarLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="supplements-for-blood-sugar"
            parentSlug="blood-sugar"
            categoryType="product"
            defaultMetadata={{
                title: 'Supplements for Blood Sugar - Everwell Magazine',
                description: 'Discover premium supplements to support healthy blood sugar levels from trusted providers. Click to shop now!',
            }}
        >
            {children}
        </CategoryLayout>
    );
}