import { Metadata } from 'next';

interface SupplementsForEyeHealthLayoutProps {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Supplements for Eye Health - Everwell Magazine',
        description: 'Discover premium supplements to support optimal eye health from trusted providers. Click to shop now!',
        openGraph: {
            title: 'Supplements for Eye Health - Everwell Magazine',
            description: 'Discover premium supplements to support optimal eye health from trusted providers. Click to shop now!',
            images: ['https://cms.everwellmag.com/uploads/eye_supplements_1e917954bb.webp'],
            url: 'https://www.everwellmag.com/eye-health/supplements-for-eye-health',
            type: 'website',
        },
    };
}

export default function SupplementsForEyeHealthLayout({ children }: SupplementsForEyeHealthLayoutProps) {
    return <>{children}</>;
}