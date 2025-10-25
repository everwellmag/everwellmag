import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Everwell Magazine',
    description: 'Your trusted source for health and wellness insights.',
};

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}