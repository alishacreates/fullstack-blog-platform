'use client';

import Link from 'next/link';
import { Menu, PenLine, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#26332f] bg-[#0b0f0e]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <button className="text-[#8a9a91] transition hover:text-[#f4f7f5] lg:hidden">
            <Menu size={22} />
          </button>

          <Link
            href="/"
            className="font-mono text-xl font-black tracking-[0.25em] text-[#a3e635]"
          >
            LOGBOOK_
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/blogs" className="font-mono text-sm text-[#8a9a91] transition hover:text-[#f4f7f5]">
              /articles
            </Link>
            <Link href="/categories" className="font-mono text-sm text-[#8a9a91] transition hover:text-[#f4f7f5]">
              /topics
            </Link>
            <Link href="/authors" className="font-mono text-sm text-[#8a9a91] transition hover:text-[#f4f7f5]">
              /writers
            </Link>
          </nav>
        </div>

        <div className="mx-8 hidden w-full max-w-sm items-center lg:flex">
          <div className="flex w-full items-center gap-3 border border-[#26332f] bg-[#111816] px-4 py-2.5">
            <Search size={17} className="text-[#8a9a91]" />
            <input
              type="text"
              placeholder="search notes..."
              className="w-full bg-transparent font-mono text-sm text-[#f4f7f5] outline-none placeholder:text-[#66746d]"
            />
            <span className="border border-[#26332f] px-2 py-0.5 font-mono text-xs text-[#8a9a91]">
              ⌘K
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden items-center gap-2 border border-[#a3e635] bg-[#a3e635] px-4 py-2.5 font-mono text-sm font-bold text-[#0b0f0e] transition hover:bg-transparent hover:text-[#a3e635] md:flex">
            <PenLine size={16} />
            New Entry
          </button>

          <div className="flex h-10 w-10 items-center justify-center border border-[#26332f] bg-[#111816] font-mono font-bold text-[#f4f7f5]">
            A
          </div>
        </div>
      </div>
    </header>
  );
}