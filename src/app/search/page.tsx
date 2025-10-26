// src/app/search/page.tsx
import { notFound } from 'next/navigation';
import SearchResults from '@/components/content/search-results';
import { generateSiteMetadata } from '@/lib/seo/generate-site-metadata';

export const metadata = generateSiteMetadata({
    title: 'Search - Everwell',
    description: 'Search for articles and products on Everwell Magazine.',
});

interface SearchPageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>; // Sửa type cho searchParams
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams; // Await Promise để lấy object
    const q = (params.q as string) || ''; // Ép kiểu an toàn
    const page = parseInt((params.page as string) || '1', 10);

    if (!q) {
        notFound();
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Search Results for: &quot;{q}&quot;</h1>
            <SearchResults q={q} page={page} />
        </main>
    );
}