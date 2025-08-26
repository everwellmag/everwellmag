// src/app/page.tsx
import Head from 'next/head';
import Link from 'next/link';
import { fetchFromStrapi } from '@/lib/strapi';

interface Post {
  id: number;
  documentId: string;
  title: string;
  content: string | null;
  createdAt: string;
  category: { data: { id: number; attributes: { name: string; parent?: { data: { id: number; attributes: { name: string } } } | null } } } | null;
}

interface Category {
  id: number;
  name: string;
  parent?: { data: { id: number; attributes: { name: string } } } | null;
}

export const metadata = {
  title: 'EverWell Magazine - Health & Wellness Tips 2025',
  description:
    'Explore top health tips, weight loss solutions, and affiliate products from ClickBank & Digistore24 at EverWell Magazine.',
};

const getShortDescription = (content: string | null) => {
  if (!content) return 'No preview available...';
  const firstParagraph = content.split('\n')[0] || 'No preview available.';
  return firstParagraph.slice(0, 100) + '...';
};

async function getPosts() {
  try {
    const data = await fetchFromStrapi('posts?populate=category&pagination[limit]=3&sort[0]=createdAt:desc');
    if (!data || !data.data) {
      console.error('No posts found in getPosts');
      return [];
    }
    return data.data as Post[];
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu từ Strapi:', err);
    return [];
  }
}

async function getCategories() {
  try {
    const data = await fetchFromStrapi('categories?populate=parent');
    if (!data || !data.data) {
      console.error('No categories found');
      return [];
    }
    return data.data as Category[];
  } catch (err) {
    console.error('Lỗi khi lấy danh mục:', err);
    return [];
  }
}

export default async function Home() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  // Lọc danh mục chính (parent categories)
  const parentCategories = categories.filter((cat) => !cat.parent);

  return (
    <>
      <Head>
        <meta name="keywords" content="health tips 2025, weight loss, supplements, wellness, everwellmag" />
      </Head>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <section className="bg-blue-900 text-white py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">EverWell Magazine</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Your trusted guide to 2025 health trends, expert advice, and premium wellness products.
          </p>
        </section>
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">🌿 Featured Articles & Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Link href="/category/weight-loss-foods" className="text-blue-600 hover:underline text-xl font-medium block mb-2">
                Weight Loss Foods
              </Link>
              <p className="text-gray-600">Expert advice on healthy eating.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Link href="/category/diet-plan" className="text-blue-600 hover:underline text-xl font-medium block mb-2">
                Diet Plan
              </Link>
              <p className="text-gray-600">Holistic diet solutions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Link href="/category/workout-plan" className="text-blue-600 hover:underline text-xl font-medium block mb-2">
                Workout Plan
              </Link>
              <p className="text-gray-600">Effective workout routines.</p>
            </div>
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">📰 Latest Articles</h2>
          <div className="mb-6">
            <h3 className="text-2xl font-medium text-gray-700">Categories</h3>
            <div className="flex gap-4 flex-wrap">
              {parentCategories.map((category) => (
                <div key={category.id}>
                  <Link
                    href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 hover:underline font-bold"
                  >
                    {category.name}
                  </Link>
                  {categories
                    .filter((cat) => cat.parent?.data?.id === category.id)
                    .map((subCat) => (
                      <Link
                        key={subCat.id}
                        href={`/category/${subCat.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-blue-600 hover:underline ml-4"
                      >
                        - {subCat.name}
                      </Link>
                    ))}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                  <Link
                    href={`/post/${post.documentId}`}
                    className="text-blue-600 hover:text-blue-500 text-xl font-medium block mb-2"
                  >
                    {post.title}
                  </Link>
                  <p className="text-gray-600 text-sm">
                    {post.category?.data?.attributes?.name || 'Uncategorized'}
                  </p>
                  <p className="text-gray-600 line-clamp-3">
                    {getShortDescription(post.content)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-3">No articles found.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}