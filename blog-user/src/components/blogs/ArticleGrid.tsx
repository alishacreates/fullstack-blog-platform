type Article = {
  id: string | number;
  slug: string;
  title: string;
  category: string;
  image: string;
  readTime: string;
};

type Props = {
  articles: Article[];
  loading: boolean;

  // ✅ NEW
  onCardClick: (slug: string) => void;
};

export default function ArticleGrid({ articles, loading, onCardClick }: Props) {
  if (loading) {
    return (
      <p className="py-20 text-center text-slate-500">
        Loading blogs...
      </p>
    );
  }

  if (!articles.length) {
    return (
      <p className="py-20 text-center text-slate-500">
        No articles found.
      </p>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <div key={article.id} className="h-full">
          <article
            onClick={() => onCardClick(article.slug)}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-56 overflow-hidden bg-slate-200">
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <span className="mb-3 block text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-var(--primary)-500 to-var(--primary)-600 bg-clip-text text-transparent">
                {article.category}
              </span>

              <h3 className="mb-3 text-xl font-bold text-slate-900 line-clamp-2 min-h-[3.5rem] group-hover:text-var(--primary)-600">
                {article.title}
              </h3>

              {/* Bottom row: read time + Read more button */}
              <div className="mt-auto flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {article.readTime}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // so it doesn’t double-trigger
                    onCardClick(article.slug);
                  }}
                  className="rounded-full hover: cursor-pointer border border-var(--primary)-500 px-3 py-1 text-xs font-semibold text-var(--primary)-600 transition hover:bg-var(--primary)-500 hover:text-white"
                >
                  Read more
                </button>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-var(--primary)-500 to-var(--primary)-600 scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
          </article>
        </div>
      ))}
    </div>
  );
}

