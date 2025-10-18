// C:\Users\Kathay\everwellmag\src\app\article\[slug]\page.tsx
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { fetchFromStrapi } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { ShareIcon } from '@heroicons/react/24/outline';

// Define TypeScript interfaces for the API response
interface StrapiMedia {
    data: {
        attributes: {
            url: string | Blob;
            alternativeText?: string;
            width?: number | string;
            height?: number | string;
        };
    } | null;
}

interface StrapiBlock {
    __component: string;
    id: number;
    body?: string;
    title?: string;
    file?: StrapiMedia;
    images?: {
        data: Array<{
            id: number;
            attributes: {
                url: string | Blob;
                alternativeText?: string;
                width?: number | string;
                height?: number | string;
            };
        }>;
    };
}

interface StrapiArticle {
    title?: string;
    description?: string;
    slug: string;
    cover?: {
        url: string | Blob;
        width?: number | string;
        height?: number | string;
    };
    blocks?: StrapiBlock[];
}

// Memoize fetch to avoid duplicate calls
const getArticleData = async (slug: string) => {
    try {
        const data = await fetchFromStrapi(`articles?filters[slug][$eq]=${slug}&populate=*`);
        console.log('Article data for page:', JSON.stringify(data, null, 2)); // Log để kiểm tra
        return data.data?.[0] || null;
    } catch (error) {
        console.error('Error fetching article for page:', error);
        return null;
    }
};

// Helper functions
const toStringSrc = (url: string | Blob | null): string => {
    if (!url) return '';
    if (url instanceof Blob) return URL.createObjectURL(url);
    return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
};

