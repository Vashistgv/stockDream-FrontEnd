"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const username = "john_doe"; // Replace with actual auth context

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="w-full bg-[rgb(var(--color-card))] border-b border-[rgb(var(--color-border))] px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer group"
        onClick={() => router.push("/dashboard")}
      >
        <div className="w-10 h-10 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] rounded-lg flex items-center justify-center mr-3">
          <span className="text-white font-bold text-xl">FS</span>
        </div>
        <span className="font-bold text-xl text-[rgb(var(--color-primary))] group-hover:text-[rgb(var(--color-accent))] transition-colors">
          Fantasy Stocks
        </span>
      </div>

      {/* User Menu */}
      <div className="relative">
        {!username ? (
          <button
            className="bg-[rgb(var(--color-primary))] text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        ) : (
          <div
            className="relative"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <div className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-[rgb(var(--color-bg))] rounded-lg hover:bg-[rgb(var(--color-primary))]/10 transition-colors">
              <div className="w-8 h-8 bg-[rgb(var(--color-primary))] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {username.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="font-medium text-[rgb(var(--color-text))]">
                {username}
              </span>
              <svg
                className="w-4 h-4 text-[rgb(var(--color-text-secondary))]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 top-12 bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-lg shadow-lg min-w-[140px] py-2 z-50">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-[rgb(var(--color-danger))]/10 text-[rgb(var(--color-danger))] font-medium transition-colors"
                  onClick={() => {
                    // Add logout logic here
                    router.push("/");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
