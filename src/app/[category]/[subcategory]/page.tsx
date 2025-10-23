import { getCategoryBySlug } from '@/lib/api/strapi/get-category';
import { getArticles } from '@/lib/api/strapi/get-articles';
import { getProducts } from '@/lib/api/strapi/get-products';
import ArticleList from '@/components/content/articles/article-list';
import ProductList from '@/components/content/products/product-list';
import { notFound } from 'next/navigation';
import type { Article } from '@/lib/types/article';
import type { Product } from '@/lib/types/product';

interface SubCategoryPageProps {
    params: Promise<{
        category: string;
        subcategory: string;
    }>;
}

export default async function SubCategoryPage({ params }: SubCategoryPageProps) {
    const { category, subcategory } = await params; // Await params
    const subcategoryData = await getCategoryBySlug(subcategory);
    if (!subcategoryData) {
        console.log('Không tìm thấy danh mục con:', subcategory);
        notFound();
    }

    const type = subcategoryData.type || 'product';
    const subcategorySlug = subcategory;

    let articles: Article[] = [];
    let products: Product[] = [];

    try {
        if (type === 'article') {
            articles = await getArticles(subcategorySlug);
            console.log('Danh sách bài viết:', articles);
        } else if (type === 'product') {
            products = await getProducts(subcategorySlug);
            console.log('Danh sách sản phẩm:', products);
        } else {
            console.log('Type không hợp lệ:', type);
        }
    } catch (error) {
        console.error('Lỗi khi fetch dữ liệu cho danh mục con:', subcategory, error);
    }

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{subcategoryData.name || subcategory}</h1>
            {type === 'article' ? (
                <ArticleList articles={articles} category={category} subcategory={subcategory} />
            ) : (
                <ProductList products={products} category={category} subcategory={subcategory} />
            )}
        </main>
    );
}