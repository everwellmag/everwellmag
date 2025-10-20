import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'heart-health',
        parentSlug: undefined, // Danh mục cha không có parent
        categoryType: 'article',
        defaultMetadata: {
            title: 'Heart Health - Everwell Magazine',
            description: 'Your comprehensive guide to maintaining heart health with expert tips, care strategies, and supplements at Everwell Magazine.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Common_Heart_Conditions_2c0c553a9c.webp', // Ảnh mặc định, thay bằng ảnh phù hợp nếu có
            width: 1200,
            height: 630,
            alt: 'Heart Health Guide',
        },
    });
}

export default async function HeartHealthLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="heart-health"
            parentSlug={undefined} // Thay null bằng undefined
            categoryType="article"
            defaultMetadata={{
                title: 'Heart Health - Everwell Magazine',
                description: 'Your comprehensive guide to maintaining heart health with expert tips, care strategies, and supplements at Everwell Magazine.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}