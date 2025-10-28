import Head from "next/head";

export default function TermsAndConditions() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <Head>
                <title>Terms & Conditions | everwellmagazine</title>
                <meta
                    name="description"
                    content="Terms & Conditions for using EverWell Magazine — learn about our policies, disclaimers, and guidelines."
                />
            </Head>

            <h1 className="text-3xl font-bold mb-6">Terms &amp; Conditions</h1>

            <p className="mb-4">
                Welcome to <strong>everwellmagazine</strong>. By accessing or using our website,
                you agree to comply with these Terms &amp; Conditions. If you do not agree,
                please discontinue use of the site immediately.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Purpose of the Website</h2>
            <p className="mb-4">
                everwellmagazine provides informational content related to health, wellness,
                nutrition, weight management, and product recommendations. Some pages may include
                affiliate links to third-party websites. We do not sell products directly and are
                not responsible for any transactions between users and third-party sellers.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. No Medical Advice</h2>
            <p className="mb-4">
                All content on this website is for educational and informational purposes only.
                It is not intended to diagnose, treat, or replace medical guidance. Always seek the
                advice of qualified healthcare professionals before using any products or making
                changes to your health regimen.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Affiliate Disclosure</h2>
            <p className="mb-4">
                We may earn a commission from affiliate links at no additional cost to you. Our
                recommendations are based on honest opinions and research, but users should evaluate
                product information independently before purchasing.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Content Accuracy &amp; Changes</h2>
            <p className="mb-4">
                We strive to provide accurate and updated content but do not guarantee completeness
                or accuracy. Content may be changed, updated, or removed without prior notice.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Limitation of Liability</h2>
            <p className="mb-4">
                We are not liable for any losses, damage, or consequences arising from the use of
                this website or third-party products and services. All actions based on our content
                are taken at the user&apos;s own risk.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">6. External Links</h2>
            <p className="mb-4">
                Our content may include links to external websites we do not control. We are not
                responsible for the content, practices, or policies of any third-party websites.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to Terms</h2>
            <p className="mb-4">
                We may revise these Terms &amp; Conditions at any time. Continued use of the site
                after updates means you accept the revised terms.
            </p>

            <p className="mt-10">
                If you have any questions regarding these Terms &amp; Conditions, please contact us at{" "}
                <a href="mailto:support@everwellmagazine.com" className="text-blue-600 underline">
                    support@everwellmagazine.com
                </a>.
            </p>
        </div>
    );
}
