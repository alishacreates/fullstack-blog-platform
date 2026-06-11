"use client";

import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  Monitor,
  MessageSquare,
  ShoppingCart,
  Map,
  GraduationCap,
  FileText,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <>
      {/* Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:static
          top-0 left-0 z-50
          h-screen w-64
          bg-gray-50 border-r border-gray-200
          p-4 flex flex-col
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-orange-500">
            emple
          </h1>
        </div>

      

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1">

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3  text-gray-600 rounded-lg"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Practice</span>
            
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <FolderOpen className="w-5 h-5" />
            <span className="font-medium">Resources</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Monitor className="w-5 h-5" />
            <span className="font-medium">ATS</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">AI Interview</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium">Tech Shop</span>
          </a>

           <a
            href="#"
            className="flex items-center gap-3 px-4 py-3  text-white bg-orange-500 hover:bg-gray-100 rounded-lg"
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Blogs</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Map className="w-5 h-5" />
            <span className="font-medium">Roadmaps</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <GraduationCap className="w-5 h-5" />
            <span className="font-medium">UPES</span>
          </a>

        </nav>
      </div>
    </>
  );
};

export default Sidebar;

