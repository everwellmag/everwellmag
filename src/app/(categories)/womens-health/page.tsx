'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// Danh mục con của Women’s Health
const categories = [
    {
        name: 'Common Women’s Health Issues',
        slug: '/womens-health/common-womens-health-issues',
        title: 'Common Women’s Health Issues',
        description: 'Discover common women’s health issues, their symptoms, causes, and effective strategies for prevention and management.',
        image: { url: 'https://cms.everwellmag.com/uploads/Common_Women_s_Health_Issues_790bf93ba9.webp', alt: 'Common Women’s Health Issues', width: 400, height: 400, shape: 'square' },
    },
    {
        name: 'Supplements for Women’s Health',
        slug: '/womens-health/supplements-for-womens-health',
        title: 'Supplements for Women’s Health',
        description: 'Discover supplements that support women’s health, with insights on essential nutrients, benefits, and expert recommendations for overall wellness.',
        image: { url: 'https://cms.everwellmag.com/uploads/Supplements_for_Women_7bce0b0612.webp', alt: 'Supplements for Women\'s Health', width: 800, height: 400, shape: 'horizontal' },
    },
    {
        name: 'Women’s Care Tips',
        slug: '/womens-health/womens-care-tips',
        title: 'Women’s Care Tips',
        description: 'Explore practical tips and advice for women’s health and wellness, including self-care, prevention, and lifestyle strategies.',
        image: { url: 'https://cms.everwellmag.com/uploads/Supplements_For_woman_Health_2016bed2f6.webp', alt: 'Women’s Care Tips', width: 400, height: 500, shape: 'rectangle' },
    },
];

// Dữ liệu mẫu cho bài viết full (thay bằng API Strapi sau)
const fullArticle = {
    title: 'The Comprehensive Guide to Women’s Health',
    description: 'A detailed guide to maintaining and improving women’s health with care tips, issue management, and supplements.',
    body: `## Understanding Women’s Health Basics  
Women’s health involves unique needs across all life stages. Learn how to support it with proper care.

## Common Women’s Health Issues  
### Menopause  
Symptoms can be managed with lifestyle changes.
### Polycystic Ovary Syndrome (PCOS)  
Requires medical evaluation and diet adjustments.

## Women’s Care Strategies  
### Regular Checkups  
Annual visits help detect issues early.
### Balanced Nutrition  
Focus on calcium and iron intake.

## Supplements for Women’s Support  
### Folic Acid  
Essential for reproductive health.
### Calcium  
Supports bone health.
Consult a doctor before use.

## Lifestyle Tips  
### Stress Management  
Yoga can improve hormonal balance.
### Exercise  
Moderate activity boosts overall health.

## Monitoring and Next Steps  
Track symptoms and consult healthcare professionals for tailored advice.

This guide offers a roadmap to maintaining women’s health effectively. Start today!  
`,
    image: { url: 'https://cms.everwellmag.com/uploads/Supplements_For_woman_Health_2016bed2f6.webp', alt: 'Women’s Health Guide', width: 800, height: 400 },
};

export default function WomensHealthPage() {
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
                    Explore Women’s Health Categories
                </h1>
                <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
                    Dive into expert advice tailored for maintaining women’s health.
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
                                    onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/uploads/Supplements_For_woman_Health_2016bed2f6.webp')}
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
                    Comprehensive Women’s Health Guide
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
                            onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/uploads/Supplements_For_woman_Health_2016bed2f6.webp')}
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