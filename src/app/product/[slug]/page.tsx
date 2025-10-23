import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';
import type { Product } from '@/lib/types/product';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params; // Await params để lấy slug
    let data: Product | null = null;

    try {
        const response = await fetchStrapi(`products?filters[slug][$eq]=${slug}&populate=*`);
        console.log('Product detail API response:', response); // Debug
        data = response.data[0] as Product;
    } catch (error) {
        console.error('Error fetching product for slug:', slug, error);
    }

    if (!data) {
        console.log('No product found for slug:', slug);
        notFound();
    }

    const title = data.Name || 'Untitled';
    const description = data.Description || '';
    const imageUrl = data.Image?.url ? `https://cms.everwellmag.com${data.Image.url}` : '/placeholder.webp';
    const rating = data.rating;
    const pricemulti = data.Pricemulti || [];
    const affiliateLink = data.AffiliateLink;

    return (
        <main className="container mx-auto p-4">
            <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
                Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={data.Image?.alternativeText || title}
                    className="w-full max-w-2xl mx-auto mb-4 rounded"
                />
            )}
            {rating && (
                <p className="text-yellow-500 mb-2">Rating: {rating}/5</p>
            )}
            {pricemulti.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Pricing Options</h3>
                    <ul className="list-disc pl-5">
                        {pricemulti.map((option, index) => (
                            <li key={index}>
                                {option.quantity} units: {option.currency}{option.price}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {affiliateLink && (
                <a
                    href={affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Buy Now (Affiliate Link)
                </a>
            )}
            <div className="prose max-w-3xl mx-auto">
                {description ? (
                    <ReactMarkdown>{description}</ReactMarkdown>
                ) : (
                    <p>Không có mô tả.</p>
                )}
            </div>
        </main>
    );
}