"use client";

import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">
          EverWell Magazine
        </a>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-6">
          <a href="/" className="hover:text-blue-200 transition">Home</a>
          <a href="/weight-loss" className="hover:text-blue-200 transition">Weight Loss</a>
          <a href="/blood-sugar" className="hover:text-blue-200 transition">Blood Sugar</a>
          <a href="/eye-health" className="hover:text-blue-200 transition">Eye Health</a>
          <a href="/heart-health" className="hover:text-blue-200 transition">Heart Health</a>
          <a href="/mens-health" className="hover:text-blue-200 transition">Men's Health</a>
          <a href="/womens-health" className="hover:text-blue-200 transition">Women's Health</a>
          <a href="/mind-sleep" className="hover:text-blue-200 transition">Mind & Sleep</a>
          <a href="/supplements" className="hover:text-blue-200 transition">Supplements</a>
          <a href="/about" className="hover:text-blue-200 transition">About</a>
          <a href="/contact" className="hover:text-blue-200 transition">Contact</a>
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
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-blue-900`}>
        <div className="flex flex-col gap-4 px-4 py-6">
          <a href="/" className="hover:text-blue-200 transition" onClick={toggleMenu}>Home</a>
          <a href="/weight-loss" className="hover:text-blue-200 transition" onClick={toggleMenu}>Weight Loss</a>
          <a href="/blood-sugar" className="hover:text-blue-200 transition" onClick={toggleMenu}>Blood Sugar</a>
          <a href="/eye-health" className="hover:text-blue-200 transition" onClick={toggleMenu}>Eye Health</a>
          <a href="/heart-health" className="hover:text-blue-200 transition" onClick={toggleMenu}>Heart Health</a>
          <a href="/mens-health" className="hover:text-blue-200 transition" onClick={toggleMenu}>Men's Health</a>
          <a href="/womens-health" className="hover:text-blue-200 transition" onClick={toggleMenu}>Women's Health</a>
          <a href="/mind-sleep" className="hover:text-blue-200 transition" onClick={toggleMenu}>Mind & Sleep</a>
          <a href="/supplements" className="hover:text-blue-200 transition" onClick={toggleMenu}>Supplements</a>
          <a href="/about" className="hover:text-blue-200 transition" onClick={toggleMenu}>About</a>
          <a href="/contact" className="hover:text-blue-200 transition" onClick={toggleMenu}>Contact</a>
        </div>
      </div>
    </nav>
  );
}