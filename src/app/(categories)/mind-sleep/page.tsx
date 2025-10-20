'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// Danh mục con của Mind & Sleep
const categories = [
    {
        name: 'Common Mind & Sleep Issues',
        slug: '/mind-sleep/common-mind-sleep',
        title: 'Common Mind & Sleep Issues',
        description: 'Explore common mind and sleep issues, their symptoms, causes, and effective strategies for improving mental health and sleep quality.',
        image: { url: 'https://cms.everwellmag.com/uploads/Common_Mind_Sleep_Issues_3dbee0cbdf.webp', alt: 'Common Mind & Sleep Issues', width: 400, height: 400, shape: 'square' },
    },
    {
        name: 'Mind & Sleep Supplements',
        slug: '/mind-sleep/supplements-mind-sleep',
        title: 'Mind & Sleep Supplements',
        description: 'Discover the power of our Mind & Sleep supplements, carefully formulated to support mental clarity, focus, and deep, restorative sleep.',
        image: { url: 'https://cms.everwellmag.com/uploads/weight_loss_supplements_c5f8cbdcec.webp', alt: 'Mind & Sleep Supplements', width: 800, height: 400, shape: 'horizontal' },
    },
];

// Dữ liệu mẫu cho bài viết full (thay bằng API Strapi sau)
const fullArticle = {
    title: 'The Comprehensive Guide to Mind & Sleep',
    description: 'A detailed guide to enhancing mental health and sleep quality with care tips, issue management, and supplements.',
    body: `## Understanding Mind & Sleep Basics  
Mental clarity and restful sleep are key to overall health. Learn how to support both with simple strategies.

## Common Mind & Sleep Issues  
### Insomnia  
Difficulty sleeping can be managed with routine changes.
### Anxiety  
Can disrupt sleep; consider relaxation techniques.

## Mind & Sleep Strategies  
### Mindfulness  
Practice meditation for 10 minutes daily.
### Sleep Hygiene  
Keep a consistent sleep schedule.

## Supplements for Mind & Sleep Support  
### Melatonin  
Aids in regulating sleep cycles.
### Magnesium  
Promotes relaxation and reduces stress.
Consult a doctor before use.

## Lifestyle Tips  
### Limit Screen Time  
Avoid screens an hour before bed.
### Exercise  
Light activity improves sleep quality.

## Monitoring and Next Steps  
Track sleep patterns and seek professional advice for mental health support.

This guide offers a roadmap to improving mind and sleep health effectively. Start today!  
`,
    image: { url: 'https://cms.everwellmag.com/uploads/Common_Mind_Sleep_Issues_3dbee0cbdf.webp', alt: 'Mind & Sleep Guide', width: 800, height: 400 },
};

export default function MindSleepPage() {
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
                    Explore Mind & Sleep Categories
                </h1>
                <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
                    Dive into expert advice tailored for improving mental health and sleep quality.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
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
                                    onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/uploads/Common_Mind_Sleep_Issues_3dbee0cbdf.webp')}
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
                    Comprehensive Mind & Sleep Guide
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
                            onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/uploads/Common_Mind_Sleep_Issues_3dbee0cbdf.webp')}
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