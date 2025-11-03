// src/app/[category]/page.tsx
import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/api/strapi/get-category';
import ArticleList from '@/components/content/articles/article-list';
import ProductList from '@/components/content/products/product-list';
import Image from 'next/image';
import { CMS_DOMAIN } from '@/lib/config';

export const revalidate = 600; // cache 10 phút

const normalizeImageUrl = (url?: string) => {
    if (!url) return '/placeholder.webp';
    return url.startsWith('http') ? url : `${CMS_DOMAIN}${url}`;
};

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
    if (!categoryData) notFound();
    if (categoryData.type !== 'mixed') notFound();

    const subcategories = categoryData.children || [];
    const articles = categoryData.articles || [];
    const products = categoryData.products || [];

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
                        {categoryData.image?.url ? (
                            <Image
                                src={normalizeImageUrl(categoryData.image.url)}
                                alt={categoryData.image.alternativeText || categoryData.name}
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
                    <h1 className="text-3xl md:text-4xl font-bold flex-1 min-w-0" style={{ color: 'var(--title-color)' }}>
                        {categoryData.name}
                    </h1>
                </div>

                {categoryData.description && (
                    <div
                        className="p-6 rounded-2xl shadow-sm border backdrop-blur-sm"
                        style={{
                            backgroundColor: 'color-mix(in srgb, var(--card-bg), transparent 30%)',
                            borderColor: 'var(--border-color2)',
                        }}
                    >
                        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {categoryData.description}
                        </p>
                    </div>
                )}
            </div>

            {/* SUBCATEGORIES */}
            {subcategories.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--title-color)' }}>
                        Subcategories
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {subcategories.map((sub) => (
                            <a
                                key={sub.id}
                                href={`/${category}/${sub.slug}`}
                                className="group flex items-start gap-4 p-5 rounded-xl border transition-all hover:shadow-md hover:-translate-y-1"
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                            >
                                <div className="flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden shadow-sm bg-gray-100">
                                    {sub.image?.url ? (
                                        <Image
                                            src={normalizeImageUrl(sub.image.url)}
                                            alt={sub.image.alternativeText || sub.name}
                                            width={96}
                                            height={64}
                                            className="w-full h-full object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <h3 className="font-semibold text-lg text-[var(--foreground)] group-hover:text-[var(--link-hover)] transition-colors line-clamp-1">
                                        {sub.name}
                                    </h3>
                                    {sub.description && (
                                        <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">
                                            {sub.description}
                                        </p>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* ARTICLES */}
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
                        totalItems={articles.length}
                        pageSize={pageSize}
                    />
                </section>
            )}

            {/* PRODUCTS */}
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
                        totalItems={products.length}
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
