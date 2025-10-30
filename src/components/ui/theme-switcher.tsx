// src/components/ui/theme-switcher.tsx
'use client';

import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "auto" | null;
        if (savedTheme) {
            setTheme(savedTheme);
            applyTheme(savedTheme);
        } else {
            applyTheme("auto");
        }
    }, []);

    const applyTheme = (theme: "light" | "dark" | "auto") => {
        const root = document.documentElement;
        if (theme === "auto") {
            root.removeAttribute("data-theme");
            localStorage.setItem("theme", "auto");
        } else {
            root.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    };

    const handleThemeChange = (newTheme: "light" | "dark" | "auto") => {
        setTheme(newTheme);
        applyTheme(newTheme);
    };

    return (
        <div className="flex justify-center gap-2 flex-wrap">
            <button
                onClick={() => handleThemeChange("light")}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2 ${theme === "light"
                    ? "bg-white/40 text-[var(--nav-foreground)]"
                    : "bg-white/10 text-[var(--nav-foreground)] hover:bg-white/30"
                    }`}
                aria-label="Switch to light mode"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
                Light
            </button>
            <button
                onClick={() => handleThemeChange("dark")}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2 ${theme === "dark"
                    ? "bg-white/40 text-[var(--nav-foreground)]"
                    : "bg-white/10 text-[var(--nav-foreground)] hover:bg-white/30"
                    }`}
                aria-label="Switch to dark mode"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                Dark
            </button>
            <button
                onClick={() => handleThemeChange("auto")}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2 ${theme === "auto"
                    ? "bg-white/40 text-[var(--nav-foreground)]"
                    : "bg-white/10 text-[var(--nav-foreground)] hover:bg-gradient-blue-purple-hover"
                    }`}
                aria-label="Switch to auto mode"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-6a1 1 0 112 0 1 1 0 01-2 0z" />
                </svg>
                Auto
            </button>
        </div>
    );
}