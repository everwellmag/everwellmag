import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/api/strapi/get-category';
import { getArticles } from '@/lib/api/strapi/get-articles';
import { getProducts } from '@/lib/api/strapi/get-products';
import ArticleList from '@/components/content/articles/article-list';
import ProductList from '@/components/content/products/product-list';
import type { Article } from '@/lib/types/article';
import type { Product } from '@/lib/types/product';

interface SubCategoryPageProps {
    params: Promise<{
        category: string;
        subcategory: string;
    }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function SubCategoryPage({ params, searchParams }: SubCategoryPageProps) {
    const { category, subcategory } = await params;
    const { page = '1' } = await searchParams;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = 12;

    const subcategoryData = await getCategoryBySlug(subcategory);
    if (!subcategoryData) {
        console.log('Subcategory not found:', subcategory);
        notFound();
    }

    const type = subcategoryData.type || 'product';
    const subcategorySlug = subcategory;

    let articles: Article[] = [];
    let products: Product[] = [];
    let totalItems = 0;

    try {
        if (type === 'article') {
            const response = await getArticles(subcategorySlug, {
                'pagination[page]': pageNumber,
                'pagination[pageSize]': pageSize,
                sort: 'priority:asc,createdAt:desc',
            });
            articles = response.data;
            totalItems = response.meta?.pagination?.total || articles.length;
        } else if (type === 'product') {
            const response = await getProducts(subcategorySlug, {
                'pagination[page]': pageNumber,
                'pagination[pageSize]': pageSize,
                sort: 'priority:asc,createdAt:desc',
            });
            products = response.data;
            totalItems = response.meta?.pagination?.total || products.length;
        } else {
            console.log('Invalid type:', type);
        }
    } catch (error) {
        console.error('Failed to fetch data for subcategory:', subcategory, error);
    }

    return (
        <main className="container mx-auto p-4">
            {/* =============== HEADER - IDENTICAL TO CATEGORY PAGE =============== */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* TITLE CARD - LEFT */}
                <div
                    className="p-6 rounded-2xl shadow-sm border"
                    style={{
                        background: 'color-mix(in srgb, var(--card-bg), transparent 50%)',
                        borderColor: 'var(--border-color2)',
                    }}
                >
                    <h1
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: 'var(--title-color)' }}
                    >
                        {subcategoryData.name || subcategory}
                    </h1>
                </div>

                {/* DESCRIPTION CARD - RIGHT */}
                {subcategoryData.description && (
                    <div
                        className="p-6 rounded-2xl shadow-sm border backdrop-blur-sm"
                        style={{
                            backgroundColor: 'color-mix(in srgb, var(--card-bg), transparent 30%)',
                            borderColor: 'var(--border-color2)',
                        }}
                    >
                        <div className="prose prose-sm md:prose-base max-w-none">
                            <p
                                className="leading-relaxed"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {subcategoryData.description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
            {/* ========================================================= */}

            {type === 'article' ? (
                <ArticleList
                    articles={articles}
                    category={category}
                    subcategory={subcategory}
                    currentPage={pageNumber}
                    totalItems={totalItems}
                    pageSize={pageSize}
                />
            ) : (
                <ProductList
                    products={products}
                    category={category}
                    subcategory={subcategory}
                    currentPage={pageNumber}
                    totalItems={totalItems}
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