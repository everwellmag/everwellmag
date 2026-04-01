import { MetadataRoute } from "next";
import { STRAPI_API_URL } from "@/lib/utils/constants";
import { SITE_DOMAIN } from "@/lib/config";

interface Article {
  id: number;
  slug: string;
  updatedAt?: string;
}

interface Category {
  id: number;
  slug: string;
  name: string;
  type: string;
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
  const baseUrl = SITE_DOMAIN;

  // =========================
  // FETCH CATEGORIES
  // =========================
  const categoryRes = await fetch(`${STRAPI_API_URL}/categories`, {
    next: { revalidate: 60 },
  });
  const categoryJson: StrapiResponse<Category> = await categoryRes.json();

  const categories = categoryJson.data;

  // =========================
  // BUILD CATEGORY URL (AUTO CHA - CON)
  // =========================
  const categoryUrls = categories
    .filter((c) => c.slug)
    .map((c) => {
      // 👉 nếu là CHA
      if (c.type === "mixed") {
        return {
          url: `${baseUrl}/${c.slug}`,
          lastModified: c.updatedAt || new Date().toISOString(),
        };
      }

      // 👉 nếu là CON → tìm CHA bằng name
      const parent = categories.find(
        (p) =>
          p.type === "mixed" &&
          c.name.toLowerCase().includes(p.name.toLowerCase())
      );

      const parentSlug = parent?.slug;

      const url = parentSlug
        ? `${baseUrl}/${parentSlug}/${c.slug}`
        : `${baseUrl}/${c.slug}`;

      return {
        url,
        lastModified: c.updatedAt || new Date().toISOString(),
      };
    });

  // =========================
  // FETCH ARTICLES
  // =========================
  const articleRes = await fetch(`${STRAPI_API_URL}/articles`, {
    next: { revalidate: 60 },
  });
  const articleJson: StrapiResponse<Article> = await articleRes.json();

  const articleUrls = articleJson.data
    .filter((a) => a.slug)
    .map((a) => ({
      url: `${baseUrl}/article/${a.slug}`,
      lastModified: a.updatedAt || new Date().toISOString(),
    }));

  // =========================
  // FETCH PRODUCTS
  // =========================
  const productRes = await fetch(`${STRAPI_API_URL}/products`, {
    next: { revalidate: 60 },
  });
  const productJson: StrapiResponse<Product> = await productRes.json();

  const productUrls = productJson.data
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${baseUrl}/product/${p.slug}`,
      lastModified: p.updatedAt || new Date().toISOString(),
    }));

  // =========================
  // FINAL SITEMAP
  // =========================
  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    ...categoryUrls,
    ...articleUrls,
    ...productUrls,
  ];
}
