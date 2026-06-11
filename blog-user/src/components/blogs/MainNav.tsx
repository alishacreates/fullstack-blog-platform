import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';


const MainNav = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">

             {/* Hamburger */}
      <button
        className="mr-4"
      >
        <Menu className="display: hidden w-6 h-6 text-gray-800" />
      </button>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            {/* Points/Credits Badge */}
            <div className="flex items-center gap-2 bg-amber-50 rounded-full px-3 py-1.5">
              <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-amber-900">BK</span>
              </div>
              <span className="text-sm font-semibold text-gray-700">100</span>
            </div>

            {/* Shopping Cart */}
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>

            {/* Notifications */}
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>

            {/* User Profile */}
            <button className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-semibold hover:bg-cyan-600 transition-colors">
              <span>A</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;