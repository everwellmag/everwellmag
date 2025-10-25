import Image from 'next/image';

// Hàm normalizeImageUrl (giữ inline nếu không có trong utils)
const normalizeImageUrl = (url?: string): string => {
    if (!url) return 'https://cms.everwellmag.com/Uploads/default-image.jpg';
    return url.startsWith('http') ? url : `https://cms.everwellmag.com${url}`;
};

interface MarkdownImageProps {
    src?: string | Blob;
    alt?: string;
}

export const MarkdownImage = ({ src, alt }: MarkdownImageProps) => {
    const imageSrc = typeof src === 'string' ? normalizeImageUrl(src) : 'https://cms.everwellmag.com/Uploads/default-image.jpg';
    return (
        <Image
            src={imageSrc}
            alt={alt || 'Product image'}
            width={786}
            height={0}
            className="w-full max-w-[90%] md:max-w-[786px] h-auto my-4 rounded-lg shadow-md mx-auto"
            style={{ width: '100%', maxWidth: '786px', height: 'auto' }}
            unoptimized
            loading="lazy"
        />
    );
};