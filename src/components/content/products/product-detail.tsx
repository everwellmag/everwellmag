import Link from 'next/link';
import Image from 'next/image';
import { CustomMarkdown } from '@/components/common/markdown-renderer';
import CommentSection from '@/components/content/comments/comment-section';
import type { Product } from '@/lib/types/product';
import type { Comment } from '@/lib/types/comment';
import { CMS_DOMAIN, DEFAULT_OG_IMAGE } from '@/lib/config';
// Hàm chuẩn hóa URL ảnh
const normalizeImageUrl = (url?: string): string => {
    if (!url) return DEFAULT_OG_IMAGE;
    return url.startsWith('http') ? url : `${CMS_DOMAIN}${url}`;
};

// Hàm lấy ảnh đầu tiên từ description
const getFirstImageFromDescription = (description: string): string | null => {
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = description.match(regex);
    if (!match) return null;
    const url = match[1];
    if (typeof url !== 'string') return null;
    return url.startsWith('http') ? url : `${CMS_DOMAIN}${url}`;
};

// Hàm tạo star rating
const getStarRating = (rating?: number): React.ReactNode => {
    if (rating === undefined || rating < 0) return <span className="text-gray-500 text-sm">No rating</span>;
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

interface ProductDetailProps {
    product: Product;
    comments: Comment[];
    totalComments: number;
    currentPage: number;
    slug: string;
}

export default function ProductDetail({ product, comments, totalComments, currentPage, slug }: ProductDetailProps) {
    const title = product.Name || 'Untitled';
    const description = product.Description || '';
    const imageUrl =
        normalizeImageUrl(product.image?.url) ||
        getFirstImageFromDescription(description) ||
        DEFAULT_OG_IMAGE;
    const rating = product.rating || 0;
    const supplier = product.supplier || 'Unknown';
    const releaseYear = product.ReleaseYear || 'N/A';
    const affiliateLink = product.AffiliateLink || '#';
    const pricemulti = product.Pricemulti || [];
    const primaryCategory = product.categories?.[0] || { name: 'Uncategorized', slug: '' };
    const categoryUrl = primaryCategory.slug ? `/${primaryCategory.slug}` : '/';

    return (
        <main className="container mx-auto px-4 py-10 max-w-5xl">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm flex items-center gap-1">
                <Link
                    href="/"
                    className="font-medium transition-colors hover:text-[var(--link-hover)]"
                    style={{ color: 'var(--link-color)' }}
                >
                    Home
                </Link>
                <span className="text-gray-400">/</span>
                <Link
                    href={categoryUrl}
                    className="font-medium transition-colors hover:text-[var(--link-hover)]"
                    style={{ color: 'var(--link-color)' }}
                >
                    {primaryCategory.name}
                </Link>
                <span className="text-gray-400">/</span>
                <span className="truncate max-w-[200px]" style={{ color: 'var(--text-secondary)' }}>
                    {title}
                </span>
            </nav>

            {/* Gradient h1 */}
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-blue-purple-hover bg-clip-text text-transparent">
                {title}
            </h1>

            {/* Grid 2 cột */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Image */}
                <div className="flex justify-center items-center">
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={600}
                        height={450}
                        className="w-full max-w-sm md:max-w-md h-auto object-cover rounded-lg shadow-md transition-transform hover:scale-[1.02]"
                        style={{ width: 'auto', height: 'auto' }}
                    />
                </div>

                {/* Info box */}
                <div
                    className="rounded-lg shadow-md p-6 border border-[var(--border-color)]"
                    style={{ backgroundColor: 'var(--card-bg)' }}
                >
                    <h2 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: 'var(--title-color)' }}>
                        {title}
                    </h2>
                    <div className="space-y-3 mb-6">
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            <span className="font-medium">Supplier:</span> {supplier}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            <span className="font-medium">Released:</span> {releaseYear}
                        </p>
                        <p className="text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                            <span className="font-medium">Rating:</span> {getStarRating(rating)} <span>({rating.toFixed(1)}/5)</span>
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            <span className="font-medium">Categories:</span> {product.categories?.map((c) => c.name).join(', ') || 'Uncategorized'}
                        </p>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                            Pricing Options
                        </h3>
                        {pricemulti.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {pricemulti.map((price, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center px-3 py-2 rounded-full border border-[var(--border-color)] transition-all duration-200"
                                        style={{ backgroundColor: 'var(--background)' }}
                                    >
                                        <span className="text-sm font-medium mr-2" style={{ color: 'var(--foreground)' }}>
                                            {price.quantity} {price.quantity > 1 ? 'Units' : 'Unit'}
                                        </span>
                                        <span className="text-sm font-semibold" style={{ color: '#10B981' /* green-500 */ }}>
                                            {price.currency}
                                            {price.price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
                                No pricing options available
                            </p>
                        )}
                    </div>
                    <Link
                        href={affiliateLink}
                        className="block w-full px-6 py-3 rounded-lg text-white font-semibold text-center transition duration-200 btn-gradient"
                    >
                        Buy Now from Official Site
                    </Link>
                </div>
            </div>

            {/* Description section */}
            <section
                className="mb-12 border border-[var(--border-color)] rounded-lg shadow-md p-6"
                style={{ backgroundColor: 'var(--card-bg)' }}
            >
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                    Description
                </h2>
                <CustomMarkdown content={description} />
            </section>

            {/* Comment section */}
            <CommentSection productSlug={slug} comments={comments} totalComments={totalComments} currentPage={currentPage} />
        </main>
    );
}