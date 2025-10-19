import { Metadata } from 'next';

interface SupplementsForWomensHealthLayoutProps {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Supplements for Women's Health - Everwell Magazine",
        description: "Discover premium supplements to support women's health and wellness from trusted providers. Click to shop now!",
        openGraph: {
            title: "Supplements for Women's Health - Everwell Magazine",
            description: "Discover premium supplements to support women's health and wellness from trusted providers. Click to shop now!",
            images: ['https://cms.everwellmag.com/uploads/Supplements_For_woman_Health_2016bed2f6.webp'],
            url: 'https://www.everwellmag.com/womens-health/supplements-for-womens-health',
            type: 'website',
        },
    };
}

export default function SupplementsForWomensHealthLayout({ children }: SupplementsForWomensHealthLayoutProps) {
    return <>{children}</>;
}