import { fetchFromStrapi } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import Image from 'next/image';

// Định nghĩa interface cho dữ liệu từ Strapi
interface StrapiMedia {
    data: {
        attributes: {
            url: string;
            alternativeText?: string;
            width?: number;
            height?: number;
        };
    } | null;
}

interface StrapiBlock {
    __component: string;
    id: number;
    body?: string;
    title?: string;
    file?: StrapiMedia;
    images?: { data: Array<{ id: number; attributes: { url: string; alternativeText?: string; width?: number; height?: number } }> };
}

interface StrapiArticle {
    title?: string;
    description?: string;
    slug: string;
    cover?: {
        url: string;
        width?: number;
        height?: number;
    };
    blocks?: StrapiBlock[];
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    console.log('Slug:', slug);
    console.log('STRAPI_API_URL:', process.env.STRAPI_API_URL);

    const data = await fetchFromStrapi(`articles?filters[slug][$eq]=${slug}&populate[blocks][populate]=*`);
    console.log('API Data:', JSON.stringify(data, null, 2));

    const article: StrapiArticle = data.data?.[0];
    if (!article) {
        console.log('No article found for slug:', slug);
        notFound();
    }

    const { title, description, cover, blocks } = article;

    const baseUrl = process.env.STRAPI_API_URL || 'https://cms.everwellmag.com';
    const coverImageUrl = cover?.url ? `${baseUrl}${cover.url.startsWith('/uploads') ? cover.url : `/uploads${cover.url}`}` : null;

    const renderBlock = async (block: StrapiBlock, index: number) => {
        const blockKey = `${block.__component}-${block.id}-${index}`;
        switch (block.__component) {
            case 'shared.rich-text':
                let markdownBody = block.body || '';
                console.log('Original Markdown:', markdownBody);
                // Thay thế URL sai (dạng lẫn lộn domain + IP)
                markdownBody = markdownBody.replace(
                    /https:\/\/cms\.everwellmag\.com15\.235\.208\.94:1337/g,
                    baseUrl
                );
                // Thay thế mọi HTTP/HTTPS sai bằng baseUrl
                markdownBody = markdownBody.replace(
                    /(https?:\/\/[^\/]+)(\/Uploads\/[^"'\s]+)/g,
                    (match: string, p1: string, p2: string) => `${baseUrl}${p2}`
                );
                console.log('Processed Markdown:', markdownBody);
                const htmlContent = await marked(markdownBody);
                return (
                    <div
                        key={blockKey}
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                );
            case 'shared.quote':
                return (
                    <blockquote key={blockKey} className="border-l-4 pl-4 italic my-4">
                        <p className="text-lg font-semibold">{block.title}</p>
                        <p>{block.body}</p>
                    </blockquote>
                );
            case 'shared.media':
                const mediaUrl = block.file?.data?.attributes?.url
                    ? `${baseUrl}${block.file.data.attributes.url.startsWith('/uploads') ? block.file.data.attributes.url : `/uploads${block.file.data.attributes.url}`}`
                    : null;
                console.log('Media URL:', mediaUrl);
                return mediaUrl ? (
                    <Image
                        key={blockKey}
                        src={mediaUrl}
                        alt={block.file?.data?.attributes?.alternativeText || 'Media'}
                        width={block.file?.data?.attributes?.width || 500}
                        height={block.file?.data?.attributes?.height || 500}
                        className="w-full max-w-md my-4 rounded-lg"
                        onError={() => console.error(`Failed to load media: ${mediaUrl}`)}
                    />
                ) : (
                    <div key={blockKey} className="text-gray-500">[Media: Thiếu dữ liệu]</div>
                );
            case 'shared.slider':
                const images = block.images?.data || [];
                console.log('Slider Images:', images);
                return images.length > 0 ? (
                    <div key={blockKey} className="my-4">
                        {images.map((img, imgIndex: number) => {
                            const imgUrl = `${baseUrl}${img.attributes.url.startsWith('/uploads') ? img.attributes.url : `/Uploads${img.attributes.url}`}`;
                            console.log('Slider Image URL:', imgUrl);
                            return (
                                <Image
                                    key={`${img.id}-${imgIndex}`}
                                    src={imgUrl}
                                    alt={img.attributes.alternativeText || 'Slider image'}
                                    width={img.attributes.width || 500}
                                    height={img.attributes.height || 500}
                                    className="w-full max-w-md my-2 rounded-lg"
                                    onError={() => console.error(`Failed to load slider image: ${imgUrl}`)}
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

    const renderedBlocks = await Promise.all(blocks?.map((block: StrapiBlock, index: number) => renderBlock(block, index)) || []);

    return (
        <main className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{title || 'Không có tiêu đề'}</h1>
            <p className="text-gray-600 mb-4">{description || 'Không có mô tả'}</p>
            {coverImageUrl && (
                <Image
                    src={coverImageUrl}
                    alt={title || 'Cover image'}
                    width={cover?.width || 1200}
                    height={cover?.height || 707}
                    className="w-full max-w-md mb-4 rounded-lg"
                    priority
                    onError={() => console.error(`Failed to load cover: ${coverImageUrl}`)}
                />
            )}
            <div>{renderedBlocks}</div>
        </main>
    );
}