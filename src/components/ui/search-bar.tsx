'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar({ isMobile = false }: { isMobile?: boolean }) {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex items-center ${isMobile ? 'w-full gap-3' : 'w-48 md:w-64 gap-2'
                }`}
        >
            <input
                type="text"
                name="q"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`
          flex-1 min-w-0 border border-white/20 bg-white/10 text-white placeholder-white/50
          px-3 py-2 text-base rounded-md focus:outline-none focus:ring-2 focus:ring-white/30
          ${isMobile ? 'text-base' : 'text-sm'}
        `}
                style={{ fontSize: '16px' }}
            />
            <button
                type="submit"
                className={`
          bg-white/20 text-white font-medium transition-colors duration-200
          ${isMobile ? 'px-5 py-2 text-base' : 'px-4 py-2 text-sm'} rounded-md hover:bg-white/30
        `}
            >
                {isMobile ? 'Go' : 'Search'}
            </button>
        </form>
    );
}
