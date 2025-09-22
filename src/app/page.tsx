import { fetchFromStrapi } from '@/lib/strapi';

// Định nghĩa interface
interface StrapiArticle {
  id: number;
  title?: string;
  slug: string;
  description?: string;
}

export default async function HomePage() {
  const data = await fetchFromStrapi('articles?populate=*');
  const articles: StrapiArticle[] = data.data || [];

  return (
    <main>
      <h1>Articles</h1>
      <ul>
        {articles.map((article: StrapiArticle) => (
          <li key={article.id}>
            <a href={`/article/${article.slug}`}>{article.title || 'No title'}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}