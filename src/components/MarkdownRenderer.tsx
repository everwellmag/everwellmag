'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import React from 'react';

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="prose max-w-none" style={{ color: 'var(--text-secondary)' }}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    p: ({ ...props }) => <p className="mb-4 text-base md:text-lg" style={{ color: 'var(--foreground)' }} {...props} />,
                    h1: ({ ...props }) => <h1 style={{ color: 'var(--foreground)' }} className="text-3xl font-bold mb-4" {...props} />,
                    h2: ({ ...props }) => <h2 style={{ color: 'var(--foreground)' }} className="text-2xl font-semibold mb-3" {...props} />,
                    h3: ({ ...props }) => <h3 style={{ color: 'var(--foreground)' }} className="text-xl font-semibold mb-2" {...props} />,
                    h4: ({ ...props }) => <h4 style={{ color: 'var(--foreground)' }} className="text-lg font-semibold mb-2" {...props} />,
                    h5: ({ ...props }) => <h5 style={{ color: 'var(--foreground)' }} className="text-base font-semibold mb-2" {...props} />,
                    h6: ({ ...props }) => <h6 style={{ color: 'var(--foreground)' }} className="text-sm font-semibold mb-2" {...props} />,
                    ul: ({ ...props }) => <ul style={{ color: 'var(--foreground)' }} className="list-disc list-inside mb-4" {...props} />,
                    ol: ({ ...props }) => <ol style={{ color: 'var(--foreground)' }} className="list-decimal list-inside mb-4" {...props} />,
                    li: ({ ...props }) => <li className="mb-2 text-base md:text-lg" style={{ color: 'var(--foreground)' }} {...props} />,
                    blockquote: ({ ...props }) => (
                        <blockquote
                            style={{ color: 'var(--foreground)', borderColor: 'var(--foreground)' }}
                            className="border-l-4 pl-4 italic my-4"
                            {...props}
                        />
                    ),
                    code: ({ ...props }) => (
                        <code
                            style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                            className="px-1 rounded text-base md:text-lg"
                            {...props}
                        />
                    ),
                    pre: ({ ...props }) => (
                        <pre
                            style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                            className="p-4 rounded overflow-x-auto text-base md:text-lg"
                            {...props}
                        />
                    ),
                    img: ({ src, alt }) => {
                        const normalizedSrc = typeof src === 'string' ? (src.startsWith('http') ? src : `https://cms.everwellmag.com${src}`) : '';
                        return (
                            <Image
                                src={normalizedSrc}
                                alt={alt || 'Image'}
                                width={786}
                                height={0}
                                style={{ width: '100%', maxWidth: '786px', height: 'auto' }}
                                className="w-full max-w-[786px] h-auto my-4 rounded-lg shadow-md mx-auto"
                                unoptimized
                                loading="lazy"
                            />
                        );
                    },
                    a: ({ ...props }) => (
                        <a
                            style={{ color: '#3B82F6' }}
                            className="hover:underline hover:text-blue-700 font-medium text-base md:text-lg"
                            {...props}
                        />
                    ),
                    strong: ({ ...props }) => <strong className="font-bold text-base md:text-lg" {...props} />,
                    em: ({ ...props }) => <em className="italic text-base md:text-lg" {...props} />,
                    table: ({ ...props }) => (
                        <div className="overflow-x-auto my-4">
                            <table
                                className="min-w-full border-collapse border border-gray-300"
                                style={{ color: 'var(--foreground)', borderColor: 'var(--foreground)' }}
                                {...props}
                            />
                        </div>
                    ),
                    thead: ({ ...props }) => (
                        <thead
                            className="bg-gray-100 dark:bg-gray-800"
                            style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                            {...props}
                        />
                    ),
                    tbody: ({ ...props }) => <tbody {...props} />,
                    tr: ({ ...props }) => (
                        <tr
                            className="border-b border-gray-300"
                            style={{ borderColor: 'var(--foreground)' }}
                            {...props}
                        />
                    ),
                    th: ({ ...props }) => (
                        <th
                            className="px-4 py-2 text-left font-semibold text-sm md:text-base"
                            style={{ color: 'var(--foreground)' }}
                            {...props}
                        />
                    ),
                    td: ({ ...props }) => (
                        <td
                            className="px-4 py-2 text-sm md:text-base"
                            style={{ color: 'var(--foreground)' }}
                            {...props}
                        />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}