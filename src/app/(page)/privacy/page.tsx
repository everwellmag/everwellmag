import Head from "next/head";

export default function PrivacyPolicy() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <Head>
                <title>Privacy Policy | everwellmagazine</title>
                <meta
                    name="description"
                    content="Privacy Policy for everwellmagazine: Learn how we collect, use, and protect your information while using our website."
                />
            </Head>

            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <p className="mb-4">
                <strong>Last Updated:</strong> {new Date().getFullYear()}
            </p>

            <p className="mb-4">
                At <strong>everwellmagazine</strong>, we respect your privacy and are committed to protecting
                your personal information. This Privacy Policy outlines how we collect, use,
                and safeguard your data when you visit our website.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
            <p className="mb-4">
                We may collect personal information such as your name, email address, and IP
                address when you interact with our website — for example, by subscribing to
                newsletters, leaving comments, or making inquiries.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
            <p className="mb-4">
                We use collected information to improve our website, personalize content, respond
                to inquiries, and provide relevant product recommendations. We may also use analytics
                tools like Google Analytics to understand user behavior.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">3. Cookies</h2>
            <p className="mb-4">
                Our website uses cookies to enhance your browsing experience. You can choose to
                disable cookies through your browser settings, but some parts of the website may
                not function properly as a result.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">4. Third-Party Links</h2>
            <p className="mb-4">
                Our site may contain links to third-party websites, including affiliate links.
                We are not responsible for the privacy practices or content of those sites.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">5. Your Consent</h2>
            <p className="mb-4">
                By using our website, you consent to our Privacy Policy and agree to its terms.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">6. Updates</h2>
            <p className="mb-4">
                We may update this Privacy Policy from time to time. Any changes will be posted
                on this page with an updated revision date.
            </p>

            <p>
                For questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:support@everwellmagazine.com" className="text-blue-600 underline">
                    support@everwellmagazine.com
                </a>.
            </p>
        </div>
    );
}