import React, { useState } from "react";
import { Newspaper, LayoutGrid, List, Filter, Clock, Eye, Bookmark, ArrowRight, ChevronDown } from "lucide-react";
import { useArticles } from "../../context/ArticleContext";

export const LatestNews: React.FC = () => {
  const { articles, categories, navigateTo, toggleBookmark, bookmarkedIds } = useArticles();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "likes">("latest");
  const [displayCount, setDisplayCount] = useState<number>(6);

  // Filter & Sort
  let filtered = articles.filter((a) => {
    if (activeCategory === "all") return true;
    return a.category.toLowerCase().replace(/[^a-z0-9]+/g, "") === activeCategory.toLowerCase().replace(/[^a-z0-9]+/g, "");
  });

  if (sortBy === "popular") {
    filtered = [...filtered].sort((a, b) => b.views - a.views);
  } else if (sortBy === "likes") {
    filtered = [...filtered].sort((a, b) => b.likes - a.likes);
  } else {
    filtered = [...filtered].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  const visibleArticles = filtered.slice(0, displayCount);

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & View Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Newspaper className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Continuous News Stream
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
              Latest Coverage & Breaking Reports
            </h2>
          </div>

          {/* Right Controls: Sort & Layout Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent outline-none font-bold text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="latest" className="dark:bg-slate-900">Latest First</option>
                <option value="popular" className="dark:bg-slate-900">Most Viewed</option>
                <option value="likes" className="dark:bg-slate-900">Most Liked</option>
              </select>
            </div>

            {/* Grid / List Mode Switcher */}
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Grid Layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="List Layout"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Category Tabs Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeCategory === "all"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            All Categories ({articles.length})
          </button>
          {categories.map((cat) => {
            const catSlug = cat.slug.toLowerCase().replace(/[^a-z0-9]+/g, "");
            const isActive = activeCategory === catSlug;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(catSlug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Articles Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleArticles.map((article) => {
              const isBookmarked = bookmarkedIds.includes(article.id);
              return (
                <div
                  key={article.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    <div
                      className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                      onClick={() => navigateTo("article", { article })}
                    >
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-wider rounded-lg">
                          {article.category}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(article.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors ${
                          isBookmarked ? "bg-blue-600 text-white" : "bg-slate-900/60 text-slate-200 hover:bg-slate-900/80"
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-blue-500" />
                          {article.readTime}
                        </span>
                        <span>•</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>

                      <h3
                        onClick={() => navigateTo("article", { article })}
                        className="text-base font-bold text-slate-900 dark:text-slate-100 font-serif leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-2"
                      >
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 mt-4 pt-4">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      By {article.author.name}
                    </span>
                    <button
                      onClick={() => navigateTo("article", { article })}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform"
                    >
                      Read →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View Layout */
          <div className="space-y-4">
            {visibleArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => navigateTo("article", { article })}
                className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all shadow-sm hover:shadow-md cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-24 h-24 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
                        {article.category}
                      </span>
                      <span className="text-xs text-slate-400">• {article.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-serif group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-medium text-slate-400 hidden lg:inline">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {displayCount < filtered.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setDisplayCount((prev) => prev + 6)}
              className="px-8 py-3.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 border border-slate-300 dark:border-slate-800 rounded-xl text-sm font-bold transition-all shadow-sm inline-flex items-center gap-2"
            >
              <span>Load More Articles ({filtered.length - displayCount} Remaining)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
