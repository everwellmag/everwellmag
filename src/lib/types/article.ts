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

export interface Article {
    id: number;
    documentId: string;
    title: string;
    description?: string; // Short excerpt
    slug: string;
    blocks?: ArticleBlock[];
    image?: {
        url: string;
        alternativeText?: string;
        caption?: string;
    };
    priority?: number | null;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;

    categories: {
        id: number;
        name: string;
        slug: string;
        type: string;
    }[];
}