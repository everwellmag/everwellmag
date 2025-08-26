// src/app/post/[documentId]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { fetchFromStrapi } from '@/lib/strapi';

interface Post {
  id: number;
  documentId: string;
  title: string;
  content: string | null;
  publishedAt: string;
  category: { data: { id: number; attributes: { name: string; parent?: { data: { id: number; attributes: { name: string } } } | null } } } | null;
}

type Props = {
  params: Promise<{ documentId: string }>;
};

async function getPost(documentId: string): Promise<Post | null> {
  try {
    if (!process.env.NEXT_PUBLIC_STRAPI_API_URL) {
      throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined');
    }
    const data = await fetchFromStrapi(`posts?filters[documentId][$eq]=${documentId}&populate=category`);
    if (!data || !data.data || data.data.length === 0) {
      console.error(`No post found for documentId: ${documentId}`);
      return null;
    }
    const post = data.data[0] as Post;
    if (!post.title) {
      console.error(`Invalid post data for documentId: ${documentId}`, post);
      return null;
    }
    return post;
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu bài viết:', err);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    if (!process.env.NEXT_PUBLIC_STRAPI_API_URL) {
      throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined');
    }
    const data = await fetchFromStrapi('posts?pagination[limit]=100&populate=category');
    if (!data || !data.data) {
      console.error('No posts found in generateStaticParams');
      return [];
    }
    return data.data.map((post: Post) => ({
      documentId: post.documentId,
    }));
  } catch (err) {
    console.error('Lỗi khi lấy danh sách documentId:', err);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params;
  const post = await getPost(documentId);
  if (!post) {
    return { title: 'Not Found', description: 'Bài viết không tồn tại' };
  }

  const cleanDescription = post.content?.split('\n')[0]?.slice(0, 150) || 'No description available';

  return {
    title: post.title,
    description: cleanDescription,
    openGraph: {
      title: post.title,
      description: cleanDescription,
      images: [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { documentId } = await params;
  const post = await getPost(documentId);
  if (!post) {
    return notFound();
  }

  const categoryName = post.category?.data?.attributes?.name || 'Uncategorized';
  const parentName = post.category?.data?.attributes?.parent?.data?.attributes?.name;

  return (
    <main className="pt-6 md:pt-8 px-4 md:px-6 max-w-[1080px] mx-auto">
      <article className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 text-sm mb-4">
          Published on {new Date(post.publishedAt).toLocaleDateString()} |{' '}
          {parentName ? `${categoryName} (under ${parentName})` : categoryName}
        </p>
        <div className="prose max-w-none">
          {post.content ? (
            <ReactMarkdown>{post.content}</ReactMarkdown>
          ) : (
            <p className="text-gray-500 italic">No content available.</p>
          )}
        </div>
      </article>
    </main>
  );
}