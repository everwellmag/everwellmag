import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'blood-sugar',
        parentSlug: undefined, // Thay null bằng undefined vì danh mục cha không có parent
        categoryType: 'article',
        defaultMetadata: {
            title: 'Blood Sugar - Everwell Magazine',
            description: 'Your comprehensive resource for managing blood sugar with expert advice on health, diet, and supplements at Everwell Magazine.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/blood_sugar_default_e8f9c2d3a4.webp',
            width: 1200,
            height: 630,
            alt: 'Blood Sugar Management',
        },
    });
}

export default async function BloodSugarLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="blood-sugar"
            parentSlug={undefined} // Thay null bằng undefined
            categoryType="article"
            defaultMetadata={{
                title: 'Blood Sugar - Everwell Magazine',
                description: 'Your comprehensive resource for managing blood sugar with expert advice on health, diet, and supplements at Everwell Magazine.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}