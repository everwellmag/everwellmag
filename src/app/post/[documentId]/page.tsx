// src/app/post/[documentId]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { fetchFromStrapi } from "@/lib/strapi";

// Kiểu dữ liệu Category
interface Category {
  id: number;
  attributes: {
    name: string;
    parent?: {
      data: {
        id: number;
        attributes: { name: string };
      } | null;
    };
  };
}

// Kiểu dữ liệu Post
interface Post {
  id: number;
  documentId: string;
  title: string;
  content: string | null;
  publishedAt: string;
  category: {
    data: Category | null;
  } | null;
}

type Props = {
  params: { documentId: string };
};

// Lấy chi tiết 1 bài viết theo documentId
async function getPost(documentId: string): Promise<Post | null> {
  try {
    if (!process.env.NEXT_PUBLIC_STRAPI_API_URL) {
      throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not defined");
    }

    const data = await fetchFromStrapi(
      `posts?filters[documentId][$eq]=${documentId}&populate=category.parent`
    );

    if (!data?.data?.length) {
      return null;
    }

    const post = data.data[0] as Post;
    return post;
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu bài viết:", err);
    return null;
  }
}

// Build trước các đường dẫn động
export async function generateStaticParams(): Promise<{ documentId: string }[]> {
  try {
    if (!process.env.NEXT_PUBLIC_STRAPI_API_URL) {
      throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not defined");
    }

    const data = await fetchFromStrapi(
      "posts?pagination[limit]=100&fields=documentId"
    );

    if (!data?.data) return [];

    return data.data.map((post: { documentId: string }) => ({
      documentId: post.documentId,
    }));
  } catch (err) {
    console.error("Lỗi khi lấy danh sách documentId:", err);
    return [];
  }
}

// SEO metadata cho mỗi bài viết
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = params;
  const post = await getPost(documentId);

  if (!post) {
    return { title: "Not Found", description: "Bài viết không tồn tại" };
  }

  const cleanDescription =
    post.content?.split("\n")[0]?.slice(0, 150) || "No description available";

  return {
    title: post.title,
    description: cleanDescription,
    openGraph: {
      title: post.title,
      description: cleanDescription,
      images: [],
    },
  };
}

// Trang chi tiết bài viết
export default async function PostPage({ params }: Props) {
  const { documentId } = params;
  const post = await getPost(documentId);

  if (!post) return notFound();

  const categoryName = post.category?.data?.attributes?.name || "Uncategorized";
  const parentName =
    post.category?.data?.attributes?.parent?.data?.attributes?.name;

  return (
    <main className="pt-6 md:pt-8 px-4 md:px-6 max-w-[1080px] mx-auto">
      <article className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 text-sm mb-4">
          Published on {new Date(post.publishedAt).toLocaleDateString()} |{" "}
          {parentName ? `${categoryName} (under ${parentName})` : categoryName}
        </p>
        <div className="prose max-w-none">
          {post.content ? (
            <ReactMarkdown>{post.content}</ReactMarkdown>
          ) : (
            <p className="text-gray-500 italic">No content available.</p>
          )}
        </div>
      </article>
    </main>
  );
}
