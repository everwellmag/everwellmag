// src/app/category/[name]/page.tsx
import { notFound } from 'next/navigation';
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

type Props = {
  params: Promise<{ name: string }>;
};

async function getPostsByCategory(categoryName: string) {
  try {
    const data = await fetchFromStrapi(
      `posts?filters[category][name][$eq]=${categoryName}&populate=category&pagination[limit]=10&sort[0]=createdAt:desc`
    );
    if (!data || !data.data) {
      console.error(`No posts found for category: ${categoryName}`);
      return [];
    }
    return data.data as Post[];
  } catch (err) {
    console.error('Lỗi khi lấy bài viết theo danh mục:', err);
    return [];
  }
}

async function getCategoryDetails(categoryName: string) {
  try {
    const data = await fetchFromStrapi(`categories?filters[name][$eq]=${categoryName}&populate=parent`);
    if (!data || !data.data || data.data.length === 0) {
      return null;
    }
    return data.data[0] as { id: number; attributes: { name: string; parent?: { data: { id: number; attributes: { name: string } } } | null } };
  } catch (err) {
    console.error('Lỗi khi lấy chi tiết danh mục:', err);
    return null;
  }
}

export default async function CategoryPage({ params }: Props) {
  const { name } = await params;
  const posts = await getPostsByCategory(name);
  const category = await getCategoryDetails(name);

  if (posts.length === 0) {
    return notFound();
  }

  const parentName = category?.attributes?.parent?.data?.attributes?.name || null;

  return (
    <main className="pt-6 md:pt-8 px-4 md:px-6 max-w-[1080px] mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {name} Articles{parentName ? ` (under ${parentName})` : ''}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
            <Link
              href={`/post/${post.documentId}`}
              className="text-blue-600 hover:text-blue-500 text-xl font-medium block mb-2"
            >
              {post.title}
            </Link>
            <p className="text-gray-600 line-clamp-3">
              {post.content ? post.content.split('\n')[0]?.slice(0, 100) + '...' : 'No preview available...'}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  try {
    const data = await fetchFromStrapi('categories?populate=parent');
    if (!data || !data.data) {
      console.error('No categories found');
      return [];
    }
    return data.data.map((category: { attributes: { name: string } }) => ({
      name: category.attributes.name.toLowerCase().replace(/\s+/g, '-'),
    }));
  } catch (err) {
    console.error('Lỗi khi lấy danh sách danh mục:', err);
    return [];
  }
}