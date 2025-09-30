import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://everwellmag.com";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/api", "/private"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
