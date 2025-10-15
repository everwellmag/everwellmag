import ReactMarkdown from 'react-markdown';
import Image from 'next/image'; // Đảm bảo import đúng từ next/image
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Define TypeScript interfaces for the API response
interface StrapiMedia {
    data: {
        attributes: {
            url: string; // Chỉ dùng string, loại bỏ Blob
            alternativeText?: string;
            width?: number;
            height?: number;
        };
    } | null;
}

interface StrapiProduct {
    id: number;
    Name: string;
    Description: string;
    Price: string;
    Supplier: string;
    ReleaseYear?: string;
    AffiliateLink: string;
    slug: string;
    Image?: StrapiMedia; // Giữ để metadata, không render
    category: {
        id: number;
        name: string;
        slug: string;
    };
}

// Memoize fetch to avoid duplicate calls
const getProductData = async (slug: string) => {
    const response = await fetch(`https://cms.everwellmag.com/api/products?filters[slug][$eq]=${slug}&populate=*`, {
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch product');
    const data = await response.json();
    return data.data?.[0] || null;
};

// Helper functions from ArticlePage, sửa toStringSrc
const toStringSrc = (url: string | null): string => {
    if (!url) return '';
    return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
};

const toNumber = (value: string | number | undefined): number | undefined => {
    if (value === undefined) return undefined;
    const num = typeof value === 'string' ? parseInt(value, 10) : value;
    return isNaN(num) ? undefined : num;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    try {
        const product: StrapiProduct | null = await getProductData(resolvedParams.slug);
        const baseUrl = process.env.STRAPI_API_URL || 'https://cms.everwellmag.com';
        const productImageUrl = product?.Image?.data?.attributes?.url ? toStringSrc(product.Image.data.attributes.url) : null;

        return {
            title: product?.Name || 'Everwell Magazine - Product',
            description:
                product?.Description ||
                `Explore ${product?.Name || 'this product'} on Everwell Magazine. Shop now for health solutions!`,
            robots: { index: true, follow: true },
            openGraph: {
                title: product?.Name || 'Everwell Magazine - Product',
                description:
                    product?.Description ||
                    `Explore ${product?.Name || 'this product'} on Everwell Magazine. Shop now for health solutions!`,
                images: [productImageUrl || `${baseUrl}/uploads/default-image.jpg`],
                url: `https://www.everwellmag.com/product/${resolvedParams.slug}`,
                type: 'website',
            },
            alternates: {
                canonical: `https://www.everwellmag.com/product/${resolvedParams.slug}`,
            },
        };
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return {
            title: 'Everwell Magazine - Product',
            description: 'Discover top health products on Everwell Magazine.',
            robots: { index: true, follow: true },
            openGraph: {
                title: 'Everwell Magazine - Product',
                description: 'Discover top health products on Everwell Magazine.',
                images: [`${process.env.STRAPI_API_URL || 'https://cms.everwellmag.com'}/uploads/default-image.jpg`],
                url: `https://www.everwellmag.com/product/${resolvedParams.slug}`,
                type: 'website',
            },
            alternates: {
                canonical: `https://www.everwellmag.com/product/${resolvedParams.slug}`,
            },
        };
    }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    try {
        const { slug } = resolvedParams;
        console.log('Slug:', slug);
        console.log('STRAPI_API_URL:', process.env.STRAPI_API_URL);

        const product: StrapiProduct | null = await getProductData(slug);
        if (!product) {
            console.log('No product found for slug:', slug);
            notFound();
        }

        const { Name, Description, Price, Supplier, ReleaseYear, AffiliateLink } = product;

        return (
            <main style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }} className="max-w-5xl mx-auto p-6">
                <h1 style={{ color: 'var(--foreground)' }} className="text-3xl font-bold mb-4">
                    {Name || 'No Product Name'}
                </h1>
                <p style={{ color: 'var(--foreground)' }} className="mb-4">
                    {Price || 'No price available'}
                </p>
                <a
                    href={AffiliateLink}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 mb-4 inline-block"
                >
                    Buy Now from Official Site
                </a>
                <div className="space-y-2 mb-4">
                    <p className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Supplier: {Supplier || 'N/A'}</p>
                    {ReleaseYear && <p className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Released: {ReleaseYear}</p>}
                </div>
                <div className="prose max-w-none">
                    <ReactMarkdown
                        components={{
                            p: ({ ...props }) => (
                                <p style={{ color: 'var(--foreground)' }} className="mb-4" {...props} />
                            ),
                            h1: ({ ...props }) => (
                                <h1 style={{ color: 'var(--foreground)' }} className="text-3xl font-bold mb-4" {...props} />
                            ),
                            h2: ({ ...props }) => (
                                <h2 style={{ color: 'var(--foreground)' }} className="text-2xl font-semibold mb-3" {...props} />
                            ),
                            h3: ({ ...props }) => (
                                <h3 style={{ color: 'var(--foreground)' }} className="text-xl font-semibold mb-2" {...props} />
                            ),
                            h4: ({ ...props }) => (
                                <h4 style={{ color: 'var(--foreground)' }} className="text-lg font-semibold mb-2" {...props} />
                            ),
                            ul: ({ ...props }) => (
                                <ul style={{ color: 'var(--foreground)' }} className="list-disc list-inside mb-4" {...props} />
                            ),
                            ol: ({ ...props }) => (
                                <ol style={{ color: 'var(--foreground)' }} className="list-decimal list-inside mb-4" {...props} />
                            ),
                            li: ({ ...props }) => <li className="mb-2" {...props} />,
                            blockquote: ({ ...props }) => (
                                <blockquote
                                    style={{ color: 'var(--foreground)', borderColor: 'var(--foreground)' }}
                                    className="border-l-4 pl-4 italic my-4"
                                    {...props}
                                />
                            ),
                            code: ({ ...props }) => (
                                <code
                                    style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                                    className="px-1 rounded"
                                    {...props}
                                />
                            ),
                            pre: ({ ...props }) => (
                                <pre
                                    style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                                    className="p-4 rounded overflow-x-auto text-sm"
                                    {...props}
                                />
                            ),
                            a: ({ ...props }) => (
                                <a
                                    style={{ color: '#3B82F6' }}
                                    className="hover:underline hover:text-blue-700 font-medium"
                                    {...props}
                                />
                            ),
                            strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                            em: ({ ...props }) => <em className="italic" {...props} />,
                            img: ({ ...props }) => {
                                const src = props.src ? toStringSrc(props.src as string) : null; // Ép kiểu string
                                return src ? (
                                    <Image
                                        src={src}
                                        alt={props.alt || 'Product image'}
                                        width={toNumber(props.width) || 768}
                                        height={toNumber(props.height) || 768}
                                        className="max-w-full h-auto my-4 rounded-lg"
                                        unoptimized
                                        loading="lazy"
                                    />
                                ) : (
                                    <span style={{ color: 'var(--foreground)' }}>[Image: Missing URL]</span>
                                );
                            },
                        }}
                    >
                        {Description || 'No description available'}
                    </ReactMarkdown>
                </div>
                <a
                    href={AffiliateLink}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 mb-4 inline-block"
                >
                    Buy Now from Official Site
                </a>
            </main>
        );
    } catch (error) {
        console.error('Error fetching product:', error);
        notFound();
    }
}