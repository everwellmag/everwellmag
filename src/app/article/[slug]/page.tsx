import { fetchFromStrapi } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    console.log('Slug:', slug);

    // Gọi API với populate sâu để lấy dữ liệu Media trong blocks
    const data = await fetchFromStrapi(`articles?filters[slug][$eq]=${slug}&populate[blocks][populate]=*`);
    console.log('API Data:', JSON.stringify(data, null, 2));

    const article = data.data?.[0];
    if (!article) {
        console.log('No article found for slug:', slug);
        notFound();
    }

    const { title, description, cover, blocks } = article;

    // Dùng biến môi trường STRAPI_API_URL
    const baseUrl = process.env.STRAPI_API_URL || 'https://cms.everwellmag.com';
    const coverImageUrl = cover?.url ? `${baseUrl}${cover.url}` : null;

    // Hàm render block
    const renderBlock = async (block: any) => {
        switch (block.__component) {
            case 'shared.rich-text':
                // Thay thế URL cũ (nếu có) bằng baseUrl
                let markdownBody = block.body || '';
                markdownBody = markdownBody.replace(
                    /http:\/\/15\.235\.208\.94:1337|https:\/\/cms\.everwellmag\.com:1337/g,
                    baseUrl
                );
                const htmlContent = await marked(markdownBody);
                return (
                    <div
                        key={block.id}
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                );
            case 'shared.quote':
                return (
                    <blockquote key={block.id} className="border-l-4 pl-4 italic my-4">
                        <p className="text-lg font-semibold">{block.title}</p>
                        <p>{block.body}</p>
                    </blockquote>
                );
            case 'shared.media':
                const mediaUrl = block.file?.data?.attributes?.url
                    ? `${baseUrl}${block.file.data.attributes.url}`
                    : null;
                return mediaUrl ? (
                    <img
                        key={block.id}
                        src={mediaUrl}
                        alt={block.file?.data?.attributes?.alternativeText || 'Media'}
                        className="w-full max-w-md my-4 rounded-lg"
                    />
                ) : (
                    <div key={block.id} className="text-gray-500">[Media: Thiếu dữ liệu]</div>
                );
            case 'shared.slider':
                const images = block.images?.data || [];
                return images.length > 0 ? (
                    <div key={block.id} className="my-4">
                        {images.map((img: any) => (
                            <img
                                key={img.id}
                                src={`${baseUrl}${img.attributes.url}`}
                                alt={img.attributes.alternativeText || 'Slider image'}
                                className="w-full max-w-md my-2 rounded-lg"
                            />
                        ))}
                    </div>
                ) : (
                    <div key={block.id} className="text-gray-500">[Slider: Thiếu dữ liệu]</div>
                );
            default:
                return null;
        }
    };

    // Map blocks và await renderBlock
    const renderedBlocks = await Promise.all(blocks?.map(renderBlock) || []);

    return (
        <main className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{title || 'Không có tiêu đề'}</h1>
            <p className="text-gray-600 mb-4">{description || 'Không có mô tả'}</p>
            {coverImageUrl && (
                <img
                    src={coverImageUrl}
                    alt={title || 'Cover image'}
                    className="w-full max-w-md mb-4 rounded-lg"
                />
            )}
            <div>{renderedBlocks}</div>
        </main>
    );
}