// src/app/category/[slug]/page.tsx
import Link from "next/link";
import { fetchFromStrapi } from "@/lib/strapi";

type StrapiCategory = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    posts?: {
      data: {
        id: number;
        attributes: {
          title: string;
          slug: string;
          createdAt: string;
          thumbnail?: { data?: { attributes: { url: string } } };
        };
      }[];
    };
  };
};

export async function generateStaticParams() {
  const res = await fetchFromStrapi("api/categories?pagination[limit]=100&fields=slug");
  return res?.data?.map((c: any) => ({ slug: c.attributes.slug })) || [];
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const res = await fetchFromStrapi(
    `api/categories?filters[slug][$eq]=${params.slug}&populate[posts][populate]=thumbnail`
  );

  if (!res?.data?.length) return <main className="p-6">Category not found.</main>;

  const category: StrapiCategory = res.data[0];
  const posts = category.attributes.posts?.data || [];

  // Debug dữ liệu
  console.log('Category data:', category);
  console.log('Posts in category:', posts);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{category.attributes.name || 'Untitled Category'}</h1>

      {posts.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((p) => {
            const a = p.attributes;
            const thumb = a.thumbnail?.data?.attributes?.url;
            const postSlug = a.slug || a.id.toString(); // Fallback nếu slug null

            return (
              <article key={p.id} className="bg-white p-4 rounded shadow-sm flex gap-4">
                {thumb && (
                  <div className="w-36 h-24 flex-shrink-0">
                    <img
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${thumb}`}
                      alt={a.title}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => { e.currentTarget.src = '/placeholder.jpg'; }} // Fallback image
                    />
                  </div>
                )}
                <div>
                  <Link href={`/post/${postSlug}`} className="text-lg font-semibold text-blue-600 hover:underline">
                    {a.title || `Post #${p.id}`}
                  </Link>
                  <p className="text-xs text-gray-500 mt-2">{new Date(a.createdAt).toLocaleDateString()}</p>
                </div>
              </article>
            );
          })}
        </div>
     