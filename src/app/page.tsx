'use client';

import Image from 'next/image';
import Link from 'next/link';

// Danh mục với ảnh, title, meta description
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
    slug: '/weight-loss/diet-plans',
    title: 'Healthy Diet Plans',
    description: 'Explore balanced diets for sustainable weight loss.',
    image: { url: 'https://cms.everwellmag.com/uploads/weight_loss_diet_plan_tip_c17ccc9a5d.webp', alt: 'Diet Plans', width: 800, height: 400, shape: 'horizontal' },
  },
  {
    name: 'Fitness Tips',
    slug: '/weight-loss/fitness-tips',
    title: 'Effective Fitness Tips',
    description: 'Boost your fitness with expert workout strategies.',
    image: { url: 'https://cms.everwellmag.com/uploads/Workout_Plans_weight_loss_17e0d01b33.webp', alt: 'Fitness Tips', width: 400, height: 500, shape: 'rectangle' },
  },
  {
    name: 'Men’s Health',
    slug: '/mens-health',
    title: 'Power Up Your Health',
    description: 'Boost strength and vitality with men’s wellness advice.',
    image: { url: 'https://cms.everwellmag.com/uploads/Common_Men_s_Health_Issues_a39fbb1616.webp', alt: 'Men’s Health', width: 800, height: 400, shape: 'horizontal' },
  },
  {
    name: 'Women’s Health',
    slug: '/womens-health',
    title: 'Thrive with Confidence',
    description: 'Empowering women with health tips for a balanced life.',
    image: { url: 'https://cms.everwellmag.com/uploads/Common_Women_s_Health_Issues_790bf93ba9.webp', alt: 'Women’s Health', width: 400, height: 500, shape: 'rectangle' },
  },
  {
    name: 'Blood Sugar',
    slug: '/blood-sugar',
    title: 'Balance Your Blood Sugar',
    description: 'Manage blood sugar with diet and supplement insights.',
    image: { url: 'https://cms.everwellmag.com/uploads/blood_sugar_issues_6f8b3f2f30.webp', alt: 'Blood Sugar', width: 400, height: 400, shape: 'square' },
  },
  {
    name: 'Eye Health',
    slug: '/eye-health',
    title: 'See the World Clearly',
    description: 'Protect your vision with expert eye health tips.',
    image: { url: 'https://cms.everwellmag.com/uploads/Common_Eye_Conditions_435281392e.webp', alt: 'Eye Health', width: 400, height: 400, shape: 'circle' },
  },
  {
    name: 'Heart Health',
    slug: '/heart-health',
    title: 'Keep Your Heart Strong',
    description: 'Support heart health with lifestyle and supplement advice.',
    image: { url: 'https://cms.everwellmag.com/uploads/Common_Heart_Conditions_2c0c553a9c.webp', alt: 'Heart Health', width: 800, height: 400, shape: 'horizontal' },
  },
  {
    name: 'Mind & Sleep',
    slug: '/mind-sleep',
    title: 'Rest & Recharge',
    description: 'Improve sleep and mental clarity with proven strategies.',
    image: { url: 'https://cms.everwellmag.com/uploads/Common_Mind_Sleep_Issues_3dbee0cbdf.webp', alt: 'Mind & Sleep', width: 400, height: 500, shape: 'rectangle' },
  },
];

