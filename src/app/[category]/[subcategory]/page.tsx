// src/app/[category]/[subcategory]/page.tsx
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
        console.log('Không tìm thấy danh mục con:', subcategory);
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
            console.log('Type không hợp lệ:', type);
        }
    } catch (error) {
        console.error('Lỗi khi fetch dữ liệu cho danh mục con:', subcategory, error);
    }

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-blue-purple-hover bg-clip-text text-transparent">
                {subcategoryData.name || subcategory}
            </h1>
            {subcategoryData.description && (
                <div className="prose mb-6">
                    <p>{subcategoryData.description}</p>
                </div>
            )}
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
                <p>No content available for this subcategory.</p>
            )}
        </main>
    );
}