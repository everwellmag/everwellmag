'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// Danh mục con của Eye Health
const categories = [
    {
        name: 'Common Eye Conditions',
        slug: '/eye-health/common-eye-conditions',
        title: 'Common Eye Conditions',
        description: 'Learn about common eye conditions, their symptoms, causes, and effective strategies for maintaining healthy vision.',
        image: { url: 'https://cms.everwellmag.com/uploads/Common_Eye_Conditions_435281392e.webp', alt: 'Common Eye Conditions', width: 400, height: 400, shape: 'square' },
    },
    {
        name: 'Eye Care Tips',
        slug: '/eye-health/eye-care-tips',
        title: 'Eye Care Tips',
        description: 'Discover practical eye care tips to maintain healthy vision, prevent eye strain, and protect your eyes from common issues.',
        image: { url: 'https://cms.everwellmag.com/uploads/Eye_Care_Tips_2ee9493fc1.webp', alt: 'Eye Care Tips', width: 800, height: 400, shape: 'horizontal' },
    },
    {
        name: 'Supplements for Eye Health',
        slug: '/eye-health/supplements-for-eye-health',
        title: 'Supplements for Eye Health',
        description: 'Discover premium supplements to support optimal eye health from trusted providers. Click to shop now!',
        image: { url: 'https://cms.everwellmag.com/uploads/eye_supplements_1e917954bb.webp', alt: 'Eye Health Supplements', width: 400, height: 500, shape: 'rectangle' },
    },
];

// Dữ liệu mẫu cho bài viết full (thay bằng API Strapi sau)
const fullArticle = {
    title: 'The Comprehensive Guide to Eye Health',
    description: 'A detailed guide to maintaining and improving eye health with care tips, conditions management, and supplements.',
    body: `## Understanding Eye Health Basics  
Healthy vision is essential for quality of life. Learn how to protect your eyes with proper care and nutrition.

## Common Eye Conditions  
### Myopia  
Nearsightedness can be managed with glasses or contact lenses.
### Cataracts  
Clouding of the lens can be treated with surgery if needed.

## Eye Care Strategies  
### Screen Time Management  
Take breaks every 20 minutes to reduce strain.
### Proper Lighting  
Use adequate lighting to avoid eye fatigue.

## Supplements for Eye Support  
### Vitamin A  
Essential for retinal health.
### Lutein  
Protects against blue light damage.
Consult a doctor before use.

## Lifestyle Tips  
### Regular Checkups  
Visit an eye care professional annually.
### Hydration  
Drink water to keep eyes moisturized.

## Monitoring and Next Steps  
Track changes in vision and seek professional advice for long-term eye health.

This guide provides a roadmap to maintaining eye health effectively. Start today!  
`,
    image: { url: 'https://cms.everwellmag.com/uploads/Common_Eye_Conditions_435281392e.webp', alt: 'Eye Health Guide', width: 800, height: 400 },
};

export default function EyeHealthPage() {
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
                    Explore Eye Health Categories
                </h1>
                <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
                    Dive into expert advice tailored for maintaining eye health.
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
                                    onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/uploads/Common_Eye_Conditions_435281392e.webp')}
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
                    Comprehensive Eye Health Guide
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
                            onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/uploads/Common_Eye_Conditions_435281392e.webp')}
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