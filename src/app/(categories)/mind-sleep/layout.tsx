import { Metadata } from 'next';
import CategoryLayout, { generateCategoryMetadata } from '@/components/CategoryLayout';

// Generate metadata using CategoryLayout's function
export async function generateMetadata(): Promise<Metadata> {
    return generateCategoryMetadata({
        slug: 'mind-sleep',
        parentSlug: undefined, // Danh mục cha không có parent
        categoryType: 'article',
        defaultMetadata: {
            title: 'Mind & Sleep - Everwell Magazine',
            description: 'Your comprehensive guide to improving mental health and sleep quality with expert tips and supplements at Everwell Magazine.',
        },
        defaultImage: {
            url: 'https://cms.everwellmag.com/uploads/Common_Mind_Sleep_Issues_3dbee0cbdf.webp', // Ảnh mặc định, thay bằng ảnh phù hợp nếu có
            width: 1200,
            height: 630,
            alt: 'Mind & Sleep Guide',
        },
    });
}

export default async function MindSleepLayout({ children }: { children: React.ReactNode }) {
    return (
        <CategoryLayout
            slug="mind-sleep"
            parentSlug={undefined} // Thay null bằng undefined
            categoryType="article"
            defaultMetadata={{
                title: 'Mind & Sleep - Everwell Magazine',
                description: 'Your comprehensive guide to improving mental health and sleep quality with expert tips and supplements at Everwell Magazine.',
            }}
        >
            {children}
        </CategoryLayout>
    );
}