// src/lib/strapi.ts
export async function fetchFromStrapi(endpoint: string) {
  try {
    console.log('Fetching from:', `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/${endpoint}`);
    if (!process.env.NEXT_PUBLIC_STRAPI_API_URL) {
      throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined');
    }
    if (!process.env.STRAPI_API_TOKEN) {
      throw new Error('STRAPI_API_TOKEN is not defined');
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch from Strapi: ${response.statusText} (Status: ${response.status}, Response: ${errorText})`);
    }

    const data = await response.json();
    console.log('API response:', JSON.stringify(data, null, 2)); // In dữ liệu chi tiết
    return data;
  } catch (err) {
    console.error(`Error fetching from Strapi (${endpoint}):`, err);
    throw err;
  }
}