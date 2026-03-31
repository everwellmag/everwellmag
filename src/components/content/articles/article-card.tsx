"use client";

import type { Article } from "@/lib/types/article";
import Link from "next/link";
import Image from "next/image";
import { CMS_DOMAIN, DEFAULT_OG_IMAGE } from "@/lib/config";

const getFirstImageFromBlocks = (blocks: Article["blocks"]): string | null => {
  for (const block of blocks || []) {
    if (block.__component === "shared.rich-text" && block.body) {
      const regex = /!\[.*?\]\((.*?)\)/g;
      const matches = block.body.match(regex);
      if (matches?.length) {
        const url = matches[0].replace(/!\[.*?\]\((.*?)\)/, "$1");
        return url.startsWith("http") ? url : `${CMS_DOMAIN}${url}`;
      }
    }
  }
  return null;
};

const normalizeImageUrl = (url?: string): string | null => {
  if (!url) return null;
  return url.startsWith("http") ? url : `${CMS_DOMAIN}${url}`;
};

interface ArticleCardProps {
  article: Article;
  category: string;
  subcategory: string;
}

export default function ArticleCard({
  article,
  category,
  subcategory,
}: ArticleCardProps) {
  const title = article.title || "Untitled";
  const slug = article.slug || "";
  const description = article.description || "";
  const excerpt =
    description.length > 95 ? description.slice(0, 95) + "..." : description;

  const imageUrl =
    normalizeImageUrl(article.image?.url) ||
    getFirstImageFromBlocks(article.blocks) ||
    DEFAULT_OG_IMAGE;

  const articleUrl = `/article/${slug}`;

  return (
    <Link href={articleUrl} className="block group">
      <div className="group bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-[var(--card-bg-dark)] flex h-40 cursor-pointer">
        {/* Image - 2 phần (40%) */}
        <div className="relative w-2/5 h-full overflow-hidden flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 40vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content - 3 phần (60%) */}
        <div className="w-3/5 p-4 flex flex-col justify-start">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[var(--foreground)] font-[var(--font-sans)] leading-tight line-clamp-3 group-hover:text-[var(--link-hover)] transition-colors">
              {title}
            </h2>
            <p className="text-[var(--text-secondary)] mt-2 text-sm font-[var(--font-sans)] line-clamp-2">
              {excerpt}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
