import Head from "next/head";

export default function About() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <Head>
                <title>About Us | everwellmagazine</title>
                <meta
                    name="description"
                    content="Learn about EverWell Magazine — a health and wellness platform providing trusted insights, research-based articles, and product guidance."
                />
            </Head>

            <h1 className="text-3xl font-bold mb-6">About Us</h1>

            <p className="mb-4">
                Welcome to <strong>everwellmagazine</strong> — your trusted digital destination for
                health, wellness, nutrition, and lifestyle knowledge. Our mission is to empower
                individuals with reliable insights that support healthier and happier living.
            </p>

            <p className="mb-4">
                We believe that wellness is not just about diet or exercise — it’s a balanced
                approach to physical, mental, and emotional well-being. That’s why our content
                covers a wide range of topics including weight loss, supplements, daily habits,
                and tips backed by science-based research.
            </p>

            <p className="mb-4">
                At everwellmagazine, we are committed to providing:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Helpful and easy-to-understand health information</li>
                <li>Research-driven and transparent product reviews</li>
                <li>Guidance that encourages informed decision-making</li>
                <li>Up-to-date insights on wellness trends and lifestyle improvements</li>
            </ul>

            <p className="mb-4">
                We do not offer medical advice, but we aim to inspire healthier choices — and help
                you explore products and habits that fit your personal health journey.
            </p>

            <p className="mb-4">
                Some articles may include affiliate links, which allow us to maintain the quality
                of our content without impacting the price you pay. Our reviews remain unbiased
                and always reflect honest opinions and genuine research.
            </p>

            <p className="mb-10">
                Thank you for being part of our growing wellness community. We hope that everwellmagazine
                becomes a valuable resource in your pursuit of a better and more fulfilled life.
            </p>

            <p>
                For any questions, suggestions, or collaboration inquiries, please contact us at{" "}
                <a href="mailto:support@everwellmagazine.com" className="text-blue-600 underline">
                    support@everwellmagazine.com
                </a>.
            </p>
        </div>
    );
}
