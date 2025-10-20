import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'eye-health',
        parentSlug: undefined, // Danh mục cha không có parent
        categoryType: 'article',
        defaultMetadata: {
            title: 'Eye Health - Everwell Magazine',
            description: 'Your comprehensive guide to maintaining eye health with expert tips, care strategies, and supplements at Everwell Magazine.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Common_Eye_Conditions_435281392e.webp', // Ảnh mặc định, thay bằng ảnh phù hợp nếu có
            width: 1200,
            height: 630,
            alt: 'Eye Health Guide',
        },
    });
}

export default async function EyeHealthLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="eye-health"
            parentSlug={undefined} // Thay null bằng undefined
            categoryType="article"
            defaultMetadata={{
                title: 'Eye Health - Everwell Magazine',
                description: 'Your comprehensive guide to maintaining eye health with expert tips, care strategies, and supplements at Everwell Magazine.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}