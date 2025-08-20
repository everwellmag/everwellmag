// src/lib/strapi.ts
export async function fetchFromStrapi(endpoint: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'no-store',
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
    }
  
    return await response.json();
  }