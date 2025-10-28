import ArticleCard from './article-card';
import Pagination from '@/components/ui/pagination';
import type { Article } from '@/lib/types/article';

interface ArticleListProps {
    articles: Article[];
    category: string;
    subcategory: string;
    currentPage: number;
    totalItems: number;
    pageSize: number;
    q?: string;
}

export default function ArticleList({
    articles,
    category,
    subcategory,
    currentPage,
    totalItems,
    pageSize,
    q,
}: ArticleListProps) {
    // Client-side sort: priority first, then newest
    const sortedArticles = [...articles].sort((a, b) => {
        const priorityA = a.priority ?? Number.MAX_SAFE_INTEGER;
        const priorityB = b.priority ?? Number.MAX_SAFE_INTEGER;
        return priorityA !== priorityB
            ? priorityA - priorityB
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Dynamic base URL for pagination
    const baseUrl = q
        ? `/search?q=${encodeURIComponent(q)}`
        : `/${category}/${subcategory}`.replace(/\/$/, '');

    return (
        <section className="container mx-auto px-1 py-8">
            {/* RESPONSIVE MASONRY-LIKE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
                {sortedArticles.map((article, index) => (
                    <article
                        key={article.id}
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"
                        style={{ animationDelay: `${Math.min(index * 75, 600)}ms` }}
                    >
                        <ArticleCard article={article} category={category} subcategory={subcategory} />
                    </article>
                ))}
            </div>

            {/* PAGINATION – chỉ hiện khi cần */}
            {totalItems > pageSize && (
                <nav aria-label="Pagination" className="mt-12 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        pageSize={pageSize}
                        baseUrl={baseUrl}
                    />
                </nav>
            )}
        </section>
    );
}