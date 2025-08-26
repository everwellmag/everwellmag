// src/app/weight-loss/page.tsx
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

async function getPostsByWeightLossCategory() {
  try {
    // Lấy tất cả bài viết thuộc danh mục "Weight Loss" và các danh mục con
    const data = await fetchFromStrapi(
      `posts?filters[$or][0][category][name][$eq]=Weight Loss&filters[$or][1][category][parent][name][$eq]=Weight Loss&populate=category&pagination[limit]=10&sort[0]=createdAt:desc`
    );
    if (!data || !data.data) {
      console.error('No posts found for Weight Loss category');
      return [];
    }
    return data.data as Post[];
  } catch (err) {
    console.error('Lỗi khi lấy bài viết cho Weight Loss:', err);
    return [];
  }
}

export default async function WeightLossPage() {
  const posts = await getPostsByWeightLossCategory();

  if (posts.length === 0) {
    return <p className="text-center text-gray-600 pt-6">No articles found in Weight Loss category.</p>;
  }

  return (
    <main className="pt-6 md:pt-8 px-4 md:px-6 max-w-[1080px] mx-auto">
      <h1 className="text-3xl font-bold mb-6">Weight Loss Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
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
              {post.content ? post.content.split('\n')[0]?.slice(0, 100) + '...' : 'No preview available...'}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}