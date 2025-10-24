import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'About Us | Everwell Magazine',
    description: 'Learn more about Everwell Magazine, your trusted source for health and wellness insights.',
    openGraph: {
        title: 'About Us | Everwell Magazine',
        description: 'Learn more about Everwell Magazine, your trusted source for health and wellness insights.',
        type: 'website',
        images: [{ url: 'https://cms.everwellmag.com/Uploads/default-image.jpg' }],
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}