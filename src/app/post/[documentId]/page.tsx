// app/post/[documentId]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { fetchFromStrapi } from '@/lib/strapi';

interface PostAttributes {
  title: string;
  documentId: string;
  content: { type: string; children: { type: string; text: string }[] }[];
  publishedAt: string;
  media: { data: { attributes: { url: string; alt?: string } } } | null;
}

interface StrapiPost {
  id: number;
  attributes: PostAttributes;
}

type Props = {
  params: {
    documentId: string;
  };
};

async function getPost(documentId: string): Promise<StrapiPost | null> {
  try {
    const data = await fetchFromStrapi(`posts/${documentId}?populate=media`);
    return data.data as StrapiPost || null;
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu bài viết:', err);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.documentId);
  if (!post) return { title: 'Not Found', description: 'Bài viết không tồn tại' };

  const cleanDescription = post.attributes.content
    .find((item) => item.type === 'paragraph')
    ?.children[0]?.text.slice(0, 150) || 'No description available';

  return {
    title: post.attributes.title,
    description: cleanDescription,
    openGraph: {
      title: post.attributes.title,
      description: cleanDescription,
      images: post.attributes.media?.data?.attributes?.url
        ? [
            {
              url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${post.attributes.media.data.attributes.url}`,
              width: 1200,
              height: 630,
              alt: post.attributes.title,
            },
          ]
        : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.documentId);
  if (!post) return notFound();

  return (
    <main className="pt-6 md:pt-8 px-4 md:px-6 max-w-[1080px] mx-auto">
      <article className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.attributes.title}</h1>
        <p className="text-gray-600 text-sm mb-4">
          Published on {new Date(post.attributes.publishedAt).toLocaleDateString()}
        </p>
        {post.attributes.media?.data?.attributes?.url && (
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${post.attributes.media.data.attributes.url}`}
            alt={post.attributes.media.data.attributes.alt || post.attributes.title}
            width={800}
            height={600}
            className="mb-6 rounded-md w-full"
          />
        )}
        <div className="prose max-w-none">
          {post.attributes.content.map((block, index) => (
            block.type === 'paragraph' && (
              <p key={index}>{block.children[0]?.text}</p>
            )
          ))}
        </div>
      </article>
    </main>
  );
}