// app/post/[slug]/page.tsx

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface PostAttributes {
  title: string;
  slug: string;
  content: string;
  publishedAt: string;
  image: {
    data: {
      attributes: {
        url: string;
        alt?: string;
      };
    };
  };
  category: {
    data: {
      attributes: {
        title: string;
      };
    };
  };
}

interface StrapiPost {
  id: number;
  attributes: PostAttributes;
}

type Props = {
  params: {
    slug: string;
  };
};

async function getPost(slug: string): Promise<StrapiPost | null> {
  const url = `${process.env.STRAPI_API_URL}/posts?filters[slug][$eq]=${slug}&populate=*`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data[0] || null;
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu bài viết:', err);
    return null;
  }
}

async function getRelatedPosts(currentPostId: number, categoryTitle: string): Promise<StrapiPost[]> {
  if (!categoryTitle) return [];
  const url = `${process.env.STRAPI_API_URL}/posts?filters[id][$ne]=${currentPostId}&filters[category][title][$eq]=${categoryTitle}&pagination[limit]=10&sort[0]=publishedAt:desc`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data as StrapiPost[];
  } catch (err) {
    console.error('Lỗi khi lấy bài viết liên quan:', err);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Not Found', description: 'Bài viết không tồn tại' };

  const cleanDescription = post.attributes.content
    .replace(/<[^>]*>?/gm, '') // loại bỏ tag HTML
    .slice(0, 150);

  return {
    title: post.attributes.title,
    description: cleanDescription,
    openGraph: {
      title: post.attributes.title,
      description: cleanDescription,
      images: post.attributes.image?.data?.attributes?.url
        ? [
            {
              url: `${process.env.STRAPI_API_URL}${post.attributes.image.data.attributes.url}`,
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
  const post = await getPost(params.slug);
  if (!post) return notFound();

  const categoryTitle = post.attributes.category?.data?.attributes?.title || '';
  const relatedPosts = await getRelatedPosts(post.id, categoryTitle);

  return (
    <main className="pt-6 md:pt-8 px-4 md:px-6 max-w-[1080px] mx-auto">
      <article className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.attributes.title}</h1>
        <p className="text-gray-600 text-sm mb-4">
          {categoryTitle || 'Uncategorized'} | Published on {new Date(post.attributes.publishedAt).toLocaleDateString()}
        </p>
        {post.attributes.image?.data?.attributes?.url && (
          <Image
            src={`${process.env.STRAPI_API_URL}${post.attributes.image.data.attributes.url}`}
            alt={post.attributes.image.data.attributes.alt || post.attributes.title}
            width={800}
            height={600}
            className="mb-6 rounded-md w-full"
          />
        )}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.attributes.content }}
        />
      </article>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Related Articles</h2>
        <div className="flex flex-col gap-4">
          {relatedPosts.length > 0 ? (
            relatedPosts.map((relatedPost) => (
              <div key={relatedPost.id} className="bg-white p-4 rounded-lg shadow-md">
                <Link
                  href={`/post/${relatedPost.attributes.slug}`}
                  className="text-blue-600 hover:text-blue-500 text-lg font-medium block"
                >
                  {relatedPost.attributes.title}
                </Link>
                <p className="text-gray-600 text-sm">
                  {relatedPost.attributes.category?.data?.attributes?.title || 'Uncategorized'} | Published on{' '}
                  {new Date(relatedPost.attributes.publishedAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No related articles found.</p>
          )}
        </div>
      </section>
    </main>
  );
}
