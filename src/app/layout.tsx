import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EverWell Magazine",
  description: "Your source for wellness content",
  verification: {
    google: "E5RD3D753jQq557Fg3lZTj1BYRwNTDV-mgF-3goTXBs", // ✅ Google Search Console
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9CYT8WFQCV"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9CYT8WFQCV');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <footer className="bg-blue-900 text-white py-6 w-full mx-0">
          <div className="px-4 sm:px-6 lg:px-8 text-center">
            <p className="mb-4">
              © 2025 EverWell Magazine. All rights reserved.
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <a
                href="#"
                className="text-blue-200 hover:text-white transition"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition"
              >
                Instagram
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Contact us: support@everwellmag.com | Terms | Privacy
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
