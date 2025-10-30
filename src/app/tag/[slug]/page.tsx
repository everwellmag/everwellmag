// src/app/tag/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';
import ArticleList from '@/components/content/articles/article-list';
import ProductList from '@/components/content/products/product-list';
import type { Article } from '@/lib/types/article';
import type { Product } from '@/lib/types/product';

export const dynamic = 'force-dynamic';

interface TagPageProps {
    params: Promise<{ slug: string }>;
}

// === TYPE CHO DỮ LIỆU THÔ TỪ STRAPI v5 ===
interface StrapiArticleData {
    id: number;
    title?: string;
    Name?: string;
    slug: string;
    excerpt?: string;
    image?: {
        id?: number;
        url: string;
        width?: number;
        height?: number;
        alternativeText?: string;
    } | null;
    tags?: {
        data: Array<{
            id: number;
            name: string;
            slug: string;
            color?: string;
        }>;
    } | null; // THÊM | null
    createdAt: string;
}

interface StrapiProductData {
    id: number;
    Name?: string;
    slug?: string;
    image?: {
        id?: number;
        url: string;
        width?: number;
        height?: number;
        alternativeText?: string;
    } | null;
    rating?: number;
    supplier?: string;
    ReleaseYear?: string;
    AffiliateLink?: string;
    priority?: number;
    Pricemulti?: Array<{
        quantity: number;
        price: number;
        currency: string;
    }> | null; // THÊM | null
}

export default async function TagPage({ params }: TagPageProps) {
    const { slug } = await params;

    const [articlesRes, productsRes] = await Promise.all([
        fetchStrapi('articles', {
            'filters[tags][slug][$eq]': slug,
            'pagination[pageSize]': 12,
            'populate[0]': 'image',
            'populate[1]': 'tags',
            'sort': 'createdAt:desc',
        }),
        fetchStrapi('products', {
            'filters[tags][slug][$eq]': slug,
            'pagination[pageSize]': 12,
            'populate[0]': 'image',
            'populate[1]': 'tags',
            'sort': 'priority:asc,createdAt:desc',
        }),
    ]);

    // === MAP ARTICLES – AN TOÀN, KHÔNG LỖI TS ===
    const articles: Article[] = (articlesRes.data || []).map((item: StrapiArticleData): Article => ({
        id: item.id,
        documentId: '',
        title: item.title || item.Name || 'Untitled',
        slug: item.slug,
        description: item.excerpt || '',
        image: item.image
            ? {
                url: item.image.url,
                alternativeText: item.image.alternativeText,
                width: item.image.width,
                height: item.image.height,
            }
            : undefined,
        tags: item.tags?.data && Array.isArray(item.tags.data)
            ? item.tags.data.map(tag => ({
                id: tag.id,
                name: tag.name,
                slug: tag.slug,
                color: tag.color,
            }))
            : [],
        categories: [],
        createdAt: item.createdAt,
        updatedAt: item.createdAt,
        publishedAt: item.createdAt,
        priority: null,
    }));

    // === MAP PRODUCTS – AN TOÀN, KHÔNG LỖI TS ===
    const products: Product[] = (productsRes.data || []).map((item: StrapiProductData): Product => ({
        id: item.id,
        documentId: '',
        Name: item.Name || 'Unknown Product',
        slug: item.slug || '',
        Description: '',
        image: item.image
            ? {
                url: item.image.url,
                alternativeText: item.image.alternativeText,
                width: item.image.width,
                height: item.image.height,
            }
            : undefined,
        rating: item.rating || 0,
        supplier: item.supplier || 'Unknown',
        ReleaseYear: item.ReleaseYear || 'N/A',
        AffiliateLink: item.AffiliateLink || '#',
        priority: item.priority ?? null,
        Pricemulti: item.Pricemulti && Array.isArray(item.Pricemulti) ? item.Pricemulti : [],
        categories: [],
        createdAt: '',
        updatedAt: '',
        publishedAt: undefined,
    }));

    if (articles.length === 0 && products.length === 0) {
        notFound();
    }

    return (
        <main className="container mx-auto p-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold capitalize" style={{ color: 'var(--title-color)' }}>
                    {slug.replace(/-/g, ' ')}
                </h1>
                <p className="text-lg mt-2" style={{ color: 'var(--text-secondary)' }}>
                    {articles.length} articles • {products.length} products
                </p>
            </div>

            {articles.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--title-color)' }}>
                        Related Articles
                    </h2>
                    <ArticleList
                        articles={articles}
                        category=""
                        subcategory=""
                        currentPage={1}
                        totalItems={articles.length}
                        pageSize={12}
                    />
                </section>
            )}

            {products.length > 0 && (
                <section>
                    <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--title-color)' }}>
                        Suggested Products
                    </h2>
                    <ProductList
                        products={products}
                        category=""
                        subcategory=""
                        currentPage={1}
                        totalItems={products.length}
                        pageSize={12}
                    />
                </section>
            )}
        </main>
    );
}