export interface Category {
    id: number;
    name: string;
    slug: string;
    type?: 'article' | 'product' | 'mixed';
    description?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    image?: {
        url: string;
        alternativeText?: string;
        caption?: string;
    };
}