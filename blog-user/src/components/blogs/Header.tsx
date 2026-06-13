"use client";

import Link from "next/link";
import { Menu, PenLine, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="h-[72px] border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-8">
          <button className="lg:hidden">
            <Menu size={22} />
          </button>

          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-indigo-600"
          >
            Readtheblog
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/explore"
              className="font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              Explore
            </Link>

            <Link
              href="/categories"
              className="font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              Categories
            </Link>

            <Link
              href="/authors"
              className="font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              Authors
            </Link>
          </nav>
        </div>

        {/* Search */}
        <div className="hidden lg:flex items-center w-full max-w-md mx-8">
          <div className="flex items-center gap-3 w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700">
            <PenLine size={16} />
            Write
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
            A
          </div>
        </div>
      </div>
    </header>
  );
}