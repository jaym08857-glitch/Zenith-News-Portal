import React from "react";
import { Zap, Clock, ArrowRight, ShieldAlert } from "lucide-react";
import { useArticles } from "../../context/ArticleContext";

export const BreakingNews: React.FC = () => {
  const { articles, navigateTo } = useArticles();

  const breakingList = articles.filter((a) => a.isBreaking || a.isTrending).slice(0, 4);

  if (breakingList.length === 0) return null;

  return (
    <section className="bg-red-50 dark:bg-red-950/20 border-y border-red-200/80 dark:border-red-900/40 py-6 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-red-600 text-white rounded-xl shadow-md shadow-red-500/30 animate-pulse">
              <Zap className="w-5 h-5 fill-white" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-red-950 dark:text-red-100 flex items-center gap-2">
                Live Breaking News Center
                <span className="text-[10px] bg-red-600 text-white font-bold uppercase px-2 py-0.5 rounded-full">
                  Updated Live
                </span>
              </h3>
              <p className="text-xs text-red-700 dark:text-red-300">
                Real-time dispatches from our global correspondents
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo("news")}
            className="text-xs font-bold text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100 flex items-center gap-1 group"
          >
            <span>View All Live Bulletins</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Live News Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {breakingList.map((item) => (
            <div
              key={item.id}
              onClick={() => navigateTo("article", { article: item })}
              className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-red-100 dark:border-red-900/30 hover:border-red-300 dark:hover:border-red-800 transition-all shadow-sm hover:shadow-md cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-red-500" />
                    {new Date(item.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                  {item.title}
                </h4>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>By {item.author.name}</span>
                <span className="font-semibold text-red-600 dark:text-red-400 group-hover:underline">
                  Read dispatch →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
