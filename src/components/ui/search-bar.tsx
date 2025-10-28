// src/components/ui/search-bar.tsx
'use client';

export default function SearchBar() {
    return (
        <form action="/search" className="flex w-full items-center">
            <input
                type="text"
                name="q"
                placeholder="Search articles or products..."
                className="flex-1 min-w-0 border border-white/20 bg-white/10 text-white placeholder-white/50 rounded-l-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
                type="submit"
                className="bg-white/20 text-white px-3 py-1.5 rounded-r-md hover:bg-white/30 transition-colors duration-200 whitespace-nowrap"
            >
                Search
            </button>
        </form>
    );
}