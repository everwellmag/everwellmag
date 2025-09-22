import { fetchFromStrapi } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Gọi API với populate
    const data = await fetchFromStrapi(`articles?filters[slug][$eq]=${slug}&populate=*`);
    const article = data.data?.[0];

    if (!article) {
        notFound();
    }

    const { title, description, cover, blocks } = article;

    // Lấy URL hình ảnh cover
    const coverImageUrl = cover?.url ? `http://15.235.208.94:1337${cover.url}` : null;

    // Hàm render block
    const renderBlock = (block: any) => {
        switch (block.__component) {
            case 'shared.rich-text':
                return (
                    <div
                        key={block.id}
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: marked(block.body || '') }}
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
                // Nếu component media có dữ liệu URL
                const mediaUrl = block.url ? `http://15.235.208.94:1337${block.url}` : null;
                return mediaUrl ? (
                    <img
                        key={block.id}
                        src={mediaUrl}
                        alt={block.alternativeText || 'Media'}
                        className="w-full max-w-md my-4 rounded-lg"
                    />
                ) : null;
            case 'shared.slider':
                // Xử lý slider (cần kiểm tra dữ liệu trong Strapi)
                return <div key={block.id} className="text-gray-500">[Slider: Cần thêm dữ liệu]</div>;
            default:
                return null;
        }
    };

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
            <div>{blocks?.map(renderBlock) || 'Không có nội dung'}</div>
        </main>
    );
}