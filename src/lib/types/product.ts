// src/lib/types/product.ts
export interface Pricemulti {
    quantity: number;
    price: number;
    currency: string;
}

export interface ProductTag {
    id: number;
    name: string;
    slug: string;
    color?: string;
}

export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
    type: string;
}

export interface ProductImage {
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
}

export interface Product {
    id: number;
    documentId: string;
    Name: string;
    Description: string;
    metaDescription?: string;
    slug: string;
    supplier?: string;
    ReleaseYear?: string;
    AffiliateLink?: string;
    rating?: number;
    Pricemulti?: Pricemulti[];
    priority?: number | null;
    image?: ProductImage;
    tags?: ProductTag[];           // THÊM DÒNG NÀY
    categories: ProductCategory[];
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
}