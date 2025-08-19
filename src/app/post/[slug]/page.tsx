// app/post/page.tsx

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Định nghĩa kiểu dữ liệu cho bài viết từ Strapi
interface PostAttributes {
  title: string;
  slug: string;
  content: string; // Nội dung bài viết thường ở dạng HTML/Markdown
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

// Hàm lấy dữ liệu bài viết từ Strapi
async function getPost(slug: string): Promise<StrapiPost | null> {
  const url = `${process.env.STRAPI_API_URL}/posts?filters[slug][$eq]=${slug}&populate=*`;
  try {
    const res = await fetch(url, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(`Error fetching post: ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    return data.data[0] || null;
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu bài viết:', err);
    return null;
  }
}

// Hàm lấy bài viết liên quan từ Strapi
async function getRelatedPosts(currentPostId: number, categoryTitle: string): Promise<StrapiPost[]> {
  const url = `${process.env.STRAPI_API_URL}/posts?filters[id][$ne]=${currentPostId}&filters[category][title][$eq]=${categoryTitle}&pagination[limit]=10&sort[0]=publishedAt:desc`;
  try {
    const res = await fetch(url, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(`Error fetching related posts: ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return data.data as StrapiPost[];
  } catch (err) {
    console.error('Lỗi khi lấy bài viết liên quan:', err);
    return [];
  }
}

// SEO Metadata cho bài viết
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Not Found', description: 'Bài viết không tồn tại' };

  // Khởi tạo JSDOM trên server
  const window = new JSDOM('').window;
  const purify = DOMPurify(window as unknown as Window);
  const cleanDescription = purify.sanitize(post.attributes.content.slice(0, 150), { USE_PROFILES: { html: true } });

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

// Trang chi tiết bài viết
export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) {
    return notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id, post.attributes.category.data.attributes.title);

  // Khởi tạo JSDOM trên server và dọn dẹp HTML
  const window = new JSDOM('').window;
  const purify = DOMPurify(window as unknown as Window);
  const cleanContent = purify.sanitize(post.attributes.content);

  return (
    <main className="pt-6 md:pt-8 px-4 md:px-6 max-w-[1080px] mx-auto">
      {/* Nội dung bài viết */}
      <article className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.attributes.title}</h1>
        <p className="text-gray-600 text-sm mb-4">
          {post.attributes.category?.data?.attributes?.title || 'Uncategorized'} | Published on{' '}
          {new Date(post.attributes.publishedAt).toLocaleDateString()}
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
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: cleanContent }} />
      </article>

      {/* Bài viết liên quan */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Related Articles</h2>
        <div className="flex flex-col gap-4">
          {relatedPosts.length > 0 ? (
            relatedPosts.map((relatedPost) => (
              <div
                key={relatedPost.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
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