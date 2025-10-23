import type { Article } from '@/lib/types/article';
import Link from 'next/link';
import Image from 'next/image';

// Hàm lấy URL ảnh đầu tiên từ blocks.body
const getFirstImageFromBlocks = (blocks: Article['blocks']): string | null => {
    for (const block of blocks || []) {
        if (block.__component === 'shared.rich-text' && block.body) {
            const regex = /!\[.*?\]\((.*?)\)/g;
            const matches = block.body.match(regex);
            if (matches) {
                const url = matches[0].replace(/!\[.*?\]\((.*?)\)/, '$1');
                return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
            }
        }
    }
    return null;
};

// Hàm chuẩn hóa URL ảnh
const normalizeImageUrl = (url?: string): string | null => {
    if (!url) return null;
    return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
};

interface ArticleCardProps {
    article: Article;
    category: string;
    subcategory: string;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    const title = article.title || 'Untitled';
    const slug = article.slug || '';
    const description = article.description || '';
    const excerpt = description.length > 100 ? description.slice(0, 100) + '...' : description;
    const imageUrl = normalizeImageUrl(article.image?.url) || getFirstImageFromBlocks(article.blocks) || 'https://cms.everwellmag.com/Uploads/default-image.jpg';

    return (
        <div className="border p-4 mb-4 rounded-lg shadow">
            <Image
                src={imageUrl}
                alt={title}
                width={400}
                height={300}
                className="w-full h-48 object-cover mb-2 rounded"
                style={{ width: 'auto', height: 'auto' }}
            />
            <h2 className="text-xl font-bold">
                <Link href={`/article/${slug}`}>{title}</Link>
            </h2>
            <p className="text-gray-600">{excerpt}</p>
            <Link href={`/article/${slug}`} className="text-blue-500 hover:underline">
                Read More
            </Link>
        </div>
    );
}