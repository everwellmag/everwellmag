import Head from 'next/head';
import { sanity } from '@/lib/sanity'; // Import Sanity client
import { urlFor } from '@/lib/imageUrl'; // Import hàm xử lý hình ảnh
import { PortableText } from '@portabletext/react'; // Import PortableText nếu cần hiển thị nội dung bài viết

export const metadata = {
  title: 'EverWell Magazine - Health & Wellness Tips 2025',
  description: 'Explore top health tips, weight loss solutions, and affiliate products from ClickBank & Digistore24 at EverWell Magazine.',
};

export default async function Home() {
  // Fetch danh sách bài viết từ Sanity (ví dụ: 3 bài mới nhất)
  const posts = await sanity
    .fetch(
      `*[_type == "post"] | order(publishedAt desc)[0...3]{
        title,
        slug,
        mainImage,
        body,
        publishedAt
      }`
    )
    .catch((err) => {
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

        {/* Navigation Menu */}
        <nav className="bg-white py-4 shadow-md sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4">
            <ul className="flex justify-center gap-8 text-lg flex-wrap">
              <li><a href="/" className="text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded transition">Home</a></li>
              <li><a href="/weight-loss" className="text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded transition">Weight Loss</a></li>
              <li><a href="/blood-sugar" className="text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded transition">Blood Sugar</a></li>
              <li><a href="/eye-health" className="text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded transition">Eye Health</a></li>
              <li><a href="/heart-health" className="text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded transition">Heart Health</a></li>
              <li><a href="/mens-health" className="text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded transition">Men's Health</a></li>
              <li><a href="/womens-health" className="text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded transition">Women's Health</a></li>
              <li><a href="/mind-sleep" className="text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded transition">Mind & Sleep</a></li>
              <li><a href="/supplements" className="text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded transition">Supplements</a></li>
              <li><a href="/about" className="text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded transition">About</a></li>
              <li><a href="/contact" className="text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded transition">Contact</a></li>
            </ul>
          </div>
        </nav>

        {/* Featured Section */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">🌿 Featured Articles & Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <a href="/weight-loss" className="text-blue-600 hover:underline text-xl font-medium block mb-2">
                Top 10 Weight Loss Tips for 2025
              </a>
              <p className="text-gray-600">Expert advice to kickstart your journey.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <a href="/blood-sugar" className="text-blue-600 hover:underline text-xl font-medium block mb-2">
                Natural Ways to Manage Blood Sugar
              </a>
              <p className="text-gray-600">Holistic solutions for better health.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <a href="/supplements" className="text-blue-600 hover:underline text-xl font-medium block mb-2">
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
              posts.map((post: any) => (
                <div key={post.slug.current} className="bg-white p-6 rounded-lg shadow-md">
                  {post.mainImage && (
                    <img
                      src={urlFor(post.mainImage).width(300).url()}
                      alt={post.title}
                      className="mb-4 rounded-md w-full h-48 object-cover"
                    />
                  )}
                  <a
                    href={`/post/${post.slug.current}`}
                    className="text-blue-600 hover:text-blue-500 text-xl font-medium block mb-2"
                  >
                    {post.title}
                  </a>
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