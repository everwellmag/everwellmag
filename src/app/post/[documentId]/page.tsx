// src/app/post/[documentId]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { fetchFromStrapi } from '@/lib/strapi';

interface Post {
  id: number;
  documentId: string;
  title: string;
  content: { type: string; children: { type: string; text: string }[] }[];
  publishedAt: string;
  media: { data: { attributes: { url: string; alt?: string } } } | null;
}

type Props = {
  params: Promise<{ documentId: string }>;
};

async function getPost(documentId: string): Promise<Post | null> {
  try {
    if (!process.env.NEXT_PUBLIC_STRAPI_API_URL) {
      throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined');
    }
    const data = await fetchFromStrapi(`posts?filters[documentId][$eq]=${documentId}&populate=media`);
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
    const data = await fetchFromStrapi('posts?pagination[limit]=100');
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

  const cleanDescription = post.content
    .find((item) => item.type === 'paragraph')
    ?.children[0]?.text.slice(0, 150) || 'No description available';

  return {
    title: post.title,
    description: cleanDescription,
    openGraph: {
      title: post.title,
      description: cleanDescription,
      images: post.media?.data?.attributes?.url
        ? [
            {
              url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${post.media.data.attributes.url}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { documentId } = await params;
  const post = await getPost(documentId);
  if (!post) {
    return notFound();
  }

  return (
    <main className="pt-6 md:pt-8 px-4 md:px-6 max-w-[1080px] mx-auto">
      <article className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 text-sm mb-4">
          Published on {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        {post.media?.data?.attributes?.url && (
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${post.media.data.attributes.url}`}
            alt={post.media.data.attributes.alt || post.title}
            width={800}
            height={600}
            className="mb-6 rounded-md w-full"
          />
        )}
        <div className="prose max-w-none">
          {post.content.map((block, index) => (
            block.type === 'paragraph' && (
              <p key={index}>{block.children[0]?.text || ''}</p>
            )
          ))}
        </div>
      </article>
    </main>
  );
}