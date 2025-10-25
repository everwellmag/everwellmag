import Head from "next/head";

export default function MedicalDisclaimer() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <Head>
                <title>Medical Disclaimer | EverWellmag</title>
                <meta
                    name="description"
                    content="Medical Disclaimer: The information provided by EverWellmag is for educational purposes only and not a substitute for professional medical advice."
                />
            </Head>

            <h1 className="text-3xl font-bold mb-6">Medical Disclaimer</h1>

            <p className="mb-4">
                The information provided by <strong>EverWellmag</strong> (“we,” “us,” or “our”)
                on this website is for general informational and educational purposes only.
                All information on the Site is provided in good faith; however, we make no
                representation or warranty of any kind regarding accuracy, adequacy, validity,
                reliability, or completeness of any information on the Site.
            </p>

            <p className="mb-4">
                Under no circumstance shall we have any liability to you for any loss or
                damage of any kind incurred as a result of the use of the site or reliance
                on any information provided. Your use of the site and your reliance on any
                information on the site is solely at your own risk.
            </p>

            <p className="mb-4">
                The content is not intended to be a substitute for professional medical advice,
                diagnosis, or treatment. Always seek the advice of your physician or other
                qualified healthcare provider with any questions you may have regarding a
                medical condition.
            </p>

            <p>
                Never disregard professional medical advice or delay seeking it because of
                something you have read on <strong>EverWellmag</strong>.
            </p>
        </div>
    );
}