'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// Danh mục con của Blood Sugar
const categories = [
    {
        name: 'Common Blood Sugar Issues',
        slug: '/blood-sugar/common-blood-sugar-issues',
        title: 'Common Blood Sugar Issues',
        description: 'Learn about common blood sugar issues, their symptoms, causes, and effective strategies for maintaining healthy glucose levels.',
        image: { url: 'https://cms.everwellmag.com/uploads/blood_sugar_issues_6f8b3f2f30.webp', alt: 'Common Blood Sugar Issues', width: 400, height: 400, shape: 'square' },
    },
    {
        name: 'Diet Tips',
        slug: '/blood-sugar/diet-tips',
        title: 'Diet Tips for Blood Sugar Control',
        description: 'Discover diet tips to manage blood sugar levels effectively, including low-glycemic foods and balanced meal plans for better health.',
        image: { url: 'https://cms.everwellmag.com/uploads/blood_sugar_diet_tips_59057e8ffa.webp', alt: 'Diet Tips for Blood Sugar Control', width: 800, height: 400, shape: 'horizontal' },
    },
    {
        name: 'Supplements for Blood Sugar',
        slug: '/blood-sugar/supplements-for-blood-sugar',
        title: 'Supplements for Blood Sugar',
        description: 'Discover premium supplements to support healthy blood sugar levels from trusted providers. Click to shop now!',
        image: { url: 'https://cms.everwellmag.com/uploads/blood_sugar_supplements_c896f98085.webp', alt: 'Blood Sugar Supplements', width: 400, height: 500, shape: 'rectangle' },
    },
];

// Dữ liệu mẫu cho bài viết full (thay bằng API Strapi sau)
const fullArticle = {
    title: 'The Comprehensive Guide to Blood Sugar Management',
    description: 'A detailed guide to understanding and managing blood sugar levels with diet, supplements, and lifestyle changes.',
    body: `## Understanding Blood Sugar Basics  
Maintaining healthy blood sugar levels is crucial for overall well-being. Learn how diet, exercise, and supplements play a role.

## Common Issues and Symptoms  
### Hypoglycemia  
Low blood sugar can cause shakiness, sweating, and confusion. Quick-acting carbs like juice can help.
### Hyperglycemia  
High blood sugar may lead to fatigue and thirst. Monitor with a glucometer and consult a doctor.

## Diet Strategies  
### Low-Glycemic Foods  
Incorporate whole grains, vegetables, and lean proteins to stabilize glucose levels.
### Meal Timing  
Eat regular meals to prevent spikes and crashes in blood sugar.

## Supplements for Support  
### Chromium  
May improve insulin sensitivity.
### Cinnamon  
Linked to better glucose control.
Always consult a healthcare provider before starting supplements.

## Lifestyle Tips  
### Exercise  
Regular activity like walking can lower blood sugar naturally.
### Stress Management  
Reduce cortisol with meditation to avoid blood sugar spikes.

## Monitoring and Next Steps  
Use a glucose monitor to track levels and adjust your plan with professional guidance for long-term health.

This guide offers a roadmap to managing blood sugar effectively. Start today for a healthier life!  
`,
    image: { url: 'https://cms.everwellmag.com/uploads/blood_sugar_issues_6f8b3f2f30.webp', alt: 'Blood Sugar Management', width: 800, height: 400 },
};

export default function BloodSugarPage() {
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
                    Explore Blood Sugar Categories
                </h1>
                <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
                    Dive into expert advice tailored for managing blood sugar levels.
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
                                    onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/uploads/blood_sugar_issues_6f8b3f2f30.webp')}
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
                    Comprehensive Blood Sugar Management Guide
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
                            onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/uploads/blood_sugar_issues_6f8b3f2f30.webp')}
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