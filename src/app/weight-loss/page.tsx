// src/app/weight-loss/page.tsx
import Link from "next/link";
import { fetchFromStrapi } from "@/lib/strapi";

interface Category {
  id: number;
  attributes: {
    name: string;
    parent?: { data: { id: number; attributes: { name: string } } } | null;
  };
}

interface Post {
  id: number;
  documentId: string;
  title: string;
  content: string | null;
  createdAt: string;
  categories?: { data: Category[] };
}

async function getPostsByWeightLossCategory(): Promise<Post[]> {
  try {
    // Query chính: Lấy bài viết thuộc "Weight Loss" hoặc category con của nó
    const query = `posts?filters[$or][0][categories][name][$eq]=Weight Loss&filters[$or][1][categories][parent][name][$eq]=Weight Loss&populate[categories][populate]=parent&pagination[limit]=10&sort[0]=createdAt:desc`;

    console.log("🚀 Fetching posts with query:", query);

    const data = await fetchFromStrapi(query);

    console.log("✅ Raw API response:", JSON.stringify(data, null, 2));

    if (data && data.data && data.data.length > 0) {
      return data.data as Post[];
    }

    // Nếu không có bài viết nào -> fallback query: lấy tất cả bài có category
    console.warn("⚠️ Không tìm thấy bài viết Weight Loss. Thử fallback query...");
    const fallback = await fetchFromStrapi(
      `posts?populate[categories][populate]=parent&pagination[limit]=10&sort[0]=createdAt:desc`
    );
    console.log("📦 Fallback API response:", JSON.stringify(fallback, null, 2));

    return (fallback?.data as Post[]) || [];
  } catch (err) {
    console.error("🔥 Lỗi khi lấy bài viết cho Weight Loss:", err);
    return [];
  }
}

export default async function WeightLossPage() {
  const posts: Post[] = await getPostsByWeightLossCategory();

  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-600 pt-6">
        No articles found in Weight Loss category.
      </p>
    );
  }

  return (
    <main className="pt-6 md:pt-8 px-4 md:px-6 max-w-[1080px] mx-auto">
      <h1 className="text-3xl font-bold mb-6">Weight Loss Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post: Post) => {
          const categoryName =
            post.categories?.data?.[0]?.attributes?.name || "Uncategorized";

          return (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Link
                href={`/post/${post.documentId}`}
                className="text-blue-600 hover:text-blue-500 text-xl font-medium block mb-2"
              >
                {post.title}
              </Link>
              <p className="text-gray-600 text-sm">{categoryName}</p>
              <p className="text-gray-600 line-clamp-3">
                {post.content
                  ? post.content.split("\n")[0]?.slice(0, 100) + "..."
                  : "No preview available..."}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
