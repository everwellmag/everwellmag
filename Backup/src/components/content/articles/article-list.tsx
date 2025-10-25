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
}

export default function ArticleList({
    articles,
    category,
    subcategory,
    currentPage,
    totalItems,
    pageSize,
}: ArticleListProps) {
    // Sort client-side (optional, có thể bỏ nếu API đã sort)
    const sortedArticles = [...articles].sort((a, b) => {
        const priorityA = a.priority ?? Number.MAX_SAFE_INTEGER;
        const priorityB = b.priority ?? Number.MAX_SAFE_INTEGER;
        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedArticles.map((article, index) => (
                    <div
                        key={article.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <ArticleCard article={article} category={category} subcategory={subcategory} />
                    </div>
                ))}
            </div>
            {totalItems > pageSize && (
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        pageSize={pageSize}
                        baseUrl={`/${category}/${subcategory}`}
                    />
                </div>
            )}
        </div>
    );
}