// src/components/layout/navbar.tsx
'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/ui/search-bar';
import ThemeSwitcher from '@/components/ui/theme-switcher';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
        setOpenSubMenu(null);
    };

    const toggleSubMenu = (index: number) => {
        setOpenSubMenu(prev => (prev === index ? null : index));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;

        const deltaX = touchEndX.current - touchStartX.current;

        if (isMenuOpen && deltaX < -100) {
            toggleMenu();
        } else if (!isMenuOpen && deltaX > 100) {
            setIsMenuOpen(true);
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    const menuItems = [
        { href: '/', label: 'Home' },
        {
            href: '/weight-loss',
            label: 'Weight Loss',
            subItems: [
                { href: '/weight-loss/diet-plan', label: 'Diet Plan' },
                { href: '/weight-loss/workout-plan', label: 'Workout Plan' },
                { href: '/weight-loss/weight-loss-supplements', label: 'Weight Loss Supplements' },
            ],
        },
        {
            href: '/blood-sugar',
            label: 'Blood Sugar',
            subItems: [
                { href: '/blood-sugar/diet-plan-for-blood-sugar', label: 'Diet Tips' },
                { href: '/blood-sugar/common-blood-sugar-issues', label: 'Common Blood Sugar Issues' },
                { href: '/blood-sugar/supplements-for-blood-sugar', label: 'Blood Sugar Supplements' },
            ],
        },
        {
            href: '/eye-health',
            label: 'Eye Health',
            subItems: [
                { href: '/eye-health/eye-care-tips', label: 'Eye Care Tips' },
                { href: '/eye-health/common-eye-conditions', label: 'Common Eye Issues' },
                { href: '/eye-health/supplements-for-eye-health', label: 'Supplements for Eye' },
            ],
        },
        {
            href: '/heart-health',
            label: 'Heart Health',
            subItems: [
                { href: '/heart-health/common-heart-conditions', label: 'Common Heart Conditions' },
                { href: '/heart-health/heart-care-tips', label: 'Heart Care Tips' },
                { href: '/heart-health/supplements-for-heart-health', label: 'Supplements for Heart Health' },
            ],
        },
        {
            href: '/mens-health',
            label: "Men's Health",
            subItems: [
                { href: '/mens-health/common-mens-health-issues', label: "Common Men’s Health Issues" },
                { href: '/mens-health/mens-care-tips', label: "Men’s Care Tips" },
                { href: '/mens-health/supplements-for-mens-health', label: "Supplements for Men’s Health" },
            ],
        },
        {
            href: '/womens-health',
            label: "Women's Health",
            subItems: [
                { href: '/womens-health/common-womens-health-issues', label: "Common Women’s Health Issues" },
                { href: '/womens-health/supplements-for-womens-health', label: "Supplements for Women’s Health" },
                { href: '/womens-health/womens-care-tips', label: "Women’s Care Tips" },
            ],
        },
        {
            href: '/mind-sleep',
            label: 'Mind & Sleep',
            subItems: [
                { href: '/mind-sleep/common-mind-sleep', label: 'Common Mind & Sleep' },
                { href: '/mind-sleep/supplements-mind-sleep', label: 'Supplements for Mind & Sleep' },
            ],
        },
    ];

    return (
        <nav className="bg-gradient-blue-purple text-white fixed top-0 left-0 w-full z-50 shadow-lg">
            {/* Navbar Content */}
            <div className="px-4 sm:px-8 lg:px-12 mx-auto max-w-7xl w-full md:w-auto">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="https://cms.everwellmagazine.com/uploads/logo_everwell_magazine_156480b913.svg"
                            alt="EverWell Magazine"
                            width={220}
                            height={0}
                            style={{ height: 'auto' }}
                            priority
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-4 flex-1 justify-end whitespace-nowrap">
                        <div className="flex items-center gap-4">
                            {menuItems.map((item, i) => (
                                <div key={i} className="relative group">
                                    <Link
                                        href={item.href}
                                        className="py-2 font-medium hover:bg-white/10 rounded-md px-3 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                    {item.subItems && (
                                        <div className="absolute top-full left-0 mt-1 min-w-max bg-gradient-blue-purple text-white shadow-xl rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                            {item.subItems.map((sub, j) => (
                                                <Link
                                                    key={j}
                                                    href={sub.href}
                                                    className="block px-3 py-2 text-base hover:bg-white/10 rounded transition-colors whitespace-nowrap text-left"
                                                >
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="ml-4">
                            <SearchBar />
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden p-2"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu – FULL WIDTH, MƯỢT NHƯ FILE CŨ */}
            <div
                className={`md:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={toggleMenu}
            />
            <div
                className={`md:hidden fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-blue-purple shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="flex flex-col h-full overflow-y-auto p-6">
                    {/* Close Button */}
                    <div className="flex justify-end mb-6">
                        <button onClick={toggleMenu} className="text-white p-2">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Search – KHÔNG ĐÓNG MENU */}
                    <div className="mb-6">
                        <SearchBar isMobile />
                    </div>

                    {/* Menu Items */}
                    {menuItems.map((item, index) => (
                        <div key={index} className="border-b border-white/10 last:border-0">
                            <div className="flex justify-between items-center py-3">
                                <Link
                                    href={item.href}
                                    onClick={toggleMenu}
                                    className="text-lg font-medium text-white hover:text-blue-200 transition"
                                >
                                    {item.label}
                                </Link>
                                {item.subItems && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleSubMenu(index);
                                        }}
                                        className="text-white p-2"
                                    >
                                        <svg
                                            className={`w-5 h-5 transition-transform duration-200 ${openSubMenu === index ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {item.subItems && (
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubMenu === index ? 'max-h-96' : 'max-h-0'
                                        }`}
                                >
                                    <div className="pl-4 py-2 space-y-2">
                                        {item.subItems.map((sub, j) => (
                                            <Link
                                                key={j}
                                                href={sub.href}
                                                onClick={toggleMenu}
                                                className="block text-white/80 hover:text-white text-base py-1 transition"
                                            >
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Theme Switcher */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </nav>
    );
}