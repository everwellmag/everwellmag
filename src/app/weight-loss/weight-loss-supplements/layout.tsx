import { Metadata } from 'next';

interface WeightLossSupplementsLayoutProps {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Top Weight Loss Supplements Certified for Safety & Effectiveness',
        description: 'Discover the best weight loss supplements backed by clinical studies and certifications. Explore safe, effective options to support your weight management goals naturally',
        openGraph: {
            title: 'Top Weight Loss Supplements Certified for Safety & Effectiveness',
            description: 'Discover the best weight loss supplements backed by clinical studies and certifications. Explore safe, effective options to support your weight management goals naturally',
            images: ['https://cms.everwellmag.com/uploads/weight_loss_supplements_c5f8cbdcec.webp'],
            url: 'https://www.everwellmag.com/weight-loss/weight-loss-supplements',
            type: 'website',
        },
    };
}

export default function WeightLossSupplementsLayout({ children }: WeightLossSupplementsLayoutProps) {
    return <>{children}</>;
}