import { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/config';
export const metadata: Metadata = {
    title: 'About Us | Everwell Magazine',
    description: 'Learn more about Everwell Magazine, your trusted source for health and wellness insights.',
    openGraph: {
        title: 'About Us | Everwell Magazine',
        description: 'Learn more about Everwell Magazine, your trusted source for health and wellness insights.',
        type: 'website',
        images: [{ url: DEFAULT_OG_IMAGE }],
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}