import React, { useState, useEffect } from "react";
import { Zap, Pause, Play, ChevronRight, TrendingUp } from "lucide-react";
import { useArticles } from "../../context/ArticleContext";

export const BreakingTicker: React.FC = () => {
  const { articles, navigateTo } = useArticles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Filter breaking or trending items
  const tickerItems = articles.filter((a) => a.isBreaking || a.isTrending || a.isHero);

  useEffect(() => {
    if (!isPlaying || tickerItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerItems.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, tickerItems.length]);

  if (tickerItems.length === 0) return null;

  const currentItem = tickerItems[currentIndex];

  return (
    <div id="breaking-news-ticker" className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800 dark:bg-black dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left Badge & Live News */}
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <div className="flex items-center gap-1.5 bg-red-600 text-white font-bold uppercase tracking-wider px-2.5 py-0.5 rounded text-[10px] shrink-0 animate-pulse">
            <Zap className="w-3 h-3 fill-white" />
            <span>BREAKING</span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <span className="text-slate-400 font-medium hidden sm:inline shrink-0">
              [{new Date(currentItem.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]
            </span>
            <button
              onClick={() => navigateTo("article", { article: currentItem })}
              className="text-slate-200 hover:text-blue-400 font-medium truncate text-left transition-colors flex items-center gap-1 group"
            >
              <span className="truncate">{currentItem.title}</span>
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          </div>
        </div>

        {/* Right Controls & Date */}
        <div className="hidden md:flex items-center gap-4 text-slate-400 shrink-0 font-medium">
          <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span>Index +0.84%</span>
          </div>

          <div className="text-slate-400 text-[11px]">
            {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="hover:text-white p-1 rounded transition-colors"
            title={isPlaying ? "Pause Ticker" : "Play Ticker"}
            aria-label="Toggle Ticker Pause"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
};
