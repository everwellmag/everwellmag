import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';
import type { Product } from '@/lib/types/product';
import type { Comment } from '@/lib/types/comment';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CustomMarkdown } from '@/components/common/markdown-renderer';
import CommentSection from '@/components/content/comments/comment-section';

// Hàm chuẩn hóa URL ảnh
const normalizeImageUrl = (url?: string): string => {
    if (!url) return 'https://cms.everwellmag.com/Uploads/default-image.jpg';
    return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
};

// Hàm lấy ảnh đầu tiên từ description
const getFirstImageFromDescription = (description: string): string | null => {
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = description.match(regex);
    if (!match) return null;
    const url = match[1];
    if (typeof url !== 'string') return null;
    return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
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
                <span className="absolute" style={{ clipPath: `inset(0 ${100 - clipPercentage}% 0 0)` }}>★</span>
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

interface ProductPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
    const { slug } = await params;
    const { page = '1' } = await searchParams;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = 10;

    if (!slug) {
        console.log('No slug provided');
        notFound();
    }

    let data: Product | null = null;
    let comments: Comment[] = [];
    let totalComments = 0;

    try {
        const response = await fetchStrapi(`products?filters[slug][$eq]=${slug}&populate=*`);
        console.log('Product detail API response:', JSON.stringify(response, null, 2));
        data = response.data[0] as Product;

        if (!data) {
            console.log('No product found for slug:', slug);
            notFound();
        }

        if (data.documentId) {
            console.log('Fetching comments for product documentId:', data.documentId);
            const commentsResponse = await fetchStrapi('comments', {
                'filters[product][documentId][$eq]': data.documentId,
                'populate': 'product',
                'sort': 'createdAt:desc',
                'pagination[page]': pageNumber,
                'pagination[pageSize]': pageSize,
            });
            console.log('Comments API response:', JSON.stringify(commentsResponse, null, 2));
            comments = (commentsResponse.data as Comment[]) || [];
            totalComments = commentsResponse.meta?.pagination?.total || comments.length;
        } else {
            console.warn('No product.documentId found, skipping comments');
        }
    } catch (error) {
        console.error('Error fetching product or comments for slug:', slug, error);
        console.log('Proceeding with product display, comments may be empty');
    }

    if (!data) {
        console.log('No product found for slug:', slug);
        notFound();
    }

    const title = data.Name || 'Untitled';
    const description = data.Description || '';
    const imageUrl = normalizeImageUrl(data.Image?.url) || getFirstImageFromDescription(description) || 'https://cms.everwellmag.com/Uploads/default-image.jpg';
    const rating = data.rating || 0;
    const supplier = data.Supplier || 'Unknown';
    const releaseYear = data.ReleaseYear || 'N/A';
    const affiliateLink = data.AffiliateLink || '#';
    const pricemulti = data.Pricemulti || [];
    const primaryCategory = data.categories?.[0] || { name: 'Uncategorized', slug: '' };
    const categoryUrl = primaryCategory.slug ? `/${primaryCategory.slug}` : '/';

    return (
        <main className="container mx-auto px-4 py-10 max-w-5xl">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm flex items-center gap-2">
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
                <span className="truncate max-w-[200px]" style={{ color: 'var(--text-secondary)' }}>{title}</span>
            </nav>

            {/* Gradient h1 */}
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-blue-purple bg-clip-text text-transparent">
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
                <div className="rounded-lg shadow-md p-6 border border-[var(--border-color)]" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <h2 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>{title}</h2>
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
                            <span className="font-medium">Categories:</span> {data.categories?.map(c => c.name).join(', ') || 'Uncategorized'}
                        </p>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Pricing Options</h3>
                        {pricemulti.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {pricemulti.map((price, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center px-4 py-2 rounded-full border border-[var(--border-color)] transition-all duration-200"
                                        style={{ backgroundColor: 'var(--placeholder-bg)' }}
                                    >
                                        <span className="text-sm font-medium mr-2" style={{ color: 'var(--foreground)' }}>
                                            {price.quantity} {price.quantity > 1 ? 'Units' : 'Unit'}
                                        </span>
                                        <span className="text-sm font-semibold" style={{ color: '#10B981' /* green-500 */ }}>
                                            {price.currency}{price.price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>No pricing options available</p>
                        )}
                    </div>
                    <Link
                        href={affiliateLink}
                        className="inline-block px-6 py-3 rounded-lg text-white font-semibold text-center transition duration-200 btn-gradient"
                    >
                        Buy Now from Official Site
                    </Link>
                </div>
            </div>

            {/* Description section */}
            <section className="mb-12 border border-[var(--border-color)] rounded-lg shadow-md p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Description</h2>
                <CustomMarkdown content={description} />
            </section>

            {/* Comment section */}
            <CommentSection productSlug={slug} comments={comments} totalComments={totalComments} currentPage={pageNumber} />
        </main>
    );
}