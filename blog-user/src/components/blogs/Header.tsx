import { Menu, X } from 'lucide-react';

type HeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30">
              <svg
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Emple
            </span>
          </div>
        </div>

        {/* Center Links */}
        <div className="hidden items-center gap-8 md:flex">
          <a className="text-sm font-medium text-slate-700 hover:text-orange-600">
            Articles
          </a>
          <a className="text-sm font-medium text-slate-700 hover:text-orange-600">
            Authors
          </a>
          <a className="text-sm font-medium text-slate-700 hover:text-orange-600">
            Newsletter
          </a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg">
            Subscribe
          </button>
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-orange-200">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

      </nav>
    </header>
  );
}
