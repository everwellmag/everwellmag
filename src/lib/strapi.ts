// src/lib/strapi.ts
export async function fetchFromStrapi(endpoint: string) {
  const strapiUrl = process.env.STRAPI_URL || 'http://15.235.208.94:1337';
  const url = `${strapiUrl}/api/${endpoint}`;
  console.log('Fetching from:', url);
  const response = await fetch(url, {
    next: { revalidate: 60 },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Strapi Error:', errorText);
    throw new Error(`Failed to fetch from Strapi: ${response.statusText} - ${errorText}`);
  }
  const data = await response.json();
  console.log('Fetched data:', data); // Log dữ liệu để kiểm tra
  return data;
}