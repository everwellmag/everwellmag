import { MetadataRoute } from "next";

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

interface StrapiResponse<T> {
    data: T[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://everwellmag.com";

    // Fetch categories
    const categoryRes = await fetch(
        "https://cms.everwellmag.com/api/categories",
        { next: { revalidate: 60 } }
    );
    const categoryJson: StrapiResponse<Category> = await categoryRes.json();

    const categoryUrls = categoryJson.data
        .filter((c) => c.slug)
        .map((c) => ({
            url: `${baseUrl}/category/${c.slug}`,
            lastModified: c.updatedAt || new Date().toISOString(),
        }));

    // Fetch articles
    const articleRes = await fetch(
        "https://cms.everwellmag.com/api/articles",
        { next: { revalidate: 60 } }
    );
    const articleJson: StrapiResponse<Article> = await articleRes.json();

    const articleUrls = articleJson.data
        .filter((a) => a.slug)
        .map((a) => ({
            url: `${baseUrl}/article/${a.slug}`,
            lastModified: a.updatedAt || new Date().toISOString(),
        }));

    return [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
        },
        ...categoryUrls,
        ...articleUrls,
    ];
}
