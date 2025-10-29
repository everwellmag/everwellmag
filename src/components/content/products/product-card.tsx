import type { Product } from '@/lib/types/product';
import Link from 'next/link';
import Image from 'next/image';
import { CMS_DOMAIN, DEFAULT_OG_IMAGE } from '@/lib/config';
// Hàm chuẩn hóa URL ảnh
const normalizeImageUrl = (url?: string): string => {
    if (!url) return DEFAULT_OG_IMAGE;
    return url.startsWith('http') ? url : `${CMS_DOMAIN}${url}`;
};

// Hàm tạo star rating
const getStarRating = (rating?: number): React.ReactNode => {
    if (rating === undefined || rating < 0) return <span className="text-gray-500 text-base">No rating</span>;
    const fullStars = Math.floor(rating);
    const decimal = rating % 1;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={`full-${i}`} className="text-yellow-400 text-lg">★</span>);
    }
    if (decimal > 0 && fullStars < 5) {
        const clipPercentage = decimal * 100;
        stars.push(
            <span key="decimal" className="inline-block relative text-lg">
                <span className="absolute text-yellow-400" style={{ clipPath: `inset(0 ${100 - clipPercentage}% 0 0)` }}>
                    ★
                </span>
                <span className="text-gray-300">★</span>
            </span>
        );
    }
    const emptyStars = 5 - fullStars - (decimal > 0 ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<span key={`empty-${i}`} className="text-gray-300 text-lg">★</span>);
    }
    return <span className="flex items-center">{stars}</span>;
};

interface ProductCardProps {
    product: Product;
    category: string;
    subcategory: string;
}

export default function ProductCard({ product }: ProductCardProps) {
    const title = product.Name || 'Untitled';
    const slug = product.slug || '';
    const imageUrl = normalizeImageUrl(product.image?.url);
    const rating = product.rating || 0;
    const supplier = product.supplier || 'Unknown';
    const releaseYear = product.ReleaseYear || 'N/A';
    const pricemulti = product.Pricemulti || [];
    const affiliateLink = product.AffiliateLink || '#';

    return (
        <div
            className="border border-[var(--border-color)] p-4 rounded-lg shadow-md flex flex-col transition-transform duration-200 hover:-translate-y-1"
            style={{ backgroundColor: 'var(--card-bg)' }}
        >
            <Link href={`/product/${slug}`} className="flex justify-center">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={400}
                    height={300}
                    className="w-full max-w-[400px] h-48 object-cover mb-2 rounded shadow-md"
                    style={{ width: '100%', height: 'auto', maxWidth: '400px' }}
                />
            </Link>
            <h2
                className="text-lg font-bold line-clamp-2 mb-3"
                style={{ color: 'var(--foreground)' }}
            >
                <Link href={`/product/${slug}`}>{title}</Link>
            </h2>
            <div className="space-y-2 mb-4">
                <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-medium">Supplier:</span> {supplier}
                </p>
                <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-medium">Released:</span> {releaseYear}
                </p>
                <p className="text-base flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-medium">Rating:</span> {getStarRating(rating)} <span>({rating.toFixed(1)}/5)</span>
                </p>
                {pricemulti.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {pricemulti.map((price, index) => (
                            <div
                                key={index}
                                className="flex items-center px-3 py-1 rounded-full border border-[var(--border-color)]"
                                style={{ backgroundColor: 'var(--background)' }}
                            >
                                <span className="text-base font-medium mr-2" style={{ color: 'var(--foreground)' }}>
                                    {price.quantity} {price.quantity > 1 ? 'Units' : 'Unit'}
                                </span>
                                <span className="text-base font-semibold" style={{ color: '#10B981' }}>
                                    {price.currency}
                                    {price.price}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-base italic" style={{ color: 'var(--text-secondary)' }}>
                        No pricing options available
                    </p>
                )}
            </div>
            <div className="flex gap-2 mt-auto">
                <Link
                    href={affiliateLink}
                    className="flex-1 px-4 py-2 rounded-lg text-white font-semibold text-center transition duration-200 btn-gradient text-base"
                    target="_blank"                    // Mở tab mới
                    rel="nofollow noopener noreferrer" // Chống phạt Google + bảo mật
                >
                    Buy Now
                </Link>
                <Link
                    href={`/product/${slug}`}
                    className="flex-1 px-4 py-2 rounded-lg font-semibold text-center transition duration-200 text-base border border-[var(--border-color)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--placeholder-bg)]"
                >
                    Detail
                </Link>
            </div>
        </div>
    );
}