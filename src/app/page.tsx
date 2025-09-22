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
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Articles</h1>
        <ul className="space-y-4">
          {articles.map((article) => (
            <li
              key={article.id}
              className="bg-white rounded-lg shadow-sm p-4 hover:bg-gray-100 transition-colors duration-200"
            >
              <a
                href={`/article/${article.slug}`}
                className="text-xl font-semibold text-blue-600 hover:text-blue-800"
              >
                {article.title || 'No title'}
              </a>
              {article.description && (
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {article.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}