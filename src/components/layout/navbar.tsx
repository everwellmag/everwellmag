"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setOpenSubMenu(null);
    };

    const toggleSubMenu = (index: number) => {
        setOpenSubMenu(openSubMenu === index ? null : index);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current !== null && touchEndX.current !== null) {
            const deltaX = touchEndX.current - touchStartX.current;
            if (isMenuOpen && deltaX < -100) {
                setIsMenuOpen(false);
                setOpenSubMenu(null);
            }
            if (!isMenuOpen && deltaX > 100) {
                setIsMenuOpen(true);
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    const menuItems = [
        { href: "/", label: "Home" },
        {
            href: "/weight-loss",
            label: "Weight Loss",
            subItems: [
                { href: "/weight-loss/diet-plan", label: "Diet Plan" },
                { href: "/weight-loss/workout-plan", label: "Workout Plan" },
                { href: "/weight-loss/weight-loss-supplements", label: "Weight Loss Supplements" },
            ],
        },
        {
            href: "/blood-sugar",
            label: "Blood Sugar",
            subItems: [
                { href: "/blood-sugar/diet-plan-for-blood-sugar", label: "Diet Tips" },
                { href: "/blood-sugar/common-blood-sugar-issues", label: "Common Blood Sugar Issues" },
                { href: "/blood-sugar/supplements-for-blood-sugar", label: "Blood Sugar Supplements" },
            ],
        },
        {
            href: "/eye-health",
            label: "Eye Health",
            subItems: [
                { href: "/eye-health/eye-care-tips", label: "Eye Care Tips" },
                { href: "/eye-health/common-eye-conditions", label: "Common Eye Issues" },
                { href: "/eye-health/supplements-for-eye-health", label: "Supplements for Eye" },
            ],
        },
        {
            href: "/heart-health",
            label: "Heart Health",
            subItems: [
                { href: "/heart-health/common-heart-conditions", label: "Common Heart Conditions" },
                { href: "/heart-health/heart-care-tips", label: "Heart Care Tips" },
                { href: "/heart-health/supplements-for-heart-health", label: "Supplements for Heart Health" },
            ],
        },
        {
            href: "/mens-health",
            label: "Men's Health",
            subItems: [
                { href: "/mens-health/common-mens-health-issues", label: "Common Men’s Health Issues" },
                { href: "/mens-health/mens-care-tips", label: "Men’s Care Tips" },
                { href: "/mens-health/supplements-for-mens-health", label: "Supplements for Men’s Health" },
            ],
        },
        {
            href: "/womens-health",
            label: "Women's Health",
            subItems: [
                { href: "/womens-health/common-womens-health-issues", label: "Common Women’s Health Issues" },
                { href: "/womens-health/supplements-for-womens-health", label: "Supplements for Women’s Health" },
                { href: "/womens-health/womens-care-tips", label: "Women’s Care Tips" },
            ],
        },
        {
            href: "/mind-sleep",
            label: "Mind & Sleep",
            subItems: [
                { href: "/mind-sleep/common-mind-sleep", label: "Common Mind & Sleep" },
                { href: "/mind-sleep/supplements-mind-sleep", label: "Supplements for Mind & Sleep" },
            ],
        },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <>
            <Head>
                <style>{`
          .dropdown-menu, .submenu {
            visibility: hidden;
            opacity: 0;
            display: none;
          }
        `}</style>
            </Head>
            <nav className="bg-gradient-blue-purple text-white fixed top-0 left-0 w-full z-50 shadow-lg">
                <div className="px-6 sm:px-8 lg:px-12 mx-auto flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="https://cms.everwellmag.com/uploads/logo_everwell_magazine_156480b913.svg"
                            alt="EverWell Magazine Logo"
                            width={240}
                            height={0}
                            style={{ height: 'auto' }}
                            priority
                        />
                        <span className="sr-only">EverWell Magazine</span>
                    </Link>


                    {/* Menu Desktop */}
                    <div className="hidden md:flex gap-8">
                        {menuItems.map((item) => (
                            <div key={item.href} className="relative group">
                                <Link
                                    href={item.href}
                                    className="py-2 font-medium text-white hover:bg-white/10 rounded-md transition-colors duration-200 truncate max-w-[160px]"
                                >
                                    {item.label}
                                </Link>
                                {item.subItems && (
                                    <div className="dropdown-menu absolute top-full left-0 bg-gradient-blue-purple-hover text-white shadow-lg rounded-lg p-2 min-w-[300px] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300">
                                        {item.subItems.map((subItem) => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className="block px-4 py-2 text-base hover:bg-white/10 rounded transition-colors duration-200 truncate"
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Hamburger Button Mobile */}
                    <button
                        className="md:hidden text-white focus:outline-none"
                        aria-label="Toggle menu"
                        onClick={toggleMenu}
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden fixed top-0 right-0 w-full h-full max-h-[100vh] bg-gradient-blue-purple overflow-y-auto transform ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                        } transition-all duration-300 ease-in-out`}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="flex flex-col gap-3 px-6 py-8">
                        {/* Close Button */}
                        <button
                            className="self-end text-white focus:outline-none mb-4"
                            aria-label="Close menu"
                            onClick={toggleMenu}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {menuItems.map((item, index) => (
                            <div key={item.href}>
                                <div className="flex justify-between items-center">
                                    <Link
                                        href={item.href}
                                        className="text-xl font-medium text-white hover:text-blue-200 transition-colors duration-200 py-3"
                                        onClick={toggleMenu}
                                    >
                                        {item.label}
                                    </Link>
                                    {item.subItems && (
                                        <button
                                            className="text-white focus:outline-none p-3"
                                            onClick={() => toggleSubMenu(index)}
                                        >
                                            <svg
                                                className={`w-6 h-6 transform transition-transform duration-200 ${openSubMenu === index ? "rotate-180" : ""
                                                    }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                {item.subItems && (
                                    <div
                                        className={`pl-6 flex flex-col gap-3 mt-2 submenu overflow-hidden ${openSubMenu === index ? "max-h-[500px]" : "max-h-0"
                                            } transition-all duration-300 ease-in-out`}
                                    >
                                        {item.subItems.map((subItem) => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className="text-lg text-white hover:text-blue-200 transition-colors duration-200 py-2"
                                                onClick={toggleMenu}
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}