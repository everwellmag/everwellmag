import Head from 'next/head';
import Link from 'next/link';
import { sanity } from '@/lib/sanity';
import { urlFor } from '@/lib/imageUrl';
import Image from 'next/image';

// Định nghĩa interface cho Post
interface Post {
  title: string;
  slug: { current: string };
  mainImage?: { asset: { _ref: string }; alt?: string };
  body?: { _type: string; children: { _type: string; text: string }[] }[];
  publishedAt: string;
}

export const metadata = {
  title: 'EverWell Magazine - Health & Wellness Tips 2025',
  description: 'Explore top health tips, weight loss solutions, and affiliate products from ClickBank & Digistore24 at EverWell Magazine.',
};

export default async function Home() {
  // Fetch danh sách bài viết từ Sanity (3 bài mới nhất)
  const posts: Post[] = await sanity
    .fetch(
      `*[_type == "post"] | order(publishedAt desc)[0...3]{
        title,
        slug,
        mainImage,
        body,
        publishedAt
      }`
    )
    .catch((err: unknown) => {
      console.error('Sanity fetch error:', err);
      return [];
    });

  return (
    <>
      <Head>
        <meta name="keywords" content="health tips 2025, weight loss, supplements, wellness, everwellmag" />
      </Head>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        {/* Hero Section */}
        <section className="bg-blue-900 text-white py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">EverWell Magazine</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Your trusted guide to 2025 health trends, expert advice, and premium wellness products.
          </p>
        </section>



        {/* Featured Section */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
            🌿 Featured Articles & Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Link href="/weight-loss" className="text-blue-600 hover:underline text-xl font-medium block mb-2">
                Top 10 Weight Loss Tips for 2025
              </Link>
              <p className="text-gray-600">Expert advice to kickstart your journey.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Link href="/blood-sugar" className="text-blue-600 hover:underline text-xl font-medium block mb-2">
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

        {/* Latest Posts Section */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">📰 Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.slug.current} className="bg-white p-6 rounded-lg shadow-md">
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).width(300).url()}
                      alt={post.mainImage?.alt || post.title}
                      width={300}
                      height={192}
                      className="mb-4 rounded-md w-full h-48 object-cover"
                    />
                  )}
                  <Link
                    href={`/post/${post.slug.current}`}
                    className="text-blue-600 hover:text-blue-500 text-xl font-medium block mb-2"
                  >
                    {post.title}
                  </Link>
                  <p className="text-gray-600 line-clamp-3">
                    {post.body && post.body[0]?.children[0]?.text
                      ? post.body[0].children[0].text.slice(0, 100) + '...'
                      : 'No preview available.'}
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