"use client";

import Link from "next/link";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full bg-gray-900 dark:bg-gray-800 text-white py-3 px-6 flex gap-4 items-center">
      <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
      <Link href="/about" className="hover:text-yellow-300 transition">About</Link>
      <button
        onClick={toggleTheme}
        className="ml-auto px-3 py-1 text-sm border border-gray-600 rounded hover:bg-gray-700 transition"
        aria-label="Toggle dark mode"
      >
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </nav>
  );
}
