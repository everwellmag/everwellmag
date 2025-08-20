// lib/strapi.ts
export async function fetchFromStrapi(endpoint: string) {
    const res = await fetch(`${process.env.STRAPI_API_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 60 }, // cache 60s
    });
  
    if (!res.ok) {
      throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText}`);
    }
  
    return res.json();
  }
  