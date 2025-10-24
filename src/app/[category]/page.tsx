import { getCategoryBySlug } from '@/lib/api/strapi/get-category';
import { getArticles } from '@/lib/api/strapi/get-articles';
import { getProducts } from '@/lib/api/strapi/get-products';
import ArticleList from '@/components/content/articles/article-list';
import ProductList from '@/components/content/products/product-list';
import { notFound } from 'next/navigation';
import type { Article } from '@/lib/types/article';
import type { Product } from '@/lib/types/product';

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params; // Await params
    const categoryData = await getCategoryBySlug(category);
    if (!categoryData) {
        console.log('Không tìm thấy danh mục:', category);
        notFound();
    }

    let articles: Article[] = [];
    let products: Product[] = [];

    try {
        // Fetch articles and products for the category
        articles = await getArticles(category);
        products = await getProducts(category);
        console.log('Danh sách bài viết cho danh mục:', category, articles);
        console.log('Danh sách sản phẩm cho danh mục:', category, products);
    } catch (error) {
        console.error('Lỗi khi fetch dữ liệu cho danh mục:', category, error);
    }

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{categoryData.name || category}</h1>
            {categoryData.description && (
                <div className="prose mb-6">
                    <p>{categoryData.description}</p>
                </div>
            )}
            {articles.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">New articles</h2>
                    <ArticleList articles={articles} category={category} subcategory="" />
                </section>
            )}
            {products.length > 0 && (
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Supplements</h2>
                    <ProductList products={products} category={category} subcategory="" />
                </section>
            )}
            {articles.length === 0 && products.length === 0 && (
                <p>Không có nội dung cho danh mục này.</p>
            )}
        </main>
    );
}