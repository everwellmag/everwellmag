'use client';
import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalItems: number; // Đổi từ totalComments thành totalItems
    pageSize: number;
    baseUrl: string;
}

export default function Pagination({ currentPage, totalItems, pageSize, baseUrl }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalPages <= 1) return null;

    return (
        <nav className="flex justify-center items-center gap-2 mt-6">
            {/* Previous Button */}
            <Link
                href={`${baseUrl}?page=${currentPage - 1}`}
                className={`px-3 py-1 rounded border border-[var(--border-color)] text-sm font-medium ${currentPage === 1
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-[var(--placeholder-bg)]'
                    }`}
                style={{ color: 'var(--foreground)' }}
                aria-disabled={currentPage === 1}
            >
                Previous
            </Link>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                    key={page}
                    href={`${baseUrl}?page=${page}`}
                    className={`px-3 py-1 rounded border border-[var(--border-color)] text-sm font-medium ${page === currentPage
                            ? 'bg-[var(--placeholder-bg)] text-[var(--foreground)]'
                            : 'hover:bg-[var(--placeholder-bg)]'
                        }`}
                    style={{ color: 'var(--foreground)' }}
                >
                    {page}
                </Link>
            ))}

            {/* Next Button */}
            <Link
                href={`${baseUrl}?page=${currentPage + 1}`}
                className={`px-3 py-1 rounded border border-[var(--border-color)] text-sm font-medium ${currentPage === totalPages
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-[var(--placeholder-bg)]'
                    }`}
                style={{ color: 'var(--foreground)' }}
                aria-disabled={currentPage === totalPages}
            >
                Next
            </Link>
        </nav>
    );
}