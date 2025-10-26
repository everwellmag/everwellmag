// src/app/[category]/page.tsx
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
        console.log('Articles for category', category, ':', JSON.stringify(articles, null, 2));

        const productsResponse = await getProducts(category, {
            'pagination[page]': pageNumber,
            'pagination[pageSize]': pageSize,
            sort: 'priority:asc,createdAt:desc',
        });
        products = productsResponse.data;
        totalProducts = productsResponse.meta?.pagination?.total || products.length;
        console.log('Products for category', category, ':', JSON.stringify(products, null, 2));
    } catch (error) {
        console.error('Failed to fetch data for category:', category, error);
    }

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-blue-purple-hover bg-clip-text text-transparent">
                {categoryData.name || category}
            </h1>
            {categoryData.description && (
                <div className="prose mb-6">
                    <p>{categoryData.description}</p>
                </div>
            )}
            {articles.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">New Articles</h2>
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
                    <h2 className="text-2xl font-semibold mb-4">Supplements</h2>
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
                <p>No content available for this category.</p>
            )}
        </main>
    );
}