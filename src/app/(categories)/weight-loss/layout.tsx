import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'weight-loss',
        parentSlug: undefined, // Thay null bằng undefined vì danh mục cha không có parent
        categoryType: 'article',
        defaultMetadata: {
            title: 'Weight Loss - Everwell Magazine',
            description: 'Your ultimate guide to weight loss with expert tips on nutrition, exercise, and supplements at Everwell Magazine.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/weight_loss_diet_plan_tip_c17ccc9a5d.webp',
            width: 1200,
            height: 630,
            alt: 'Weight Loss Guide',
        },
    });
}

export default async function WeightLossLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="weight-loss"
            parentSlug={undefined} // Thay null bằng undefined
            categoryType="article"
            defaultMetadata={{
                title: 'Weight Loss - Everwell Magazine',
                description: 'Your ultimate guide to weight loss with expert tips on nutrition, exercise, and supplements at Everwell Magazine.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}