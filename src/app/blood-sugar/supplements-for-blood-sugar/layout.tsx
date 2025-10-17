import { Metadata } from 'next';

interface SupplementsForBloodSugarLayoutProps {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Supplements for Blood Sugar - Everwell Magazine',
        description: 'Discover premium supplements to support healthy blood sugar levels from trusted providers. Click to shop now!',
        openGraph: {
            title: 'Supplements for Blood Sugar - Everwell Magazine',
            description: 'Discover premium supplements to support healthy blood sugar levels from trusted providers. Click to shop now!',
            images: ['https://cms.everwellmag.com/uploads/blood_sugar_supplements_c896f98085.webp'],
            url: 'https://www.everwellmag.com/blood-sugar/supplements-for-blood-sugar',
            type: 'website',
        },
    };
}

export default function SupplementsForBloodSugarLayout({ children }: SupplementsForBloodSugarLayoutProps) {
    return <>{children}</>;
}