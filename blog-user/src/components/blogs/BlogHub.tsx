'use client';

import { useMemo, useState } from 'react';
import { Pagination } from '@mui/material';
import Header from './Header';
import ArticleGrid from './ArticleGrid';
import BlogDetails from './BlogDetails';
import { useBlogs } from '../hooks/useBlogs';

export default function BlogHub() {
  const { articles, loading, error } = useBlogs();

  const [searchQuery] = useState('');
  const [activeCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 6;

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

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  return (
    <div className="min-h-screen bg-[#0b0f0e] text-[#f4f7f5]">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        {selectedSlug ? (
          <div>
            <button
              onClick={() => setSelectedSlug(null)}
              className="mb-8 border border-[#26332f] bg-[#111816] px-4 py-2 font-mono text-sm text-[#8a9a91] transition hover:border-[#a3e635] hover:text-[#a3e635]"
            >
              ← back to index
            </button>

            <BlogDetails slug={selectedSlug} />
          </div>
        ) : (
          <>
            <section className="mb-16 grid gap-10 border-b border-[#26332f] pb-14 lg:grid-cols-[1.4fr_0.6fr]">
              <div>
                <p className="mb-5 font-mono text-sm uppercase tracking-[0.35em] text-[#a3e635]">
                  LOGBOOK_2025
                </p>

                <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-[#f4f7f5] md:text-7xl">
                  Thoughts,
                  <br />
                  experiments,
                  <br />
                  and lessons learned.
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-[#8a9a91]">
                  A personal archive of articles about building software,
                  debugging ideas, design decisions, and things worth
                  remembering.
                </p>
              </div>

              <aside className="flex flex-col justify-end border border-[#26332f] bg-[#111816] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#8a9a91]">
                  Current Focus
                </p>

                <div className="mt-5 space-y-3 font-mono text-sm">
                  <p className="text-[#f4f7f5]">→ Next.js</p>
                  <p className="text-[#f4f7f5]">→ TypeScript</p>
                  <p className="text-[#f4f7f5]">→ UI systems</p>
                  <p className="text-[#f4f7f5]">→ Project notes</p>
                </div>
              </aside>
            </section>

            <div className="mb-8 flex items-end justify-between border-b border-[#26332f] pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#8a9a91]">
                  Index
                </p>
                <h2 className="mt-2 text-2xl font-black text-[#f4f7f5]">
                  Latest Entries
                </h2>
              </div>

              <p className="hidden font-mono text-sm text-[#8a9a91] sm:block">
                {filteredArticles.length} notes found
              </p>
            </div>

            {error && <p className="py-10 text-center text-red-400">{error}</p>}

            <ArticleGrid
              articles={paginatedArticles}
              loading={loading}
              onCardClick={(slug) => setSelectedSlug(slug)}
            />

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) => setCurrentPage(page)}
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: '#8a9a91',
                      borderColor: '#26332f',
                      fontFamily: 'monospace',
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                      backgroundColor: '#a3e635',
                      color: '#0b0f0e',
                    },
                    '& .MuiPaginationItem-root.Mui-selected:hover': {
                      backgroundColor: '#bef264',
                    },
                  }}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}