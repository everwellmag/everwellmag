import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Everwell Magazine',
    description: 'Get in touch with Everwell Magazine for feedback, inquiries, or support.',
    openGraph: {
        title: 'Contact Us | Everwell Magazine',
        description: 'Get in touch with Everwell Magazine for feedback, inquiries, or support.',
        type: 'website',
        images: [{ url: 'https://cms.everwellmag.com/Uploads/default-image.jpg' }],
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}