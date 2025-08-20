"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Interface đúng với JSON Strapi của bạn
interface StrapiPost {
  id: number;
  title: string;
  slug?: string;
  content?: any;
  shortDescription?: string;
  createdAt: string;
  media?: {
    url: string;
    alternativeText?: string;
  } | null;
}

export default function HomePage() {
  const [posts, setPosts] = useState<StrapiPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts?populate=*`
        );
        const json = await res.json();
        setPosts(json.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center p-6">Đang tải...</p>;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {post.media?.url && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL!.replace(
                  "/api",
                  ""
                )}${post.media.url}`}
                alt={post.media.alternativeText || post.title}
                width={400}
                height={250}
                className="mb-4 rounded-md w-full h-48 object-cover"
              />
            )}
            <Link
              href={`/post/${post.slug || post.id}`}
              className="text-blue-600 hover:text-blue-500 text-xl font-semibold block mb-2"
            >
              {post.title}
            </Link>
            <p className="text-gray-600 line-clamp-3">
              {post.shortDescription || "Không có mô tả ngắn."}
            </p>
          </div>
        ))
      ) : (
        <p className="col-span-3 text-center text-gray-600">
          Không tìm thấy bài viết nào.
        </p>
      )}
    </main>
  );
}
