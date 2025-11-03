// src/app/[category]/[subcategory]/page.tsx
import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/api/strapi/get-category';
import ArticleList from '@/components/content/articles/article-list';
import ProductList from '@/components/content/products/product-list';
import Image from 'next/image';
import { CMS_DOMAIN } from '@/lib/config';

export const revalidate = 600;

const normalizeImageUrl = (url?: string) => {
    if (!url) return '/placeholder.webp';
    return url.startsWith('http') ? url : `${CMS_DOMAIN}${url}`;
};

interface SubCategoryPageProps {
    params: Promise<{ category: string; subcategory: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function SubCategoryPage({ params, searchParams }: SubCategoryPageProps) {
    const { category, subcategory } = await params;
    const { page = '1' } = await searchParams;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = 12;

    const subcategoryData = await getCategoryBySlug(subcategory);
    if (!subcategoryData) notFound();

    const type = subcategoryData.type || 'product';
    const articles = subcategoryData.articles || [];
    const products = subcategoryData.products || [];

    return (
        <main className="container mx-auto pt-8 p-4">
            {/* HEADER */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div
                    className="p-6 rounded-2xl shadow-sm border flex items-center gap-5"
                    style={{
                        background: 'color-mix(in srgb, var(--card-bg), transparent 50%)',
                        borderColor: 'var(--border-color2)',
                    }}
                >
                    <div className="flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden shadow-sm bg-gray-100">
                        {subcategoryData.image?.url ? (
                            <Image
                                src={normalizeImageUrl(subcategoryData.image.url)}
                                alt={subcategoryData.image.alternativeText || subcategoryData.name}
                                width={600}
                                height={400}
                                className="w-full h-full object-cover rounded-lg"
                                priority
                                fetchPriority="high" // 🔥 giúp trình duyệt tải sớm
                                sizes="(max-width: 768px) 100vw, 50vw" // giúp responsive LCP
                            />

                        ) : (
                            <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg" />
                        )}
                    </div>
                    <h1
                        className="text-3xl md:text-4xl font-bold flex-1 min-w-0"
                        style={{ color: 'var(--title-color)' }}
                    >
                        {subcategoryData.name}
                    </h1>
                </div>

                {subcategoryData.description && (
                    <div
                        className="p-6 rounded-2xl shadow-sm border backdrop-blur-sm"
                        style={{
                            backgroundColor: 'color-mix(in srgb, var(--card-bg), transparent 30%)',
                            borderColor: 'var(--border-color2)',
                        }}
                    >
                        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {subcategoryData.description}
                        </p>
                    </div>
                )}
            </div>

            {/* CONTENT */}
            {type === 'article' ? (
                <ArticleList
                    articles={articles}
                    category={category}
                    subcategory={subcategory}
                    currentPage={pageNumber}
                    totalItems={articles.length}
                    pageSize={pageSize}
                />
            ) : (
                <ProductList
                    products={products}
                    category={category}
                    subcategory={subcategory}
                    currentPage={pageNumber}
                    totalItems={products.length}
                    pageSize={pageSize}
                />
            )}

            {articles.length === 0 && products.length === 0 && (
                <p className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
                    No content available in this subcategory.
                </p>
            )}
        </main>
    );
}
