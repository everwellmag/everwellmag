"use client";

import { useState } from "react";
import Link from "next/link"; // Import Link từ next/link

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          EverWell Magazine
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-6">
          {[
            { href: "/", label: "Home" },
            { href: "/weight-loss", label: "Weight Loss" },
            { href: "/blood-sugar", label: "Blood Sugar" },
            { href: "/eye-health", label: "Eye Health" },
            { href: "/heart-health", label: "Heart Health" },
            { href: "/mens-health", label: "Men\'s Health" }, // Escape ký tự '
            { href: "/womens-health", label: "Women\'s Health" }, // Escape ký tự '
            { href: "/mind-sleep", label: "Mind & Sleep" },
            { href: "/supplements", label: "Supplements" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-blue-200 transition">
              {label}
            </Link>
          ))}
        </div>

        {/* Hamburger Button Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-blue-900`}>
        <div className="flex flex-col gap-4 px-4 py-6">
          {[
            { href: "/", label: "Home" },
            { href: "/weight-loss", label: "Weight Loss" },
            { href: "/blood-sugar", label: "Blood Sugar" },
            { href: "/eye-health", label: "Eye Health" },
            { href: "/heart-health", label: "Heart Health" },
            { href: "/mens-health", label: "Men\'s Health" }, // Escape ký tự '
            { href: "/womens-health", label: "Women\'s Health" }, // Escape ký tự '
            { href: "/mind-sleep", label: "Mind & Sleep" },
            { href: "/supplements", label: "Supplements" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-blue-200 transition"
              onClick={toggleMenu}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}