import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://everwellmag.com";

    // ---- Categories ----
    const catRes = await fetch("https://cms.everwellmag.com/api/categories");
    const catJson = await catRes.json();

    const categoryUrls = catJson.data.map((c: { slug: string; updatedAt: string }) => ({
        url: `${baseUrl}/category/${c.slug}`,
        lastModified: new Date(c.updatedAt).toISOString(),
    }));

    // ---- Articles ----
    const artRes = await fetch("https://cms.everwellmag.com/api/articles");
    const artJson = await artRes.json();

    const articleUrls = artJson.data.map(
        (a: { attributes: { slug: string; updatedAt: string } }) => ({
            url: `${baseUrl}/article/${a.attributes.slug}`,
            lastModified: new Date(a.attributes.updatedAt).toISOString(),
        })
    );

    // ---- Static pages ----
    const staticUrls = [
        { url: `${baseUrl}/about`, lastModified: new Date().toISOString() },
        { url: `${baseUrl}/contact`, lastModified: new Date().toISOString() },
        { url: `${baseUrl}/privacy-policy`, lastModified: new Date().toISOString() },
    ];

    return [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
        },
        ...staticUrls,
        ...categoryUrls,
        ...articleUrls,
    ];
}
