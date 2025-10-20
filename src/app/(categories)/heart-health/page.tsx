'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// Danh mục con của Heart Health
const categories = [
    {
        name: 'Common Heart Conditions',
        slug: '/heart-health/common-heart-conditions',
        title: 'Common Heart Conditions',
        description: 'Learn about common heart conditions, their symptoms, causes, and effective strategies for maintaining a healthy heart.',
        image: { url: 'https://cms.everwellmag.com/uploads/Common_Heart_Conditions_2c0c553a9c.webp', alt: 'Common Heart Conditions', width: 400, height: 400, shape: 'square' },
    },
    {
        name: 'Heart Care Tips',
        slug: '/heart-health/heart-care-tips',
        title: 'Heart Care Tips',
        description: 'Discover practical heart care tips to maintain cardiovascular health, prevent heart disease, and support a healthy lifestyle.',
        image: { url: 'https://cms.everwellmag.com/uploads/Heart_Care_Tips_1de013ba8b.webp', alt: 'Heart Care Tips', width: 800, height: 400, shape: 'horizontal' },
    },
    {
        name: 'Supplements for Heart Health',
        slug: '/heart-health/supplements-for-heart-health',
        title: 'Supplements for Heart Health',
        description: 'Discover premium supplements to support optimal heart health from trusted providers. Click to shop now!',
        image: { url: 'https://cms.everwellmag.com/uploads/Heart_Health_supplements_332b733a62.webp', alt: 'Heart Health Supplements', width: 400, height: 500, shape: 'rectangle' },
    },
];

// Dữ liệu mẫu cho bài viết full (thay bằng API Strapi sau)
const fullArticle = {
    title: 'The Comprehensive Guide to Heart Health',
    description: 'A detailed guide to maintaining and improving heart health with care tips, condition management, and supplements.',
    body: `## Understanding Heart Health Basics  
A healthy heart is vital for overall well-being. Learn how lifestyle and nutrition impact cardiovascular health.

## Common Heart Conditions  
### Hypertension  
High blood pressure can be managed with diet and exercise.
### Arrhythmia  
Irregular heartbeats may require medical attention.

## Heart Care Strategies  
### Regular Exercise  
Aim for 30 minutes of cardio most days.
### Healthy Diet  
Focus on fruits, vegetables, and lean proteins.

## Supplements for Heart Support  
### Omega-3  
Supports heart rhythm and reduces inflammation.
### CoQ10  
Boosts energy production in heart cells.
Consult a doctor before use.

## Lifestyle Tips  
### Stress Reduction  
Practice meditation to lower heart strain.
### Sleep  
Get 7-9 hours nightly for heart recovery.

## Monitoring and Next Steps  
Check blood pressure regularly and consult a cardiologist for personalized advice.

This guide offers a roadmap to maintaining heart health effectively. Start today!  
`,
    image: { url: 'https://cms.everwellmag.com/uploads/Common_Heart_Conditions_2c0c553a9c.webp', alt: 'Heart Health Guide', width: 800, height: 400 },
};

export default function HeartHealthPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false); // Tắt delay, load ngay
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto p-6" style={{ color: 'var(--foreground)' }}>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#3B82F6' }}></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            {/* Bỏ hoàn toàn banner/header */}

            {/* Module Grid Section */}
            <section className="container mx-auto p-8 w-full">
                <h1 className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                    Explore Heart Health Categories
                </h1>
                <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
                    Dive into expert advice tailored for maintaining heart health.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={category.slug}
                            className="group block rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <div className="relative">
                                <Image
                                    src={category.image.url}
                                    alt={category.image.alt}
                                    width={category.image.width}
                                    height={category.image.height}
                                    className={`w-full h-64 object-cover ${category.image.shape === 'circle' ? 'rounded-full' : 'rounded-t-lg'} group-hover:scale-105 transition-transform duration-300`}
                                    unoptimized
                                    loading="lazy"
                                    onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/uploads/Common_Heart_Conditions_2c0c553a9c.webp')}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 group-hover:opacity-60 transition-opacity duration-300 rounded-t-lg"></div>
                            </div>
                            <div className="p-6 text-center" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--foreground)' }}>
                                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                                <p className="text-base line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                                    {category.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Article Section */}
            <section className="max-w-5xl mx-auto p-8 w-full">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                    Comprehensive Heart Health Guide
                </h2>
                <div className="bg-[var(--card-bg)] rounded-lg shadow-md p-6 border" style={{ borderColor: 'var(--link-color)' }}>
                    {fullArticle.image && (
                        <Image
                            src={fullArticle.image.url}
                            alt={fullArticle.image.alt}
                            width={fullArticle.image.width}
                            height={fullArticle.image.height}
                            className="w-full h-64 object-cover rounded-lg mb-6"
                            unoptimized
                            loading="lazy"
                            onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/uploads/Common_Heart_Conditions_2c0c553a9c.webp')}
                        />
                    )}
                    <h3 className="text-xl font-semibold mb-2">{fullArticle.title}</h3>
                    <p className="text-base mb-4" style={{ color: 'var(--text-secondary)' }}>
                        {fullArticle.description}
                    </p>
                    <MarkdownRenderer content={fullArticle.body} />
                </div>
            </section>
        </div>
    );
}