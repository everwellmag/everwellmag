import { ReactNode } from 'react';

export const metadata = {
    title: 'Workout Plans - Everwell Magazine',
    description: 'Explore effective workout plans designed to help you achieve your weight loss goals with expert guidance and structured routines.',
};

export default function WorkoutPlanLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}