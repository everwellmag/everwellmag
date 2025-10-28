import { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Contact Us | Everwell Magazine',
    description: 'Get in touch with Everwell Magazine for feedback, inquiries, or support.',
    openGraph: {
        title: 'Contact Us | Everwell Magazine',
        description: 'Get in touch with Everwell Magazine for feedback, inquiries, or support.',
        type: 'website',
        images: [{ url: DEFAULT_OG_IMAGE }],
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}