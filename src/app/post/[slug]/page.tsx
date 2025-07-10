import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { sanity } from '@/lib/sanity';
import { urlFor } from '@/lib/imageUrl';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';

// Định nghĩa interface cho BodyBlock (dựa trên PortableText)
interface BodyBlock {
  _type: string;
  children?: { _type: string; text: string; marks?: string[] }[];
  style?: string;
  asset?: { _ref: string };
  alt?: string;
}

// Định nghĩa interface cho Post và RelatedPost
interface Post {
  title: string;
  slug?: { current: string };
  mainImage?: { asset: { _ref: string }; alt?: string };
  body?: BodyBlock[];
  publishedAt?: string;
  category?: { title: string };
}

interface ImageValue {
  asset: { _ref: string };
  alt?: string;
}

type Props = {
  params: any; // Giữ any để tránh lỗi PageProps
};

// SEO Metadata cho bài viết
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params?.slug;
  if (!slug) return { title: 'Not Found', description: 'Bài viết không tồn tại' };

  const post: Post | null = await sanity
    .fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        body,
        mainImage,
        category->{ title }
      }`,
      { slug }
    )
    .catch((err: unknown) => {
      console.error('Sanity fetch error:', err);
      return null;
    });

  if (!post) return { title: 'Not Found', description: 'Bài viết không tồn tại' };

  const description =
    post.body && post.body[0]?.children?.[0]?.text
      ? post.body[0].children[0].text.slice(0, 150)
      : 'Bài viết từ EverWellMag';

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      images: post.mainImage
        ? [
            {
              url: urlFor(post.mainImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
  };
}

// Trang chi tiết bài viết
export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  if (!slug) return notFound();

  // Lấy dữ liệu bài viết hiện tại
  const post: Post | null = await sanity
    .fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        body,
        mainImage,
        publishedAt,
        category->{ title }
      }`,
      { slug }
    )
    .catch((err: unknown) => {
      console.error('Sanity fetch error:', err);
      return null;
    });

  if (!post) return notFound();

  // Lấy bài viết liên quan (ưu tiên cùng danh mục, bổ sung nếu thiếu)
  const relatedPostsSameCategory: Post[] = await sanity
    .fetch(
      `*[_type == "post" && category->title == $category && slug.current != $slug] | order(publishedAt desc)[0...10]{
        title,
        slug,
        publishedAt,
        category->{ title }
      }`,
      { category: post.category?.title || 'Uncategorized', slug }
    )
    .catch((err: unknown) => {
      console.error('Sanity fetch related posts (same category) error:', err);
      return [];
    });

  // Nếu không đủ 10 bài, lấy thêm từ danh mục khác
  const remainingCount = 10 - relatedPostsSameCategory.length;
  const relatedPostsOtherCategories: Post[] = remainingCount > 0
    ? await sanity
        .fetch(
          `*[_type == "post" && slug.current != $slug && !(category->title == $category)] | order(publishedAt desc)[0...${remainingCount}]{
            title,
            slug,
            publishedAt,
            category->{ title }
          }`,
          { category: post.category?.title || 'Uncategorized', slug }
        )
        .catch((err: unknown) => {
          console.error('Sanity fetch related posts (other categories) error:', err);
          return [];
        })
    : [];

  // Kết hợp danh sách bài viết liên quan
  const relatedPosts: Post[] = [...relatedPostsSameCategory, ...relatedPostsOtherCategories].slice(0, 10);

  console.log('Post data:', post);
  console.log('Related posts:', relatedPosts);

  const components = {
    types: {
      image: ({ value }: { value: ImageValue }) => (
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'image'}
          width={800}
          height={600}
          className="my-4 rounded-md"
        />
      ),
    },
  };

  return (
    <main className="pt-6 md:pt-8 px-4 md:px-6 max-w-[1080px] mx-auto">
      {/* Nội dung bài viết */}
      <article className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 text-sm mb-4">
          {post.category?.title || 'Uncategorized'} | Published on{' '}
          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Unknown date'}
        </p>
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).width(800).url()}
            alt={post.title}
            width={800}
            height={600}
            className="mb-6 rounded-md w-full"
          />
        )}
        <div className="prose max-w-none">
          <PortableText value={post.body || []} components={components} />
        </div>
      </article>

      {/* Bài viết liên quan */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Related Articles</h2>
        <div className="flex flex-col gap-4">
          {relatedPosts.length > 0 ? (
            relatedPosts.map((relatedPost) => (
              <div
                key={relatedPost.slug?.current || relatedPost.title}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <Link
                  href={`/post/${relatedPost.slug?.current || ''}`}
                  className="text-blue-600 hover:text-blue-500 text-lg font-medium block"
                >
                  {relatedPost.title}
                </Link>
                <p className="text-gray-600 text-sm">
                  {relatedPost.category?.title || 'Uncategorized'} | Published on{' '}
                  {relatedPost.publishedAt
                    ? new Date(relatedPost.publishedAt).toLocaleDateString()
                    : 'Unknown date'}
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