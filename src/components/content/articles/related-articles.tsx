// src/components/content/articles/related-articles.tsx
import { getArticles } from '@/lib/api/strapi/get-articles';
import ArticleCard from './article-card';
import type { Article } from '@/lib/types/article';

interface RelatedArticlesProps {
    currentArticle: Article;
    category: string;
}

export default async function RelatedArticles({ currentArticle, category }: RelatedArticlesProps) {
    const currentId = currentArticle.id;

    try {
        const { data: related } = await getArticles(category, {
            'pagination[page]': 1,
            'pagination[pageSize]': 6,
            sort: 'priority:asc,createdAt:desc',
            'filters[id][$ne]': currentId, // ← BÂY GIỜ HỢP LỆ
        });

        if (!related?.length) return null;

        return (
            <section className="container mx-auto px-4 py-8 mt-12">
                <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--title-color)' }}>
                    Related Articles ({related.length})
                </h2>

                {/* COPY-PASTE GRID TỪ article-list.tsx */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
                    {related.map((article, index) => (
                        <article
                            key={article.id}
                            className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"
                            style={{ animationDelay: `${Math.min(index * 75, 600)}ms` }}
                        >
                            <ArticleCard article={article} category={category} subcategory="" />
                        </article>
                    ))}
                </div>
            </section>
        );
    } catch (error) {
        console.error('Failed to load related articles:', error);
        return null;
    }
}