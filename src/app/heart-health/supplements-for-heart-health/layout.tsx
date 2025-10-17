import { Metadata } from 'next';

interface SupplementsForHeartHealthLayoutProps {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Supplements for Heart Health - Everwell Magazine',
        description: 'Discover premium supplements to support optimal heart health from trusted providers. Click to shop now!',
        openGraph: {
            title: 'Supplements for Heart Health - Everwell Magazine',
            description: 'Discover premium supplements to support optimal heart health from trusted providers. Click to shop now!',
            images: ['https://cms.everwellmag.com/uploads/Heart_Health_supplements_332b733a62.webp'],
            url: 'https://www.everwellmag.com/heart-health/supplements-for-heart-health',
            type: 'website',
        },
    };
}

export default function SupplementsForHeartHealthLayout({ children }: SupplementsForHeartHealthLayoutProps) {
    return <>{children}</>;
}