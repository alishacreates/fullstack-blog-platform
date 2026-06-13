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
  onCardClick: (slug: string) => void;
};

export default function ArticleGrid({
  articles,
  loading,
  onCardClick,
}: Props) {
  if (loading) {
    return (
      <p className="py-20 text-center text-[#8a9a91]">
        Loading blogs...
      </p>
    );
  }

  if (!articles.length) {
    return (
      <p className="py-20 text-center text-[#8a9a91]">
        No articles found.
      </p>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <article
          key={article.id}
          onClick={() => onCardClick(article.slug)}
          className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#26332f] bg-[#111816] shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-2 hover:border-[#a3e635]"
        >
          <div className="relative h-56 overflow-hidden bg-[#16201d]">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0e]/80 via-transparent to-transparent" />

            <span className="absolute left-4 top-4 rounded-full border border-[#3c4d46] bg-[#16201d] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#a3e635] backdrop-blur">
              {article.category}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="mb-4 min-h-[3.5rem] text-xl font-bold leading-snug text-[#f4f7f5] line-clamp-2 transition group-hover:text-[#a3e635]">
              {article.title}
            </h3>

            <div className="mt-auto flex items-center justify-between border-t border-[#26332f] pt-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8a9a91]">
                {article.readTime}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCardClick(article.slug);
                }}
                className="rounded-full border border-[#26332f] px-4 py-1.5 text-xs font-semibold text-[#8a9a91] transition hover:border-[#a3e635] hover:bg-[#a3e635] hover:text-[#0b0f0e]"
              >
                Read more
              </button>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-1 scale-x-0 bg-gradient-to-r from-[#84cc16] to-[#a3e635] transition-transform duration-500 group-hover:scale-x-100" />
        </article>
      ))}
    </div>
  );
}