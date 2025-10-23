export interface ArticleBlock {
    __component: string;
    id: number;
    body?: string; // Nội dung Markdown
    file?: {
        url: string;
        alternativeText?: string;
        caption?: string;
    }; // Ảnh trong media block
}

export interface Article {
    id: number;
    title: string;
    description?: string; // Excerpt ngắn
    slug: string;
    blocks?: ArticleBlock[];
    image?: {
        url: string | undefined; // Chỉ string hoặc undefined
        alternativeText?: string;
        caption?: string;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
}