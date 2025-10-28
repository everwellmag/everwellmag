import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/api/strapi/get-category';
import { getArticles } from '@/lib/api/strapi/get-articles';
import { getProducts } from '@/lib/api/strapi/get-products';
import ArticleList from '@/components/content/articles/article-list';
import ProductList from '@/components/content/products/product-list';
import type { Article } from '@/lib/types/article';
import type { Product } from '@/lib/types/product';

interface CategoryPageProps {
    params: Promise<{ category: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { category } = await params;
    const { page = '1' } = await searchParams;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = 12;

    const categoryData = await getCategoryBySlug(category);

    if (!categoryData) {
        console.log('Category not found:', category);
        notFound();
    }

    let articles: Article[] = [];
    let products: Product[] = [];
    let totalArticles = 0;
    let totalProducts = 0;

    try {
        const articlesResponse = await getArticles(category, {
            'pagination[page]': pageNumber,
            'pagination[pageSize]': pageSize,
            sort: 'priority:asc,createdAt:desc',
        });
        articles = articlesResponse.data;
        totalArticles = articlesResponse.meta?.pagination?.total || articles.length;

        const productsResponse = await getProducts(category, {
            'pagination[page]': pageNumber,
            'pagination[pageSize]': pageSize,
            sort: 'priority:asc,createdAt:desc',
        });
        products = productsResponse.data;
        totalProducts = productsResponse.meta?.pagination?.total || products.length;
    } catch (error) {
        console.error('Failed to fetch data for category:', category, error);
    }

    return (
        <main className="container mx-auto pt-8 p-4">
            {/* =============== HEADER - CLEAN & THEMED =============== */}
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
                        style={{ color: 'var(--title-color)' }}   // ← SOLID COLOR FROM CSS VAR
                    >
                        {categoryData.name || category}
                    </h1>
                </div>

                {/* DESCRIPTION CARD - RIGHT */}
                {categoryData.description && (
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
                                {categoryData.description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
            {/* ========================================================= */}

            {articles.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold pt-4 mb-1" style={{ color: 'var(--title-color)' }}>
                        Latest Articles
                    </h2>
                    <ArticleList
                        articles={articles}
                        category={category}
                        subcategory=""
                        currentPage={pageNumber}
                        totalItems={totalArticles}
                        pageSize={pageSize}
                    />
                </section>
            )}

            {products.length > 0 && (
                <section>
                    <h2 className="text-2xl font-semibold mb-1" style={{ color: 'var(--title-color)' }}>
                        Recommended Supplements
                    </h2>
                    <ProductList
                        products={products}
                        category={category}
                        subcategory=""
                        currentPage={pageNumber}
                        totalItems={totalProducts}
                        pageSize={pageSize}
                    />
                </section>
            )}

            {articles.length === 0 && products.length === 0 && (
                <p className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
                    No content available in this category.
                </p>
            )}
        </main>
    );
}