// Quick Tips với icon
const quickTips = [
  {
    title: 'Heart Health',
    description: 'Exercise 30 minutes daily to keep your heart strong.',
    icon: { url: 'https://cms.everwellmag.com/Uploads/icon_heart_12345.png', alt: 'Heart Icon' },
  },
  {
    title: 'Nutrition',
    description: 'Eat more fiber-rich foods for better digestion.',
    icon: { url: 'https://cms.everwellmag.com/Uploads/icon_apple_12345.png', alt: 'Apple Icon' },
  },
  {
    title: 'Sleep Better',
    description: 'Avoid screens 1 hour before bed for quality sleep.',
    icon: { url: 'https://cms.everwellmag.com/Uploads/icon_moon_12345.png', alt: 'Moon Icon' },
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Hero Section: Weight Loss Banner */}
      <section className="container mx-auto p-8 w-full">
        <div className="relative text-white rounded-xl p-10 bg-transparent shadow-lg">
          <Image
            src="https://cms.everwellmag.com/uploads/weight_loss_diet_plan_tip_c17ccc9a5d.webp"
            alt="Weight Loss Banner"
            width={1200}
            height={480}
            className="w-full h-72 object-cover rounded-xl mb-6 opacity-90"
            style={{ filter: 'brightness(0.95)' }}
            unoptimized
            priority
            onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/Uploads/default-image.jpg')}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40 rounded-xl"></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-4">Your Path to Wellness Starts Here</h1>
            <p className="text-lg max-w-2xl mb-6">Explore science-backed tips and supplements for a healthier you.</p>
            <Link href="/weight-loss" className="inline-block py-3 px-6 rounded-lg btn-gradient text-white text-lg font-semibold">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Module Grid Section */}
      <section className="container mx-auto p-8 w-full">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
          Explore Health Categories
        </h2>
        <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
          Discover expert insights across our top wellness categories.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={category.slug}
              className="group block rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={category.image.url}
                  alt={category.image.alt}
                  width={category.image.width}
                  height={category.image.height}
                  className={`w-full h-64 object-cover ${category.image.shape === 'circle' ? 'rounded-full' : 'rounded-t-xl'} group-hover:scale-105 transition-transform duration-300`}
                  unoptimized
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/Uploads/default-image.jpg')}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 group-hover:opacity-60 transition-opacity duration-300 rounded-t-xl"></div>
              </div>
              <div className="p-6 text-center" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--foreground)' }}>
                <h3 className="text-2xl font-semibold mb-2">{category.title}</h3>
                <p className="text-base line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonial Module */}
      <section className="container mx-auto p-8 w-full">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
          What Our Experts Say
        </h2>
        <div className="bg-[var(--card-bg)] rounded-xl shadow-md p-6 border max-w-2xl mx-auto text-center" style={{ borderColor: 'var(--link-color)' }}>
          <p className="text-lg italic mb-4" style={{ color: 'var(--text-secondary)' }}>
            &quot;EverWellMag provides practical, science-backed advice that truly transforms lives.&quot;
          </p>
          <p className="text-base font-semibold" style={{ color: 'var(--foreground)' }}>
            Dr. Jane Smith, Wellness Expert
          </p>
        </div>
      </section>

      {/* Quick Tips Module */}
      <section className="container mx-auto p-8 w-full">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
          Quick Health Tips
        </h2>
        <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
          Simple steps to improve your wellness today.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickTips.map((tip) => (
            <div
              key={tip.title}
              className="bg-[var(--card-bg)] rounded-xl shadow-md p-6 border flex flex-col items-center text-center"
              style={{ borderColor: 'var(--link-color)' }}
            >
              <Image
                src={tip.icon.url}
                alt={tip.icon.alt}
                width={48}
                height={48}
                className="w-12 h-12 object-contain mb-4"
                unoptimized
                loading="lazy"
                onError={(e) => (e.currentTarget.src = 'https://cms.everwellmag.com/Uploads/default-icon.png')}
              />
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                {tip.title}
              </h3>
              <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto p-8 w-full">
        <div className="bg-[var(--card-bg)] rounded-xl shadow-md p-8 border" style={{ borderColor: 'var(--link-color)' }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
            Weekly Wellness Insights
          </h2>
          <p className="text-base mb-6" style={{ color: 'var(--text-secondary)' }}>
            Subscribe to get science-backed health tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-3 rounded-lg border focus:ring-2 focus:ring-[var(--link-color)] transition-all duration-200"
              style={{ borderColor: 'var(--link-color)', backgroundColor: 'var(--placeholder-bg)', color: 'var(--foreground)' }}
            />
            <button className="py-3 px-6 rounded-lg btn-gradient text-white font-semibold">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}