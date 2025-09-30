import { MetadataRoute } from "next";

const SITE_URL = "https://www.everwellmag.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const res = await fetch("https://cms.everwellmag.com/api/articles?pagination[pageSize]=100", {
        // cache: "no-store", // bật nếu muốn luôn lấy mới
    });
    const json = await res.json();

    const articles = (json?.data || []).map((article: any) => ({
        url: `${SITE_URL}/article/${article.slug}`,
        lastModified: article.updatedAt || article.publishedAt,
    }));

    return [
        {
            url: SITE_URL,
            lastModified: new Date().toISOString(),
        },
        ...articles,
    ];
}
