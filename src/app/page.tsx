import { getArticles } from '@/lib/api/strapi/get-articles';
import ArticleList from '@/components/content/articles/article-list';

export default async function Home() {
  const articles = await getArticles();
  return (
    <main>
      <h1>Trang Chủ</h1>
      <ArticleList articles={articles} />
    </main>
  );
}