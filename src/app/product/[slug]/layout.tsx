import React from 'react';

export const metadata = {
    title: 'Everwell Mag',
    description: 'Explore articles and products on Everwell Mag',
};

export default function DetailLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}