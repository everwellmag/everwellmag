import React from 'react';
import { fetchFromStrapi } from '@/lib/strapi';
import Link from 'next/link';

export default async function HomePage() {
  // Gọi đúng endpoint `articles`
  const data = await fetchFromStrapi('articles');
  const articles = data.data || []; // Đảm bảo không bị undefined

  console.log('Articles data:', articles);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">EverWell Magazine</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article: any) => {
          const { id, title, description, slug } = article;
          const excerpt = description
            ? description.substring(0, 150) + '...'
            : title
              ? `${title} - No description`
              : `Article #${id} - No description`;

          return (
            <article
              key={id}
              className="border rounded-lg shadow hover:shadow-lg transition bg-white"
            >
              <div className="p-4">
                <Link
                  href={`/article/${slug || id}`}
                  className="text-xl font-semibold mb-2 block text-blue-600 hover:underline"
                >
                  {title || `Article #${id}`}
                </Link>
                <p className="text-gray-600 text-sm line-clamp-3">{excerpt}</p>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
