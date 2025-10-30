// src/lib/types/article.ts
export interface ArticleBlock {
    __component: string;
    id: number;
    body?: string; // Markdown content
    file?: {
        url: string;
        alternativeText?: string;
        caption?: string;
    }; // Image in media block
}

export interface ArticleTag {
    id: number;
    name: string;
    slug: string;
    color?: string;
}

export interface ArticleCategory {
    id: number;
    name: string;
    slug: string;
    type: string;
}

export interface ArticleImage {
    url: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
}

export interface Article {
    id: number;
    documentId: string;
    title: string;
    description?: string;
    slug: string;
    blocks?: ArticleBlock[];
    image?: ArticleImage;
    priority?: number | null;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;

    // === TAGS & CATEGORIES ===
    tags?: ArticleTag[];
    categories: ArticleCategory[];
}