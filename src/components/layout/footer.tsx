"use client";

import Link from "next/link";
import Image from "next/image";
import { DEFAULT_OG_LOGO } from "@/lib/config";
import ThemeSwitcher from "@/components/ui/theme-switcher";

export default function Footer() {
    const logoUrl = DEFAULT_OG_LOGO;

    return (
        <footer className="bg-gradient-blue-purple text-white py-12 w-full mx-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                    {/* Left: Logo + Copyright */}
                    <div className="text-center md:text-left md:col-span-1">
                        <div className="mb-4">
                            <Image
                                src={logoUrl}
                                alt="Everwell Magazine Logo"
                                width={200}
                                height={50}
                                priority
                                style={{
                                    aspectRatio: "200/50",
                                    objectFit: "contain",
                                }}
                                className="mx-auto md:mx-0"
                            />
                        </div>
                        <div className="mt-4 border-t border-white/20 pt-2 text-center text-xs opacity-80">
                            <p>Designed with ❤️ for health enthusiasts</p>
                        </div>
                    </div>

                    {/* Middle Left: Legal Links */}
                    <div className="text-center md:text-left md:col-span-1">
                        <h4 className="text-lg font-semibold mb-4">Legal Links</h4>
                        <ul className="space-y-2 text-sm opacity-90">
                            <li>
                                <Link href="/about" className="hover:underline">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:underline">
                                    Terms
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:underline">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href="/affiliate-disclosure" className="hover:underline">
                                    Affiliate Disclosure
                                </Link>
                            </li>
                            <li>
                                <Link href="/medical-disclaimer" className="hover:underline">
                                    Medical Disclaimer
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Middle Right: Social Links */}
                    <div className="flex flex-col items-center md:col-span-1">
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-6">
                            <a
                                href="https://www.facebook.com/everwellmagazine"
                                className="flex items-center justify-center w-10 h-10 border border-white/30 rounded-full hover:rotate-12 hover:scale-110 transition-all duration-300"
                                aria-label="Facebook"
                            >
                                <Image
                                    src="https://cms.everwellmagazine.com/uploads/everwellmag_facebook_icon_09fa45467d.svg"
                                    alt="Facebook"
                                    width={40}
                                    height={40}
                                    loading="lazy"
                                    style={{ aspectRatio: "1/1" }}
                                />
                            </a>
                            <a
                                href="https://x.com/everwellmagazine"
                                className="flex items-center justify-center w-10 h-10 border border-white/30 rounded-full hover:rotate-12 hover:scale-110 transition-all duration-300"
                                aria-label="X (Twitter)"
                            >
                                <Image
                                    src="https://cms.everwellmagazine.com/uploads/everwellmag_X_icon_7240bb70e5.svg"
                                    alt="X (Twitter)"
                                    width={40}
                                    height={40}
                                    loading="lazy"
                                    style={{ aspectRatio: "1/1" }}
                                />
                            </a>
                            <a
                                href="https://www.instagram.com/everwellmagazine"
                                className="flex items-center justify-center w-10 h-10 border border-white/30 rounded-full hover:rotate-12 hover:scale-110 transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Image
                                    src="https://cms.everwellmagazine.com/uploads/everwell_magazine_instagram_icon_2dbd914e6d.svg"
                                    alt="Instagram"
                                    width={40}
                                    height={40}
                                    loading="lazy"
                                    style={{ aspectRatio: "1/1" }}
                                />
                            </a>
                        </div>
                    </div>

                    {/* Right: Contact + Newsletter */}
                    <div className="text-center md:text-right md:col-span-1">
                        <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
                        <p className="text-sm mb-2 opacity-90">
                            Contact us:{" "}
                            <a
                                href="mailto:support@everwellmagazine.com"
                                className="hover:underline"
                            >
                                support@everwellmagazine.com
                            </a>
                        </p>
                        <form className="flex flex-col gap-2 mt-4 min-h-[100px]">
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

                {/* Theme Switcher with fixed height */}
                <div className="mt-6 min-h-[2rem] flex justify-center items-center">
                    <ThemeSwitcher />
                </div>

                {/* Divider */}
                <div className="mt-4 border-t border-white/20 pt-4 text-center text-xs opacity-80">
                    <p className="text-sm opacity-80">
                        © 2025 Everwell Magazine. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
