import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Bookmark,
  Share2,
  Volume2,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Eye,
  ThumbsUp
} from "lucide-react";
import { useArticles } from "../../context/ArticleContext";

export const HeroSlider: React.FC = () => {
  const { articles, navigateTo, toggleBookmark, bookmarkedIds, likeArticle, likedIds } = useArticles();
  
  // Filter top hero or trending articles
  const heroArticles = articles.filter((a) => a.isHero || a.isFeatured || a.isTrending).slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || heroArticles.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroArticles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, heroArticles.length]);

  if (heroArticles.length === 0) return null;

  const current = heroArticles[activeIndex];
  const isBookmarked = bookmarkedIds.includes(current.id);
  const isLiked = likedIds.includes(current.id);

  return (
    <section
      id="hero-trending-slider"
      className="relative bg-slate-900 text-white py-10 lg:py-16 overflow-hidden dark:bg-black transition-colors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Eyebrow */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-600/30 text-blue-400 rounded-lg border border-blue-500/30">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Trending Headlines & Major Cover Stories
            </h2>
          </div>

          {/* Slide Indicators */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono mr-2">
              0{activeIndex + 1} / 0{heroArticles.length}
            </span>
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + heroArticles.length) % heroArticles.length)}
              className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % heroArticles.length)}
              className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700"
              aria-label="Next story"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Article Image Container */}
          <div className="lg:col-span-7 relative group cursor-pointer" onClick={() => navigateTo("article", { article: current })}>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src={current.coverImage}
                alt={current.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Category Badge & Live Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md">
                  {current.category}
                </span>
                {current.isBreaking && (
                  <span className="px-2.5 py-1 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md animate-pulse">
                    LIVE
                  </span>
                )}
              </div>

              {/* Quick Image Caption */}
              {current.imageCaption && (
                <div className="absolute bottom-4 left-4 right-4 hidden sm:block">
                  <p className="text-xs text-slate-300/90 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80 truncate">
                    {current.imageCaption}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Article Content Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Meta Info */}
              <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  {current.readTime}
                </span>
                <span>•</span>
                <span>{new Date(current.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  {current.views.toLocaleString()} views
                </span>
              </div>

              {/* Title */}
              <h1
                onClick={() => navigateTo("article", { article: current })}
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-serif leading-tight hover:text-blue-400 transition-colors cursor-pointer line-clamp-3"
              >
                {current.title}
              </h1>

              {/* Excerpt */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                {current.excerpt}
              </p>

              {/* Author Row */}
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={current.author.avatar}
                  alt={current.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1">
                    {current.author.name}
                    {current.author.verified && (
                      <span className="w-3.5 h-3.5 bg-blue-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                        ✓
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400">{current.author.title}</p>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 gap-3">
              <button
                onClick={() => navigateTo("article", { article: current })}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 group"
              >
                <span>Read Full Story</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => likeArticle(current.id)}
                  className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                    isLiked
                      ? "bg-rose-950/60 border-rose-800 text-rose-400"
                      : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700"
                  }`}
                  title="Like Story"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{current.likes}</span>
                </button>

                <button
                  onClick={() => toggleBookmark(current.id)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isBookmarked
                      ? "bg-blue-950/60 border-blue-800 text-blue-400"
                      : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700"
                  }`}
                  title={isBookmarked ? "Remove Bookmark" : "Bookmark Story"}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Thumbnail Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-8 pt-6 border-t border-slate-800/80">
          {heroArticles.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`p-2.5 rounded-xl text-left transition-all border ${
                idx === activeIndex
                  ? "bg-slate-800 border-blue-500 ring-2 ring-blue-500/30"
                  : "bg-slate-900/60 border-slate-800/80 opacity-70 hover:opacity-100 hover:bg-slate-800/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] uppercase font-bold text-blue-400">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-400">{item.readTime}</span>
              </div>
              <h5 className="text-xs font-semibold text-slate-200 line-clamp-2">
                {item.title}
              </h5>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
