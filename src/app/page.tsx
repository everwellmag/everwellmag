// src/app/page.tsx
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { fetchFromStrapi } from '@/lib/strapi';

interface Post {
  id: number;
  documentId: string;
  title: string;
  content: { type: string; children: { type: string; text: string }[] }[];
  createdAt: string;
  media: { data: { attributes: { url: string; alt?: string } } } | null;
}

export const metadata = {
  title: 'EverWell Magazine - Health & Wellness Tips 2025',
  description:
    'Explore top health tips, weight loss solutions, and affiliate products from ClickBank & Digistore24 at EverWell Magazine.',
};

const getShortDescription = (content: any[]) => {
  const firstParagraph = content.find((item) => item.type === 'paragraph');
  return firstParagraph?.children[0]?.text.slice(0, 100) + '...' || 'No preview available.';
};

async function getPosts() {
  try {
    const data = await fetchFromStrapi(
      'posts?populate=media&pagination[limit]=3&sort[0]=createdAt:desc'
    );
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

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="health tips 2025, weight loss, supplements, wellness, everwellmag"
        />
      </Head>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <section className="bg-blue-900 text-white py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">EverWell Magazine</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Your trusted guide to 2025 health trends, expert advice, and premium wellness products.
          </p>
        </section>
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
            🌿 Featured Articles & Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Link
                href="/weight-loss"
                className="text-blue-600 hover:underline text-xl font-medium block mb-2"
              >
                Top 10 Weight Loss Tips for 2025
              </Link>
              <p className="text-gray-600">Expert advice to kickstart your journey.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Link
                href="/blood-sugar"
                className="text-blue-600 hover:underline text-xl font-medium block mb-2"
              >
                Natural Ways to Manage Blood Sugar
              </Link>
              <p className="text-gray-600">Holistic solutions for better health.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <a
                href="https://www.clickbank.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xl font-medium block mb-2"
              >
                Best Supplements from ClickBank
              </a>
              <p className="text-gray-600">Discover top-rated products.</p>
            </div>
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
            📰 Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                  {post.media?.data?.attributes?.url && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${post.media.data.attributes.url}`}
                      alt={post.media.data.attributes.alt || post.title}
                      width={300}
                      height={192}
                      className="mb-4 rounded-md w-full h-48 object-cover"
                    />
                  )}
                  <Link
                    href={`/post/${post.documentId}`}
                    className="text-blue-600 hover:text-blue-500 text-xl font-medium block mb-2"
                  >
                    {post.title}
                  </Link>
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