const toNumber = (value: string | number | undefined): number | undefined => {
    if (value === undefined) return undefined;
    const num = typeof value === 'string' ? parseInt(value, 10) : value;
    return isNaN(num) ? undefined : num;
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    try {
        const { slug } = resolvedParams;
        console.log('Slug:', slug);
        console.log('STRAPI_API_URL:', process.env.STRAPI_API_URL);

        const article = await getArticleData(slug);
        if (!article) {
            console.log('No article found for slug:', slug);
            notFound();
        }

        const { title, description, cover, blocks } = article as StrapiArticle;
        const coverImageUrl = cover?.url ? toStringSrc(cover.url) : null;

        const renderBlock = (block: StrapiBlock, index: number) => {
            const blockKey = `${block.__component}-${block.id}-${index}`;
            switch (block.__component) {
                case 'shared.rich-text':
                    const markdownBody = block.body || '';
                    return (
                        <div key={blockKey} className="prose max-w-none">
                            <ReactMarkdown
                                components={{
                                    p: ({ ...props }) => <p className="mb-4 text-[var(--foreground)]" {...props} />,
                                    h1: ({ ...props }) => <h1 className="text-3xl font-bold mb-4 text-[var(--foreground)]" {...props} />,
                                    h2: ({ ...props }) => <h2 className="text-2xl font-semibold mb-3 text-[var(--foreground)]" {...props} />,
                                    h3: ({ ...props }) => <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]" {...props} />,
                                    h4: ({ ...props }) => <h4 className="text-lg font-semibold mb-2 text-[var(--foreground)]" {...props} />,
                                    ul: ({ ...props }) => <ul className="list-disc list-inside mb-4 text-[var(--foreground)]" {...props} />,
                                    ol: ({ ...props }) => <ol className="list-decimal list-inside mb-4 text-[var(--foreground)]" {...props} />,
                                    li: ({ ...props }) => <li className="mb-2" {...props} />,
                                    blockquote: ({ ...props }) => (
                                        <blockquote
                                            className="border-l-4 pl-4 italic my-4 text-[var(--foreground)] border-[var(--foreground)]"
                                            {...props}
                                        />
                                    ),
                                    code: ({ ...props }) => (
                                        <code
                                            className="px-1 rounded bg-[var(--background)] text-[var(--foreground)]"
                                            {...props}
                                        />
                                    ),
                                    pre: ({ ...props }) => (
                                        <pre
                                            className="p-4 rounded overflow-x-auto text-sm bg-[var(--background)] text-[var(--foreground)]"
                                            {...props}
                                        />
                                    ),
                                    a: ({ ...props }) => (
                                        <a
                                            className="text-[#3B82F6] hover:underline hover:text-blue-700 font-medium"
                                            {...props}
                                        />
                                    ),
                                    strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                                    em: ({ ...props }) => <em className="italic" {...props} />,
                                    img: ({ ...props }) => {
                                        const src = props.src ? toStringSrc(props.src) : null;
                                        return src ? (
                                            <Image
                                                src={src}
                                                alt={props.alt || 'Image'}
                                                width={toNumber(props.width) || 600}
                                                height={toNumber(props.height) || 400}
                                                className="max-w-full h-auto my-4 rounded-lg"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <span className="text-[var(--foreground)]">[Image: Missing URL]</span>
                                        );
                                    },
                                }}
                            >
                                {markdownBody}
                            </ReactMarkdown>
                        </div>
                    );
                case 'shared.quote':
                    return (
                        <blockquote
                            key={blockKey}
                            className="border-l-4 pl-4 italic my-6 text-[var(--foreground)] border-[var(--foreground)]"
                        >
                            <p className="text-lg font-semibold">{block.title}</p>
                            <p className="text-[var(--foreground)]">{block.body}</p>
                        </blockquote>
                    );
                case 'shared.media':
                    const mediaUrl = block.file?.data?.attributes?.url
                        ? toStringSrc(block.file.data.attributes.url)
                        : null;
                    return mediaUrl ? (
                        <Image
                            key={blockKey}
                            src={mediaUrl}
                            alt={block.file?.data?.attributes?.alternativeText || 'Media'}
                            width={toNumber(block.file?.data?.attributes?.width) || 600}
                            height={toNumber(block.file?.data?.attributes?.height) || 400}
                            className="w-full max-w-md my-4 rounded-lg"
                            loading="lazy"
                        />
                    ) : (
                        <div key={blockKey} className="text-[var(--foreground)]">
                            [Media: Thiếu dữ liệu]
                        </div>
                    );
                case 'shared.slider':
                    const images = block.images?.data || [];
                    return images.length > 0 ? (
                        <div key={blockKey} className="my-6">
                            {images.map((img, imgIndex: number) => {
                                const imgUrl = img.attributes.url ? toStringSrc(img.attributes.url) : null;
                                return imgUrl ? (
                                    <Image
                                        key={`${img.id}-${imgIndex}`}
                                        src={imgUrl}
                                        alt={img.attributes.alternativeText || 'Slider image'}
                                        width={toNumber(img.attributes.width) || 600}
                                        height={toNumber(img.attributes.height) || 400}
                                        className="w-full max-w-md my-2 rounded-lg"
                                        loading="lazy"
                                    />
                                ) : null;
                            })}
                        </div>
                    ) : (
                        <div key={blockKey} className="text-[var(--foreground)]">
                            [Slider: Thiếu dữ liệu]
                        </div>
                    );
                default:
                    return null;
            }
        };

        const renderedBlocks = blocks?.map((block: StrapiBlock, index: number) => renderBlock(block, index)) || [];

        return (
            <main style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }} className="max-w-5xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4 text-[var(--foreground)]">
                    {title || 'Không có tiêu đề'}
                </h1>
                <p className="mb-4 text-[var(--foreground)]">
                    {description || 'Không có mô tả'}
                </p>
                {description && (
                    <div className="mb-4 prose max-w-none text-[var(--foreground)]">
                        <ReactMarkdown>{description}</ReactMarkdown>
                    </div>
                )}
                {coverImageUrl && (
                    <Image
                        src={coverImageUrl}
                        alt={title || 'Cover image'}
                        width={toNumber(cover?.width) || 1200}
                        height={toNumber(cover?.height) || 630}
                        className="w-full mb-4 rounded-lg"
                        loading="lazy"
                    />
                )}
                <div>{renderedBlocks}</div>
                <div className="mt-6 flex gap-4 flex-wrap justify-center">
                    <a
                        href={`https://x.com/intent/tweet?url=https://www.everwellmag.com/article/${slug}&text=Check out "${title || 'this article'}" on Everwell Magazine!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--background)] text-[var(--foreground)] rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <ShareIcon className="w-5 h-5 text-blue-500" />
                        Share on X
                    </a>
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=https://www.everwellmag.com/article/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--background)] text-[var(--foreground)] rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <ShareIcon className="w-5 h-5 text-blue-700" />
                        Share on Facebook
                    </a>
                    <a
                        href={`https://www.instagram.com/?url=https://www.everwellmag.com/article/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--background)] text-[var(--foreground)] rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <ShareIcon className="w-5 h-5 text-pink-500" />
                        Share on Instagram
                    </a>
                </div>
            </main>
        );
    } catch (error) {
        console.error('Error fetching article:', error);
        notFound();
    }
}