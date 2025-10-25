import type { Article } from '@/lib/types/article';
import { CustomMarkdown } from '@/components/common/markdown-renderer';
import Image from 'next/image';
import TableOfContents from './TableOfContents';

// Normalize image URL
const normalizeImageUrl = (url?: string): string | null => {
    if (!url) return null;
    return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
};

interface ArticleContentProps {
    blocks: Article['blocks'];
}

export default function ArticleContent({ blocks }: ArticleContentProps) {
    return (
        <div className="max-w-3xl mx-auto">
            {/* Table of Contents */}
            <TableOfContents blocks={blocks} />
            {/* Article Content */}
            <div className="prose max-w-3xl mx-auto prose-headings:text-[var(--foreground)] prose-p:text-[var(--text-secondary)] prose-a:text-[var(--link-color)] prose-a:hover:text-[var(--link-hover)] prose-code:bg-[var(--placeholder-bg)] prose-pre:bg-[var(--placeholder-bg)] prose-blockquote:border-[var(--border-color)] prose-table:border-[var(--border-color)] dark:prose-invert">
                {blocks && blocks.length > 0 ? (
                    blocks.map((block, index) => (
                        <div key={index} className="mb-6">
                            {block.__component === 'shared.rich-text' && block.body ? (
                                <CustomMarkdown content={block.body} />
                            ) : block.__component === 'shared.media' && block.file?.url ? (
                                <Image
                                    src={normalizeImageUrl(block.file.url) || 'https://cms.everwellmag.com/Uploads/default-image.jpg'}
                                    alt={block.file.alternativeText || 'Article media'}
                                    width={800}
                                    height={600}
                                    className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            ) : (
                                <p className="text-[var(--text-secondary)]">No content in this block.</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-[var(--text-secondary)] text-center">No content available.</p>
                )}
            </div>
        </div>
    );
}