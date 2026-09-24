import React from "react";
import { Sparkles, Clock, Eye, Bookmark, ArrowRight, Award } from "lucide-react";
import { useArticles } from "../../context/ArticleContext";

export const FeaturedArticles: React.FC = () => {
  const { articles, navigateTo, toggleBookmark, bookmarkedIds } = useArticles();

  const featured = articles.filter((a) => a.isFeatured || a.isEditorPick).slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Editorial Selections
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
              Featured In-Depth Reports
            </h2>
          </div>

          <button
            onClick={() => navigateTo("news")}
            className="px-4 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 group"
          >
            <span>Explore All Reports</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((article) => {
            const isBookmarked = bookmarkedIds.includes(article.id);
            return (
              <div
                key={article.id}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div
                    className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                    onClick={() => navigateTo("article", { article })}
                  >
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg shadow-md">
                        {article.category}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(article.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors ${
                        isBookmarked
                          ? "bg-blue-600 text-white"
                          : "bg-slate-900/60 text-slate-200 hover:bg-slate-900/80"
                      }`}
                      title={isBookmarked ? "Saved" : "Save article"}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        {article.readTime}
                      </span>
                      <span>•</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    </div>

                    <h3
                      onClick={() => navigateTo("article", { article })}
                      className="text-lg font-bold text-slate-900 dark:text-slate-100 font-serif leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-2"
                    >
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer Author */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 mt-4 pt-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {article.author.name}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 cursor-pointer"
                    onClick={() => navigateTo("article", { article })}
                  >
                    Read Story →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
