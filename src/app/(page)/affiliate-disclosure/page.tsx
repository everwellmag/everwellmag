import Head from "next/head";

export default function AffiliateDisclosure() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <Head>
                <title>Affiliate Disclosure | EverWellmag</title>
                <meta
                    name="description"
                    content="Affiliate Disclosure: EverWellmag may earn commissions from affiliate links to products or services recommended on this site."
                />
            </Head>

            <h1 className="text-3xl font-bold mb-6">Affiliate Disclosure</h1>

            <p className="mb-4">
                At <strong>EverWellmag</strong>, we believe in transparency and honesty with our readers.
                As such, we want to disclose that some of the links on our website may be
                affiliate links. This means that we may earn a small commission when you
                click on a link and make a purchase — at no additional cost to you.
            </p>

            <p className="mb-4">
                These commissions help us maintain and improve the quality of the content we produce,
                ensuring that we can continue to provide valuable information and resources on
                health, wellness, fitness, and nutrition.
            </p>

            <p className="mb-4">
                We only recommend products or services that we genuinely believe can bring
                value to our readers. Our reviews and recommendations are always based on
                honest opinions and thorough research.
            </p>

            <p>
                If you have any questions about our affiliate relationships, please contact us at{" "}
                <a href="mailto:support@everwellmag.com" className="text-blue-600 underline">
                    support@everwellmag.com
                </a>.
            </p>
        </div>
    );
}
