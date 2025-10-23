export default function Footer() {
    return (
        <footer className="bg-[linear-gradient(to_right,_#3B82F6,_#9333EA)] text-white py-6 w-full mx-0">
            <div className="px-4 sm:px-6 lg:px-8 text-center">
                <p className="mb-4">
                    © 2025 Everwell Magazine. All rights reserved.
                </p>
                <div className="flex justify-center gap-6 flex-wrap">
                    <a
                        href="https://www.facebook.com/everwellmag" // Replace with actual URL
                        className="text-white hover:text-gray-200 transition"
                    >
                        Facebook
                    </a>
                    <a
                        href="https://x.com/everwellmag" // Replace with actual URL
                        className="text-white hover:text-gray-200 transition"
                    >
                        X
                    </a>
                    <a
                        href="https://www.instagram.com/everwellmag" // Replace with actual URL
                        className="text-white hover:text-gray-200 transition"
                    >
                        Instagram
                    </a>
                </div>
                <p className="mt-4 text-sm text-white flex flex-wrap justify-center gap-x-2 gap-y-1">
                    Contact us: <a href="mailto:support@everwellmag.com" className="hover:underline">support@everwellmag.com</a> |
                    <a href="/terms" className="hover:underline">Terms</a> |
                    <a href="/privacy" className="hover:underline">Privacy</a> |
                    <a href="/affiliate-disclosure" className="hover:underline">Affiliate Disclosure</a> |
                    <a href="/medical-disclaimer" className="hover:underline">Medical Disclaimer</a>
                </p>
            </div>
        </footer>
    );
}