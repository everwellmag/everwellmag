// src/app/robots.ts
import { MetadataRoute } from "next";
import { SITE_DOMAIN } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            // Tùy chọn: Chặn các path không muốn crawl
            // disallow: ["/admin", "/api/"],
        },
        sitemap: `${SITE_DOMAIN}/sitemap.xml`, // Dùng SITE_DOMAIN từ config.ts
    };
}