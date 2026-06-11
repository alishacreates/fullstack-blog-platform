'use client';

import { Search, ChevronDown } from 'lucide-react';
import { FormEvent } from 'react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;

  category?: string;
  onCategoryChange?: (value: string) => void;
  categories?: string[];

  className?: string;
};

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  category,
  onCategoryChange,
  categories = [],
  className = '',
}: SearchBarProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.();
  };

  return (
    <div className={`w-full flex justify-end ${className}`}>
      <div className="flex items-center justify-center gap-4 w-full max-w-2xl">
        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center w-full 
          rounded-sm border bg-white/80 backdrop-blur
          transition-all duration-200
          focus-within:border-orange-500
          focus-within:ring-2 focus-within:ring-orange-500/30
          px-2"
        >
          {/* Icon */}
          <Search className="ml-3 w-5 h-5 text-gray-400" />

          {/* Input */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-3 py-3 text-sm
            outline-none placeholder:text-gray-400"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="mr-1 h-9 px-5 rounded-full
            bg-orange-500 text-white text-sm font-medium
            hover:bg-orange-600 active:scale-95
            transition-all"
          >
            Search
          </button>
        </form>

        {/* Category dropdown (separate pill) */}
        {category && onCategoryChange && (
          <div className="relative shrink-0 flex justify-end">
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="h-11 appearance-none rounded-sm border 
              border-black bg-white px-4 pr-3 text-sm 
              font-medium text-gray-400 shadow-md 
              focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="text-black ">
                  {cat}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-black">
              <ChevronDown size={19} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
