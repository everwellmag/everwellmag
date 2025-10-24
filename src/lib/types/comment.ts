export interface Author {
    name: string;
    email: string | null;
}

export interface Article {
    id: number;
    documentId: string;
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Priority: number | null;
}

export interface Product {
    id: number;
    documentId: string;
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface Comment {
    id: number;
    documentId: string;
    content: string;
    author: Author;
    article: Article | null;
    product: Product | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}