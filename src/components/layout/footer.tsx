"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const logoUrl = 'https://cms.everwellmag.com/uploads/logo_everwell_magazine_156480b913.svg';
    const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");

    // Khởi tạo theme từ localStorage hoặc mặc định là "auto"
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "auto" | null;
        if (savedTheme) {
            setTheme(savedTheme);
            applyTheme(savedTheme);
        } else {
            applyTheme("auto");
        }
    }, []);

    // Hàm áp dụng theme
    const applyTheme = (theme: "light" | "dark" | "auto") => {
        const root = document.documentElement;
        if (theme === "auto") {
            // Xóa thuộc tính data-theme để dùng prefers-color-scheme
            root.removeAttribute("data-theme");
            localStorage.setItem("theme", "auto");
        } else {
            // Đặt data-theme để buộc light hoặc dark
            root.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    };

    // Xử lý khi nhấn nút
    const handleThemeChange = (newTheme: "light" | "dark" | "auto") => {
        setTheme(newTheme);
        applyTheme(newTheme);
    };

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
                                    src="https://cms.everwellmag.com/uploads/everwellmag_facebook_icon_09fa45467d.svg"
                                    alt="Facebook"
                                    width={40}
                                    height={40}
                                />
                            </a>
                            <a
                                href="https://x.com/everwellmag"
                                className="flex items-center justify-center w-10 h-10 border border-white/30 rounded-full hover:rotate-12 hover:scale-110 transition-all duration-300"
                                aria-label="X (Twitter)"
                            >
                                <Image
                                    src="https://cms.everwellmag.com/uploads/everwellmag_X_icon_7240bb70e5.svg?"
                                    alt="X"
                                    width={40}
                                    height={40}
                                />
                            </a>
                            <a
                                href="https://www.instagram.com/everwellmag"
                                className="flex items-center justify-center w-10 h-10 border border-white/30 rounded-full hover:rotate-12 hover:scale-110 transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Image
                                    src="https://cms.everwellmag.com/uploads/everwellmag_instagram_icon_21526d5407.svg"
                                    alt="Instagram"
                                    width={40}
                                    height={40}
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

                {/* Phần chuyển chế độ */}
                <div className="mt-6 flex justify-center gap-2 flex-wrap">
                    <button
                        onClick={() => handleThemeChange("light")}
                        className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2 ${theme === "light"
                            ? "bg-gradient-blue-purple-hover text-[var(--nav-foreground)]"
                            : "bg-gradient-blue-purple text-[var(--nav-foreground)] hover:bg-gradient-blue-purple-hover"
                            }`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                        </svg>
                        Light
                    </button>
                    <button
                        onClick={() => handleThemeChange("dark")}
                        className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2 ${theme === "dark"
                            ? "bg-gradient-blue-purple-hover text-[var(--nav-foreground)]"
                            : "bg-gradient-blue-purple text-[var(--nav-foreground)] hover:bg-gradient-blue-purple-hover"
                            }`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                        Dark
                    </button>
                    <button
                        onClick={() => handleThemeChange("auto")}
                        className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2 ${theme === "auto"
                            ? "bg-gradient-blue-purple-hover text-[var(--nav-foreground)]"
                            : "bg-gradient-blue-purple text-[var(--nav-foreground)] hover:bg-gradient-blue-purple-hover"
                            }`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-6a1 1 0 112 0 1 1 0 01-2 0z" />
                        </svg>
                        Auto
                    </button>
                </div>

                {/* Divider */}
                <div className="mt-4 border-t border-white/20 pt-6 text-center text-xs opacity-80">
                    <p>Designed with ❤️ for health enthusiasts</p>
                </div>
            </div>
        </footer>
    );
}