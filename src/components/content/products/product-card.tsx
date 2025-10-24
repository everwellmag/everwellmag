import type { Product } from '@/lib/types/product';
import Link from 'next/link';
import Image from 'next/image';

// Hàm chuẩn hóa URL ảnh
const normalizeImageUrl = (url?: string): string => {
    if (!url) return 'https://cms.everwellmag.com/Uploads/default-image.jpg';
    return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
};

interface ProductCardProps {
    product: Product;
    category: string;
    subcategory: string;
}

export default function ProductCard({ product }: ProductCardProps) {
    const title = product.Name || 'Untitled';
    const slug = product.slug || '';
    const description = product.Description || '';
    const excerpt = description.length > 100 ? description.slice(0, 100) + '...' : description;
    const imageUrl = normalizeImageUrl(product.Image?.url);

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
                <Link href={`/product/${slug}`}>{title}</Link>
            </h2>
            <p className="text-gray-600">{excerpt}</p>
            <Link href={`/product/${slug}`} className="text-blue-500 hover:underline">
                Read More
            </Link>
        </div>
    );
}