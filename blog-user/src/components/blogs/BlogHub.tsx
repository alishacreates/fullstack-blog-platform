'use client';

import { useMemo, useState } from 'react';
import { Pagination } from '@mui/material';

import Sidebar from './Sidebar';
import MainNav from './MainNav';
import SearchBar from './SearchBar';
import ArticleGrid from './ArticleGrid';
import BlogDetails from './BlogDetails'; // ✅ make sure path is right
import { useBlogs } from '../hooks/useBlogs';

export default function BlogHub() {
  const { articles, loading, error } = useBlogs();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ NEW: which blog is currently opened as “slug page”
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 6;

  /* ---------------- Filter + Search ---------------- */
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === 'All' ||
        article.category === activeCategory.toUpperCase();

      const matchesSearch = article.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  /* ---------------- Pagination ---------------- */
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handleBackToList = () => {
    setSelectedSlug(null);
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <MainNav />

        <main className="max-w-7xl mx-auto px-4 py-8 w-full">
          {/* heading */}
          <div className="mb-1">
          </div>

          {/* If a blog is selected → show that “slug page” view */}
          {selectedSlug ? (
            <div className="space-y-6">
              {/* Back button */}
              <button
                onClick={handleBackToList}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-600 mb-4 hover: cursor-pointer"
              >
                {/* simple left arrow */}
              
                <span className="inline-block rotate-180 text-lg">➜</span>
                <p>Back to all insights</p>
               
              </button>

              {/* This is basically your slug page, but as a component */}
              <BlogDetails slug={selectedSlug} />
            </div>
          ) : (
            <>
              {/* Search + Filter (COMBINED) */}
              <div className="flex justify-end mb-8">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search articles..."
                  category={activeCategory}
                  onCategoryChange={(value) => {
                    setActiveCategory(value);
                    setCurrentPage(1);
                  }}
                  categories={['Category', 'Design', 'Tech', 'Lifestyle', 'Productivity']}
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-center text-red-500 py-10">
                  {error}
                </p>
              )}

              {/* Articles list */}
              <ArticleGrid
                articles={paginatedArticles}
                loading={loading}
                onCardClick={(slug) => setSelectedSlug(slug)} // ✅ switch to slug view
              />

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) => setCurrentPage(page)}
                  sx={{
                    '& .MuiPaginationItem-root.Mui-selected': {
                      backgroundColor: 'orange',
                      color: '#fff',
                    },
                    '& .MuiPaginationItem-root.Mui-selected:hover': {
                      backgroundColor: '#f97316',
                    },
                  }}
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
