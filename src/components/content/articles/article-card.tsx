"use client";

import type { Article } from '@/lib/types/article';
import Link from 'next/link';
import Image from 'next/image';
import { CMS_DOMAIN, DEFAULT_OG_IMAGE } from '@/lib/config';

// Get the first image URL from blocks.body
const getFirstImageFromBlocks = (blocks: Article['blocks']): string | null => {
    for (const block of blocks || []) {
        if (block.__component === 'shared.rich-text' && block.body) {
            const regex = /!\[.*?\]\((.*?)\)/g;
            const matches = block.body.match(regex);
            if (matches) {
                const url = matches[0].replace(/!\[.*?\]\((.*?)\)/, '$1');
                return url.startsWith('http') ? url : `${CMS_DOMAIN}${url}`;
            }
        }
    }
    return null;
};

// Normalize image URL
const normalizeImageUrl = (url?: string): string | null => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${CMS_DOMAIN}${url}`;
};

interface ArticleCardProps {
    article: Article;
    category: string;
    subcategory: string;
}

export default function ArticleCard({
    article,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    category,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    subcategory,
}: ArticleCardProps) {
    const title = article.title || 'Untitled';
    const slug = article.slug || '';
    const description = article.description || '';
    const excerpt = description.length > 100 ? description.slice(0, 100) + '...' : description;

    const imageUrl =
        normalizeImageUrl(article.image?.url) ||
        getFirstImageFromBlocks(article.blocks) ||
        DEFAULT_OG_IMAGE;

    const articleUrl = `/article/${slug}`;

    return (
        <Link href={articleUrl} className="block">
            <div
                className="group bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-[var(--card-bg-dark)] flex h-40 cursor-pointer"
            // ↑ h-40 (160px) + cursor-pointer
            >
                {/* Left: Image */}
                <div className="relative w-1/2 h-full overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Right: Content */}
                <div className="w-1/2 p-4 flex flex-col justify-start">
                    <div>
                        <h2
                            className="text-lg font-bold text-[var(--foreground)] font-[var(--font-sans)] line-clamp-3 group-hover:text-[var(--link-hover)] transition-colors"
                        >
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