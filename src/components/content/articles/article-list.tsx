import ArticleCard from './article-card';
import type { Article } from '@/lib/types/article';

interface ArticleListProps {
    articles: Article[];
    category: string;
    subcategory: string;
}

export default function ArticleList({ articles, category, subcategory }: ArticleListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map(article => (
                <ArticleCard key={article.id} article={article} category={category} subcategory={subcategory} />
            ))}
        </div>
    );
}