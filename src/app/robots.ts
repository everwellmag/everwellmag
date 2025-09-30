import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",           // cho crawl toàn bộ site
                disallow: ["/admin", "/api"], // chặn mấy route nhạy cảm
            },
        ],
        sitemap: "https://www.everwellmag.com/sitemap.xml", // link sitemap
    };
}
