// C:\Users\Kathay\everwellmag\src\app\eye-health\supplements-for-eye-health\layout.tsx
import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'supplements-for-eye-health',
        parentSlug: 'eye-health',
        categoryType: 'product',
        defaultMetadata: {
            title: 'Supplements for Eye Health - Everwell Magazine',
            description: 'Discover premium supplements to support optimal eye health from trusted providers. Click to shop now!',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/eye_supplements_1e917954bb.webp',
            width: 1200,
            height: 630,
            alt: 'Eye Health Supplements',
        },
    });
}

export default async function SupplementsForEyeHealthLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="supplements-for-eye-health"
            parentSlug="eye-health"
            categoryType="product"
            defaultMetadata={{
                title: 'Supplements for Eye Health - Everwell Magazine',
                description: 'Discover premium supplements to support optimal eye health from trusted providers. Click to shop now!',
            }}
        >
            {children}
        </CategoryLayout>
    );
}