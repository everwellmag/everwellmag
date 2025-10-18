// C:\Users\Kathay\everwellmag\src\app\mens-health\supplements-for-mens-health\layout.tsx
import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'supplements-for-mens-health',
        parentSlug: 'mens-health',
        categoryType: 'product',
        defaultMetadata: {
            title: "Supplements for Men's Health - Everwell Magazine",
            description: "Discover premium supplements to support men's health and vitality from trusted providers. Click to shop now!",
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Supplements_For_Mens_Health_56c3718864.webp',
            width: 1200,
            height: 630,
            alt: "Men's Health Supplements",
        },
    });
}

export default async function SupplementsForMensHealthLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="supplements-for-mens-health"
            parentSlug="mens-health"
            categoryType="product"
            defaultMetadata={{
                title: "Supplements for Men's Health - Everwell Magazine",
                description: "Discover premium supplements to support men's health and vitality from trusted providers. Click to shop now!",
            }}
        >
            {children}
        </CategoryLayout>
    );
}