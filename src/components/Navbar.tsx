"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenSubMenu(null);
  };

  const toggleSubMenu = (index: number) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const menuItems = [
    { href: "/", label: "Home" },
    {
      href: "/weight-loss",
      label: "Weight Loss",
      subItems: [
        { href: "/weight-loss/weight-loss-foods", label: "Weight Loss Foods" },
        { href: "/weight-loss/diet-plan", label: "Diet Plan" },
        { href: "/weight-loss/workout-plan", label: "Workout Plan" },
      ],
    },
    {
      href: "/blood-sugar",
      label: "Blood Sugar",
      subItems: [
        { href: "/blood-sugar/monitoring", label: "Blood Sugar Monitoring" },
        { href: "/blood-sugar/diet-tips", label: "Diet Tips" },
        { href: "/blood-sugar/exercise", label: "Exercise for Control" },
      ],
    },
    {
      href: "/eye-health",
      label: "Eye Health",
      subItems: [
        { href: "/eye-health/vision-care", label: "Vision Care Tips" },
        { href: "/eye-health/eye-exercises", label: "Eye Exercises" },
        { href: "/eye-health/common-issues", label: "Common Eye Issues" },
      ],
    },
    {
      href: "/heart-health",
      label: "Heart Health",
      subItems: [
        { href: "/heart-health/heart-diet", label: "Heart-Healthy Diet" },
        { href: "/heart-health/exercise", label: "Cardio Exercises" },
        { href: "/heart-health/risk-factors", label: "Risk Factors" },
      ],
    },
    {
      href: "/mens-health",
      label: "Men's Health",
      subItems: [
        { href: "/mens-health/fitness", label: "Fitness for Men" },
        { href: "/mens-health/nutrition", label: "Nutrition Guide" },
        { href: "/mens-health/mental-health", label: "Mental Wellness" },
      ],
    },
    {
      href: "/womens-health",
      label: "Women's Health",
      subItems: [
        { href: "/womens-health/hormonal-health", label: "Hormonal Health" },
        { href: "/womens-health/fitness", label: "Fitness for Women" },
        { href: "/womens-health/wellness", label: "Wellness Tips" },
      ],
    },
    {
      href: "/mind-sleep",
      label: "Mind & Sleep",
      subItems: [
        { href: "/mind-sleep/meditation", label: "Meditation Techniques" },
        { href: "/mind-sleep/sleep-hygiene", label: "Sleep Hygiene" },
        { href: "/mind-sleep/stress-relief", label: "Stress Relief" },
      ],
    },
    {
      href: "/supplements",
      label: "Supplements",
      subItems: [
        { href: "/supplements/vitamins", label: "Essential Vitamins" },
        { href: "/supplements/minerals", label: "Key Minerals" },
        { href: "/supplements/herbal", label: "Herbal Supplements" },
      ],
    },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-blue-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <style jsx>{`
        .dropdown-menu {
          min-width: fit-content;
          white-space: nowrap;
          transition: visibility 0s linear 0.2s, opacity 0.2s linear;
          visibility: hidden;
          opacity: 0;
        }
        .group:hover .dropdown-menu {
          visibility: visible;
          opacity: 1;
          transition-delay: 0s;
        }
      `}</style>
      <div className="px-4 sm:px-6 lg:px-8 mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          EverWell Magazine
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-6">
          {menuItems.map((item, index) => (
            <div key={item.href} className="relative group">
              <Link href={item.href} className="hover:text-blue-200 transition">
                {item.label}
              </Link>
              {item.subItems && (
                <div className="dropdown-menu absolute bg-blue-900 text-white shadow-md rounded-md mt-2">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="block px-4 py-2 hover:bg-blue-800 transition"
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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-blue-900`}>
        <div className="flex flex-col gap-4 px-4 py-6">
          {menuItems.map((item, index) => (
            <div key={item.href}>
              <div className="flex justify-between items-center">
                <Link
                  href={item.href}
                  className="hover:text-blue-200 transition"
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
                {item.subItems && (
                  <button
                    className="text-white focus:outline-none"
                    onClick={() => toggleSubMenu(index)}
                  >
                    <svg
                      className={`w-4 h-4 transform ${openSubMenu === index ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
              {item.subItems && openSubMenu === index && (
                <div className="pl-4 flex flex-col gap-2 mt-2">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="hover:text-blue-200 transition"
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
  );
}