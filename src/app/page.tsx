// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import SiteSchema from '@/components/layout/seo/site-schema';

export const dynamic = 'force-static';

const categories = [
  {
    id: 1,
    slug: 'weight-loss',
    name: 'Weight Loss',
    description: 'Explore diet plans, workouts, and supplements for healthy, sustainable weight loss.',
    image: { url: 'https://cms.everwellmagazine.com/uploads/weight_loss_supplements_c5f8cbdcec.webp', alternativeText: 'Weight Loss' },
  },
  {
    id: 2,
    slug: 'blood-sugar',
    name: 'Blood Sugar',
    description: 'Manage blood sugar with expert diet tips and top-rated supplements.',
    image: { url: 'https://cms.everwellmagazine.com/uploads/blood_sugar_issues_6f8b3f2f30.webp', alternativeText: 'Blood Sugar' },
  },
  {
    id: 3,
    slug: 'eye-health',
    name: 'Eye Health',
    description: 'Protect your vision with care tips and supplements for optimal eye health.',
    image: { url: 'https://cms.everwellmagazine.com/uploads/Common_Eye_Conditions_435281392e.webp', alternativeText: 'Eye Health' },
  },
  {
    id: 4,
    slug: 'heart-health',
    name: 'Heart Health',
    description: 'Support your heart with tips and supplements for cardiovascular wellness.',
    image: { url: 'https://cms.everwellmagazine.com/uploads/everwell_magazine_banner_91a7caaa15.webp', alternativeText: 'Heart Health' },
  },
  {
    id: 5,
    slug: 'mens-health',
    name: "Men&apos;s Health",
    description: 'Address men’s health issues with care tips and targeted supplements.',
    image: { url: 'https://cms.everwellmagazine.com/uploads/Common_Men_s_Health_Issues_a39fbb1616.webp', alternativeText: "Men's Health" },
  },
  {
    id: 6,
    slug: 'womens-health',
    name: "Women&apos;s Health",
    description: 'Discover solutions for women’s health and wellness with expert advice.',
    image: { url: 'https://cms.everwellmagazine.com/uploads/Common_Women_s_Health_Issues_790bf93ba9.webp', alternativeText: "Women's Health" },
  },
  {
    id: 7,
    slug: 'mind-sleep',
    name: 'Mind & Sleep',
    description: 'Boost mental clarity and improve sleep with wellness tips and supplements.',
    image: { url: 'https://cms.everwellmagazine.com/uploads/Common_Mind_Sleep_Issues_3dbee0cbdf.webp', alternativeText: 'Mind & Sleep' },
  },
];

export default function Home() {
  return (
    <>
      <SiteSchema />

      <section className="relative h-[75vh] min-h-[600px] overflow-hidden">
        <Image
          src="https://cms.everwellmagazine.com/uploads/everwell_magazine_banner_91a7caaa15.webp"
          alt="Everwell Magazine – Your Health Journey Starts Here"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Everwell Magazine
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-3xl opacity-90">
            Science-backed insights, honest reviews, and premium supplements for the modern American lifestyle.
          </p>
          <Link
            href="/weight-loss"
            className="inline-block px-10 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-transparent to-[var(--card-bg)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Expert Articles', value: 'Updating' },
              { label: 'Trusted Brands', value: 'Updating' },
              { label: 'Happy Readers', value: 'Updating' },
              { label: 'Years of Research', value: 'Updating' },
            ].map((stat, i) => (
              <div key={i} className="group">
                <p className="text-3xl md:text-3xl font-bold text-[var(--foreground)] group-hover:text-[var(--link-hover)] transition-all duration-300">
                  {stat.value}
                </p>
                <p className="text-sm mt-2 font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: 'var(--title-color)' }}>
          Explore Health Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={cat.image.url}
                  alt={cat.image.alternativeText}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm opacity-90 line-clamp-2">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: 'var(--title-color)' }}>
            Our Mission
          </h2>
          <p className="text-lg md:text-xl max-w-5xl mx-auto leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
            At <strong>Everwell Magazine</strong>, we deliver <strong>science-backed insights</strong>,
            <strong> honest supplement reviews</strong>, and <strong>practical health advice</strong> —
            all tailored for the modern American lifestyle.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <span className="px-4 py-2 rounded-full bg-[var(--card-bg)] border" style={{ borderColor: 'var(--border-color)' }}>
              Scientifically Verified
            </span>
            <span className="px-4 py-2 rounded-full bg-[var(--card-bg)] border" style={{ borderColor: 'var(--border-color)' }}>
              Doctor-Reviewed
            </span>
            <span className="px-4 py-2 rounded-full bg-[var(--card-bg)] border" style={{ borderColor: 'var(--border-color)' }}>
              No BS, Just Results
            </span>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[var(--background)] to-transparent">
        <div className="container mx-auto px-4 text-center">
          dziesię          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--title-color)' }}>
            Ready to Transform Your Health?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Join thousands who trust Everwell for real, lasting results.
          </p>
          <Link
            href="/weight-loss"
            className="inline-block px-12 py-5 rounded-full text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Explore Now – It&apos;s Free
          </Link>
        </div>
      </section>
    </>
  );
}