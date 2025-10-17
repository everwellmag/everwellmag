import { Metadata } from 'next';

interface SupplementsForMensHealthLayoutProps {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Supplements for Men's Health - Everwell Magazine",
        description: "Discover premium supplements to support men's health and vitality from trusted providers. Click to shop now!",
        openGraph: {
            title: "Supplements for Men's Health - Everwell Magazine",
            description: "Discover premium supplements to support men's health and vitality from trusted providers. Click to shop now!",
            images: ['https://cms.everwellmag.com/uploads/Supplements_For_Mens_Health_56c3718864.webp'],
            url: 'https://www.everwellmag.com/mens-health/supplements-for-mens-health',
            type: 'website',
        },
    };
}

export default function SupplementsForMensHealthLayout({ children }: SupplementsForMensHealthLayoutProps) {
    return <>{children}</>;
}