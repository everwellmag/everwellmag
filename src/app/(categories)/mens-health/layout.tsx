import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'mens-health',
        parentSlug: undefined, // Danh mục cha không có parent
        categoryType: 'article',
        defaultMetadata: {
            title: 'Men’s Health - Everwell Magazine',
            description: 'Your comprehensive guide to men’s health with expert tips, care strategies, and supplements at Everwell Magazine.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Common_Men_s_Health_Issues_a39fbb1616.webp', // Ảnh mặc định, thay bằng ảnh phù hợp nếu có
            width: 1200,
            height: 630,
            alt: 'Men’s Health Guide',
        },
    });
}

export default async function MensHealthLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="mens-health"
            parentSlug={undefined} // Thay null bằng undefined
            categoryType="article"
            defaultMetadata={{
                title: 'Men’s Health - Everwell Magazine',
                description: 'Your comprehensive guide to men’s health with expert tips, care strategies, and supplements at Everwell Magazine.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}