'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// Danh mục con của Men’s Health
const categories = [
    {
        name: 'Common Men’s Health Issues',
        slug: '/mens-health/common-mens-health-issues',
        title: 'Common Men’s Health Issues',
        description: 'Learn about common men’s health issues, their symptoms, causes, and effective strategies for prevention and management.',
        image: { url: 'https://cms.everwellmag.com/uploads/Common_Men_s_Health_Issues_a39fbb1616.webp', alt: 'Common Men’s Health Issues', width: 400, height: 400, shape: 'square' },
    },
    {
        name: 'Men’s Care Tips',
        slug: '/mens-health/mens-care-tips',
        title: 'Men’s Care Tips',
        description: 'Discover practical men’s care tips to support overall health, wellness, and vitality through lifestyle and preventive measures.',
        image: { url: 'https://cms.everwellmag.com/uploads/Men_s_Care_Tips_8c6b2e9df2.webp', alt: 'Men’s Care Tips', width: 800, height: 400, shape: 'horizontal' },
    },
    {
        name: 'Supplements for Men’s Health',
        slug: '/mens-health/supplements-for-mens-health',
        title: 'Supplements for Men’s Health',
        description: "Discover premium supplements to support men's health and vitality from trusted providers. Click to shop now!",
        image: { url: 'https://cms.everwellmag.com/uploads/Supplements_For_Mens_Health_56c3718864.webp', alt: "Men's Health Supplements", width: 400, height: 500, shape: 'rectangle' },
    },
];

// Dữ liệu mẫu cho bài viết full (thay bằng API Strapi sau)
const fullArticle = {
    title: 'The Comprehensive Guide to Men’s Health',
    description: 'A detailed guide to maintaining and improving men’s health with care tips, issue management, and supplements.',
    body: `## Understanding Men’s Health Basics  
Men’s health encompasses physical, mental, and emotional well-being. Learn how to support it with lifestyle changes.

## Common Men’s Health Issues  
### Prostate Health  
Regular screening can detect issues early.
### Low Testosterone  
Can affect energy and mood; consult a doctor.

## Men’s Care Strategies  
### Regular Exercise  
Strength training boosts testosterone levels.
### Balanced Diet  
Include zinc and magnesium for vitality.

## Supplements for Men’s Support  
### Vitamin D  
Supports bone and immune health.
### Zinc  
Aids testosterone production.
Consult a healthcare provider before use.

## Lifestyle Tips  
### Mental Health  
Practice stress management techniques.
### Sleep  
Aim for 7-8 hours for recovery.

## Monitoring and Next Steps  
Track health metrics and seek professional advice for personalized care.

This guide offers a roadmap to maintaining men’s health effectively. Start today!  
`,
    image: { url: 'https://cms.everwellmag.com/uploads/Common_Men_s_Health_Issues_a39fbb1616.webp', alt: 'Men’s Health Guide', width: 800, height: 400 },
};

export default function MensHealthPage() {
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
                    Explore Men’s Health Categories
                </h1>
                <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
                    Dive into expert advice tailored for maintaining men’s health.
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
                                    onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/uploads/Common_Men_s_Health_Issues_a39fbb1616.webp')}
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
                    Comprehensive Men’s Health Guide
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
                            onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/uploads/Common_Men_s_Health_Issues_a39fbb1616.webp')}
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