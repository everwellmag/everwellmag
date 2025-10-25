import Link from 'next/link';
import Image from 'next/image';
import SiteSchema from '@/components/layout/seo/site-schema';

const categories = [
  {
    slug: 'weight-loss',
    name: 'Weight Loss',
    description: 'Explore diet plans, workouts, and supplements for healthy, sustainable weight loss.',
    image: { url: 'https://cms.everwellmag.com/uploads/weight_loss_supplements_c5f8cbdcec.webp', alternativeText: 'Weight Loss' },
  },
  {
    slug: 'blood-sugar',
    name: 'Blood Sugar',
    description: 'Manage blood sugar with expert diet tips and top-rated supplements.',
    image: { url: 'https://cms.everwellmag.com/uploads/blood_sugar_issues_6f8b3f2f30.webp', alternativeText: 'Blood Sugar' },
  },
  {
    slug: 'eye-health',
    name: 'Eye Health',
    description: 'Protect your vision with care tips and supplements for optimal eye health.',
    image: { url: 'https://cms.everwellmag.com/uploads/Common_Eye_Conditions_435281392e.webp', alternativeText: 'Eye Health' },
  },
  {
    slug: 'heart-health',
    name: 'Heart Health',
    description: 'Support your heart with tips and supplements for cardiovascular wellness.',
    image: { url: 'https://cms.everwellmag.com/uploads/everwell_magazine_banner_91a7caaa15.webp', alternativeText: 'Heart Health' },
  },
  {
    slug: 'mens-health',
    name: "Men's Health",
    description: 'Address men’s health issues with care tips and targeted supplements.',
    image: { url: 'https://cms.everwellmag.com/uploads/Common_Men_s_Health_Issues_a39fbb1616.webp', alternativeText: "Men's Health" },
  },
  {
    slug: 'womens-health',
    name: "Women's Health",
    description: 'Discover solutions for women’s health and wellness with expert advice.',
    image: { url: 'https://cms.everwellmag.com/uploads/Common_Women_s_Health_Issues_790bf93ba9.webp', alternativeText: "Women's Health" },
  },
  {
    slug: 'mind-sleep',
    name: 'Mind & Sleep',
    description: 'Boost mental clarity and improve sleep with wellness tips and supplements.',
    image: { url: 'https://cms.everwellmag.com/uploads/Common_Mind_Sleep_Issues_3dbee0cbdf.webp', alternativeText: 'Mind & Sleep' },
  },
];

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <SiteSchema />

      {/* Hero Banner */}
      <section className="mb-12">
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
          <Image
            src="https://cms.everwellmag.com/uploads/everwell_magazine_banner_91a7caaa15.webp"
            alt="Everwell Magazine - Your Health Journey Starts Here"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-blue-purple bg-clip-text text-transparent">
              Everwell Magazine
            </h1>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="prose mb-12 mx-auto text-center">
        <p className="text-lg text-[var(--text-secondary)]">
          Welcome to Everwell Magazine, your trusted source for health and wellness insights, expert advice, and top-quality supplements tailored for the US audience.
        </p>
      </section>

      {/* Explore Categories */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-[var(--foreground)] text-center">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-lg overflow-hidden hover:-translate-y-2 transition-transform duration-300 dark:bg-[var(--card-bg-dark)] group"
            >
              <Image
                src={category.image.url}
                alt={category.image.alternativeText}
                width={400}
                height={250}
                className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-[var(--foreground)] bg-gradient-blue-purple bg-clip-text text-transparent">
                  {category.name}
                </h3>
                <p className="text-[var(--text-secondary)] line-clamp-2 mt-2">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}