'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// Danh mục con của Weight Loss
const categories = [
    {
        name: 'Weight Loss Supplements',
        slug: '/weight-loss/weight-loss-supplements',
        title: 'Top Weight Loss Supplements',
        description: 'Discover the best supplements to support your weight loss journey.',
        image: { url: 'https://cms.everwellmag.com/uploads/weight_loss_supplements_c5f8cbdcec.webp', alt: 'Weight Loss Supplements', width: 400, height: 400, shape: 'square' },
    },
    {
        name: 'Diet Plans',
        slug: '/weight-loss/diet-plan',
        title: 'Healthy Diet Plans',
        description: 'Explore balanced diets for sustainable weight loss.',
        image: { url: 'https://cms.everwellmag.com/uploads/weight_loss_diet_plan_tip_c17ccc9a5d.webp', alt: 'Diet Plans', width: 800, height: 400, shape: 'horizontal' },
    },
    {
        name: 'Fitness Tips',
        slug: '/weight-loss/workout-plan',
        title: 'Effective Fitness Tips',
        description: 'Boost your fitness with expert workout strategies.',
        image: { url: 'https://cms.everwellmag.com/uploads/Workout_Plans_weight_loss_17e0d01b33.webp', alt: 'Fitness Tips', width: 400, height: 500, shape: 'rectangle' },
    },
];

// Dữ liệu mẫu cho bài viết full (thay bằng API Strapi sau)
const fullArticle = {
    title: 'The Comprehensive Guide to Effective Weight Loss',
    description: 'A detailed approach to losing weight through nutrition, exercise, and supplements.',
    body: `## Understanding Weight Loss Basics  
Weight loss is a journey that requires a holistic approach, combining diet, exercise, and lifestyle changes. It’s not just about shedding pounds but improving overall health.

## Nutrition: The Foundation of Weight Loss  
### Balanced Diet Essentials  
A balanced diet is key. Include:
- **Vegetables**: Rich in fiber and low in calories.
- **Lean Proteins**: Chicken, fish, or tofu to maintain muscle mass.
- **Healthy Fats**: Avocado and nuts for satiety.  
Avoid processed foods and sugary drinks to maintain a calorie deficit.

### Portion Control Tips  
- Use smaller plates to trick your mind.
- Eat slowly to recognize fullness.
- Plan meals ahead to avoid overeating.

## Exercise: Boosting Metabolism  
### Types of Effective Workouts  
Incorporate a mix of:
- **Cardio**: Running or cycling for 30 minutes daily.
- **Strength Training**: Weightlifting 2-3 times a week.
- **Flexibility**: Yoga to improve mobility.  
These activities burn calories and build endurance.

### Creating a Routine  
Start with 20-30 minutes daily, gradually increasing to an hour. Consistency is more important than intensity.

## Supplements: Enhancing Results  
### Popular Weight Loss Supplements  
- **Green Tea Extract**: Boosts metabolism.
- **Protein Powders**: Supports muscle growth.
- **Fiber Supplements**: Aids digestion.  
Always consult a doctor before use to avoid side effects.

### How to Choose Supplements  
- Check for third-party certifications.
- Read labels for ingredients and dosages.
- Pair with a healthy diet for best results.

## Lifestyle Changes for Success  
### Sleep and Stress Management  
- Aim for 7-9 hours of sleep nightly.
- Practice mindfulness or meditation to reduce cortisol levels, which can lead to weight gain.

### Hydration  
Drink at least 8 glasses of water daily to support metabolism and reduce hunger.

## Monitoring Progress  
Track your weight weekly, but focus on non-scale victories like improved energy or clothing fit. Adjust your plan as needed with professional guidance.

This guide provides a roadmap to sustainable weight loss, blending science-backed strategies with practical tips. Start today for a healthier tomorrow!  
`,
    image: { url: 'https://cms.everwellmag.com/uploads/weight_loss_diet_plan_tip_c17ccc9a5d.webp', alt: 'Weight Loss Guide', width: 800, height: 400 },
};

export default function WeightLossPage() {
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
                    Explore Weight Loss Categories
                </h1>
                <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
                    Dive into expert advice tailored for your weight loss journey.
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
                                    onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/Uploads/default-image.jpg')}
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
                    Comprehensive Weight Loss Guide
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
                            onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/Uploads/default-image.jpg')}
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