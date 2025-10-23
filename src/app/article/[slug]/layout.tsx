import React from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export const metadata = {
    title: 'Everwell Mag',
    description: 'Explore articles and products on Everwell Mag',
};

export default function DetailLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}