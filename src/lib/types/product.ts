export interface Pricemulti {
    quantity: number;
    price: number;
    currency: string;
}

export interface Product {
    id: number;
    documentId: string;
    Name: string; // Tiêu đề sản phẩm (không phải title)
    Description: string; // Mô tả dài với Markdown
    slug: string;
    Supplier?: string;
    ReleaseYear?: string;
    AffiliateLink?: string;
    rating?: number;
    Pricemulti?: Pricemulti[];
    Priority?: number | null;
    Image?: {
        id?: number;
        name?: string;
        alternativeText?: string;
        caption?: string;
        width?: number;
        height?: number;
        formats?: {
            thumbnail?: {
                url: string;
                width: number;
                height: number;
            };
            medium?: {
                url: string;
                width: number;
                height: number;
            };
            small?: {
                url: string;
                width: number;
                height: number;
            };
        };
        hash?: string;
        ext?: string;
        mime?: string;
        url: string; // Relative path, e.g., "/uploads/..."
    };
    categories: {
        id: number;
        name: string;
        slug: string;
        type: string;
    }[];
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
}