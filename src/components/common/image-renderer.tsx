import Image from 'next/image';
import { CMS_DOMAIN, DEFAULT_OG_IMAGE } from '@/lib/config';
// Hàm normalizeImageUrl (giữ inline nếu không có trong utils)
const normalizeImageUrl = (url?: string): string => {
    if (!url) return DEFAULT_OG_IMAGE;
    return url.startsWith('http') ? url : `${CMS_DOMAIN}${url}`;
};

interface MarkdownImageProps {
    src?: string | Blob;
    alt?: string;
}

export const MarkdownImage = ({ src, alt }: MarkdownImageProps) => {
    const imageSrc = typeof src === 'string' ? normalizeImageUrl(src) : DEFAULT_OG_IMAGE;
    return (
        <Image
            src={imageSrc}
            alt={alt || 'Product image'}
            width={540}
            height={0}
            className="w-full max-w-[90%] md:max-w-[540px] h-auto my-4 rounded-lg shadow-md mx-auto"
            style={{ width: '100%', maxWidth: '540px', height: 'auto' }}
            unoptimized
            loading="lazy"
        />
    );
};