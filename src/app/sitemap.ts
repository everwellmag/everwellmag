// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { SITE_DOMAIN } from '@/lib/config';

interface Article {
    id: number;
    slug: string;
    updatedAt?: string;
}

interface Category {
    id: number;
    slug: string;
    updatedAt?: string;
}

interface Product {
    id: number;
    slug: string;
    updatedAt?: string;
}

interface StrapiResponse<T> {
    data: T[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch categories
    const categoryRes = await fetch('https://cms.everwellmag.com/api/categories', {
        next: { revalidate: 60 },
    });
    const categoryJson: StrapiResponse<Category> = await categoryRes.json();

    const categoryUrls = categoryJson.data
        .filter((c) => c.slug)
        .map((c) => ({
            url: `${SITE_DOMAIN}/category/${c.slug}`,
            lastModified: c.updatedAt || new Date().toISOString(),
            // Tùy chọn: Thêm priority và changefreq
            priority: 0.8,
            changefreq: 'weekly',
        }));

    // Fetch articles
    const articleRes = await fetch('https://cms.everwellmag.com/api/articles', {
        next: { revalidate: 60 },
    });
    const articleJson: StrapiResponse<Article> = await articleRes.json();

    const articleUrls = articleJson.data
        .filter((a) => a.slug)
        .map((a) => ({
            url: `${SITE_DOMAIN}/article/${a.slug}`,
            lastModified: a.updatedAt || new Date().toISOString(),
            priority: 0.9, // Bài viết quan trọng hơn
            changefreq: 'daily',
        }));

    // Fetch products
    const productRes = await fetch('https://cms.everwellmag.com/api/products', {
        next: { revalidate: 60 },
    });
    const productJson: StrapiResponse<Product> = await productRes.json();

    const productUrls = productJson.data
        .filter((p) => p.slug)
        .map((p) => ({
            url: `${SITE_DOMAIN}/product/${p.slug}`,
            lastModified: p.updatedAt || new Date().toISOString(),
            priority: 0.7,
            changefreq: 'weekly',
        }));

    return [
        {
            url: SITE_DOMAIN,
            lastModified: new Date().toISOString(),
            priority: 1.0,
            changefreq: 'daily',
        },
        ...categoryUrls,
        ...articleUrls,
        ...productUrls,
    ];
}