import { ReactNode } from 'react';

export const metadata = {
    title: 'Diet Plans - Everwell Magazine',
    description: 'Discover tailored diet plans to support your weight loss journey with balanced nutrition and sustainable eating habits.',
};

export default function DietPlanLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}