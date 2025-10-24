import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const logoUrl = 'https://cms.everwellmag.com/uploads/logo_everwell_magazine_156480b913.svg';

    return (
        <footer className="bg-gradient-blue-purple text-white py-12 w-full mx-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                    {/* Left: Logo + Copyright */}
                    <div className="text-center md:text-left md:col-span-1">
                        <div className="mb-4">
                            <Image
                                src={logoUrl}
                                alt="Everwell Magazine Logo"
                                width={200}
                                height={50}
                                className="mx-auto md:mx-0"
                            />
                        </div>
                        <p className="text-sm opacity-80">
                            © 2025 Everwell Magazine. All rights reserved.
                        </p>
                    </div>

                    {/* Middle Left: Quick Links - Dọc hoàn toàn, mỗi link 1 dòng */}
                    <div className="text-center md:text-left md:col-span-1">
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm opacity-90">
                            <li><Link href="/terms" className="hover:underline">Terms</Link></li>
                            <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
                            <li><Link href="/affiliate-disclosure" className="hover:underline">Affiliate Disclosure</Link></li>
                            <li><Link href="/medical-disclaimer" className="hover:underline">Medical Disclaimer</Link></li>
                        </ul>
                    </div>

                    {/* Middle Right: Social Links with Icons */}
                    <div className="flex flex-col items-center md:col-span-1">
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-6">
                            <a
                                href="https://www.facebook.com/everwellmag"
                                className="flex items-center justify-center w-10 h-10 border border-white/30 rounded-full hover:rotate-12 hover:scale-110 transition-all duration-300"
                                aria-label="Facebook"
                            >
                                <Image
                                    src="/images/icons/facebook.svg"
                                    alt="Facebook"
                                    width={20}
                                    height={20}
                                />
                            </a>
                            <a
                                href="https://x.com/everwellmag"
                                className="flex items-center justify-center w-10 h-10 border border-white/30 rounded-full hover:rotate-12 hover:scale-110 transition-all duration-300"
                                aria-label="X (Twitter)"
                            >
                                <Image
                                    src="/images/icons/twitter.svg"
                                    alt="X"
                                    width={20}
                                    height={20}
                                />
                            </a>
                            <a
                                href="https://www.instagram.com/everwellmag"
                                className="flex items-center justify-center w-10 h-10 border border-white/30 rounded-full hover:rotate-12 hover:scale-110 transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Image
                                    src="/images/icons/instagram.svg"
                                    alt="Instagram"
                                    width={20}
                                    height={20}
                                />
                            </a>
                        </div>
                    </div>

                    {/* Right: Contact + Newsletter (optional) */}
                    <div className="text-center md:text-right md:col-span-1">
                        <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
                        <p className="text-sm mb-2 opacity-90">
                            Contact us: <a href="mailto:support@everwellmag.com" className="hover:underline">support@everwellmag.com</a>
                        </p>
                        {/* Newsletter form simple - nếu muốn add, connect với api/subscribe */}
                        <form className="flex flex-col gap-2 mt-4">
                            <input
                                type="email"
                                placeholder="Subscribe to our newsletter"
                                className="px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:border-white/50"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-12 border-t border-white/20 pt-6 text-center text-xs opacity-80">
                    <p>Designed with ❤️ for health enthusiasts</p>
                </div>
            </div>
        </footer>
    );
}