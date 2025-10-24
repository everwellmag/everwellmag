import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">About Everwell Magazine</h1>
            <div className="prose max-w-3xl mx-auto">
                <p>
                    Everwell Magazine is your trusted source for health and wellness insights. We provide evidence-based articles and product reviews to help you live a healthier life. Our mission is to empower you with knowledge on nutrition, fitness, and overall well-being.
                </p>
                <p>
                    Founded in 2025, our team of experts curates content to guide you through your wellness journey. Whether you’re looking for diet plans, weight loss tips, or the best supplements, we’ve got you covered.
                </p>
                <p>
                    <Link href="/contact" className="text-blue-500 hover:underline">
                        Contact us
                    </Link>{' '}
                    to learn more or share your feedback!
                </p>
            </div>
        </div>
    );
}