import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { fetchFromStrapi } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next'; // Sử dụng kiểu chính thức

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

// Helper functions (unchanged)
const toStringSrc = (url: string | Blob | null): string => {
    if (!url) return '';
    if (url instanceof Blob) return URL.createObjectURL(url);
    return url;
};

const toNumber = (value: string | number | undefined): number | undefined => {
    if (value === undefined) return undefined;
    const num = typeof value === 'string' ? parseInt(value, 10) : value;
    return isNaN(num) ? undefined : num;
};

const isUrlWithPath = (url: string | Blob, path: string): boolean => {
    if (typeof url === 'string') return url.startsWith(path);
    return false;
};

export async function generateMetadata(
    { params }: { params: { slug: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    try {
        const data = await fetchFromStrapi(`articles?filters[slug][$eq]=${params.slug}&populate=*`);
        const article: StrapiArticle = data.data?.[0];
        const baseUrl = process.env.STRAPI_API_URL || 'https://cms.everwellmag.com';
        const coverImageUrl = article?.cover?.url
            ? toStringSrc(
                `${baseUrl}${isUrlWithPath(article.cover.url, '/uploads') ? article.cover.url : `/uploads${article.cover.url}`}`
            )
            : null;

        return {
            title: article?.title || 'Everwell Magazine - Article',
            description:
                article?.description ||
                `Read more about ${article?.title || 'this article'} on Everwell Magazine. Discover expert insights and tips.`,
            robots: { index: true, follow: true },
            openGraph: {
                title: article?.title || 'Everwell Magazine - Article',
                description:
                    article?.description ||
                    `Read more about ${article?.title || 'this article'} on Everwell Magazine.`,
                images: [coverImageUrl || `${baseUrl}/uploads/default-image.jpg`],
                url: `https://www.everwellmag.com/article/${params.slug}`,
                type: 'article',
            },
            alternates: {
                canonical: `https://www.everwellmag.com/article/${params.slug}`,
            },
        };
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return {
            title: 'Everwell Magazine - Article',
            description: 'Discover expert insights and tips on Everwell Magazine.',
            robots: { index: true, follow: true },
            openGraph: {
                title: 'Everwell Magazine - Article',
                description: 'Discover expert insights and tips on Everwell Magazine.',
                images: [`${process.env.STRAPI_API_URL || 'https://cms.everwellmag.com'}/uploads/default-image.jpg`],
                url: `https://www.everwellmag.com/article/${params.slug}`,
                type: 'article',
            },
            alternates: {
                canonical: `https://www.everwellmag.com/article/${params.slug}`,
            },
        };
    }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        console.log('Slug:', slug);
        console.log('STRAPI_API_URL:', process.env.STRAPI_API_URL);

        const data = await fetchFromStrapi(`articles?filters[slug][$eq]=${slug}&populate=*`);
        console.log('API Data:', JSON.stringify(data, null, 2));

        const article: StrapiArticle = data.data?.[0];
        if (!article) {
            console.log('No article found for slug:', slug);
            notFound();
        }

        const { title, description, cover, blocks } = article;
        const baseUrl = process.env.STRAPI_API_URL || 'https://cms.everwellmag.com';
        const coverImageUrl = cover?.url
            ? toStringSrc(
                `${baseUrl}${isUrlWithPath(cover.url, '/uploads') ? cover.url : `/uploads${cover.url}`}`
            )
            : null;

        const renderBlock = (block: StrapiBlock, index: number) => {
            const blockKey = `${block.__component}-${block.id}-${index}`;
            switch (block.__component) {
                case 'shared.rich-text':
                    const markdownBody = block.body || '';
                    return (
                        <div key={blockKey} className="prose max-w-none">
                            <ReactMarkdown
                                components={{
                                    p: ({ ...props }) => <p className="text-gray-700 mb-4" {...props} />,
                                    h1: ({ ...props }) => <h1 className="text-3xl font-bold text-gray-800 mb-4" {...props} />,
                                    h2: ({ ...props }) => <h2 className="text-2xl font-semibold text-gray-800 mb-3" {...props} />,
                                    h3: ({ ...props }) => <h3 className="text-xl font-semibold text-gray-700 mb-2" {...props} />,
                                    h4: ({ ...props }) => <h4 className="text-lg font-semibold text-gray-600 mb-2" {...props} />,
                                    ul: ({ ...props }) => <ul className="list-disc list-inside text-gray-700 mb-4" {...props} />,
                                    ol: ({ ...props }) => <ol className="list-decimal list-inside text-gray-700 mb-4" {...props} />,
                                    li: ({ ...props }) => <li className="mb-2" {...props} />,
                                    blockquote: ({ ...props }) => <blockquote className="border-l-4 pl-4 italic text-gray-600 my-4" {...props} />,
                                    code: ({ ...props }) => <code className="bg-gray-100 text-red-600 px-1 rounded" {...props} />,
                                    pre: ({ ...props }) => <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm" {...props} />,
                                    a: ({ ...props }) => <a className="text-blue-500 hover:underline" {...props} />,
                                    strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                                    em: ({ ...props }) => <em className="italic" {...props} />,
                                    img: ({ ...props }) => {
                                        const src = props.src ? toStringSrc(props.src) : null;
                                        return src ? (
                                            <Image
                                                src={src}
                                                alt={props.alt || 'Image'}
                                                width={toNumber(props.width) || 768}
                                                height={toNumber(props.height) || 768}
                                                className="max-w-full h-auto my-4 rounded-lg"
                                                unoptimized
                                                loading="lazy" // Thêm lazy loading
                                            />
                                        ) : (
                                            <span className="text-gray-500">[Image: Missing URL]</span>
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
                        <blockquote key={blockKey} className="border-l-4 pl-4 italic my-6 text-gray-600">
                            <p className="text-lg font-semibold">{block.title}</p>
                            <p>{block.body}</p>
                        </blockquote>
                    );
                case 'shared.media':
                    const mediaUrl = block.file?.data?.attributes?.url
                        ? toStringSrc(
                            `${baseUrl}${isUrlWithPath(block.file.data.attributes.url, '/uploads')
                                ? block.file.data.attributes.url
                                : `/uploads${block.file.data.attributes.url}`
                            }`
                        )
                        : null;
                    return mediaUrl ? (
                        <Image
                            key={blockKey}
                            src={mediaUrl}
                            alt={block.file?.data?.attributes?.alternativeText || 'Media'}
                            width={toNumber(block.file?.data?.attributes?.width) || 768}
                            height={toNumber(block.file?.data?.attributes?.height) || 768}
                            className="w-full max-w-md my-4 rounded-lg"
                            unoptimized
                            loading="lazy"
                        />
                    ) : (
                        <div key={blockKey} className="text-gray-500">[Media: Thiếu dữ liệu]</div>
                    );
                case 'shared.slider':
                    const images = block.images?.data || [];
                    return images.length > 0 ? (
                        <div key={blockKey} className="my-6">
                            {images.map((img, imgIndex: number) => {
                                const imgUrl = img.attributes.url
                                    ? toStringSrc(
                                        `${baseUrl}${isUrlWithPath(img.attributes.url, '/uploads')
                                            ? img.attributes.url
                                            : `/uploads${img.attributes.url}`
                                        }`
                                    )
                                    : null;
                                return (
                                    <Image
                                        key={`${img.id}-${imgIndex}`}
                                        src={imgUrl || ''}
                                        alt={img.attributes.alternativeText || 'Slider image'}
                                        width={toNumber(img.attributes.width) || 768}
                                        height={toNumber(img.attributes.height) || 768}
                                        className="w-full max-w-md my-2 rounded-lg"
                                        unoptimized
                                        loading="lazy"
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div key={blockKey} className="text-gray-500">[Slider: Thiếu dữ liệu]</div>
                    );
                default:
                    return null;
            }
        };

        const renderedBlocks = blocks?.map((block: StrapiBlock, index: number) => renderBlock(block, index)) || [];

        return (
            <main className="max-w-5xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">{title || 'Không có tiêu đề'}</h1>
                <p className="text-gray-600 mb-4">{description || 'Không có mô tả'}</p>
                {coverImageUrl && (
                    <Image
                        src={coverImageUrl}
                        alt={title || 'Cover image'}
                        width={toNumber(cover?.width) || 1200}
                        height={toNumber(cover?.height) || 707}
                        className="w-full mb-4 rounded-lg"
                        unoptimized
                        loading="lazy"
                    />
                )}
                <div>{renderedBlocks}</div>
            </main>
        );
    } catch (error) {
        console.error('Error fetching article:', error);
        notFound();
    }
}