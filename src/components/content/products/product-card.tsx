import type { Product } from '@/lib/types/product';
import Link from 'next/link';

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
    const imageUrl = product.Image?.url ? `https://cms.everwellmag.com${product.Image.url}` : '/placeholder.webp';

    return (
        <div className="border p-4 mb-4 rounded-lg shadow">
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={product.Image?.alternativeText || title}
                    className="w-full h-48 object-cover mb-2 rounded"
                />
            )}
            <h2 className="text-xl font-bold">
                <Link href={`/product/${slug}`}>{title}</Link>
            </h2>
            <p className="text-gray-600">{excerpt}</p>
            {product.rating && (
                <p className="text-sm text-yellow-500">Rating: {product.rating}/5</p>
            )}
            {product.Pricemulti && product.Pricemulti.length > 0 && (
                <p className="text-sm font-semibold text-green-600">
                    From {product.Pricemulti[0].currency}{product.Pricemulti[0].price}
                </p>
            )}
            <Link href={`/product/${slug}`} className="text-blue-500 hover:underline">
                View Details
            </Link>
        </div>
    );
}