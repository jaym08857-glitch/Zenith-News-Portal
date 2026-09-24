import React from "react";
import { FolderKanban, Cpu, Globe, TrendingUp, Sparkles, Rocket, Palette, ArrowUpRight } from "lucide-react";
import { useArticles } from "../../context/ArticleContext";

export const PopularCategories: React.FC = () => {
  const { categories, navigateTo, articles } = useArticles();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu": return <Cpu className="w-6 h-6" />;
      case "Globe": return <Globe className="w-6 h-6" />;
      case "TrendingUp": return <TrendingUp className="w-6 h-6" />;
      case "Sparkles": return <Sparkles className="w-6 h-6" />;
      case "Rocket": return <Rocket className="w-6 h-6" />;
      case "Palette": return <Palette className="w-6 h-6" />;
      default: return <FolderKanban className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Directory & Desk Topics
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
              Explore Popular News Desks
            </h2>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const count = articles.filter(
              (a) => a.category.toLowerCase().replace(/[^a-z0-9]+/g, "") === cat.slug.toLowerCase().replace(/[^a-z0-9]+/g, "")
            ).length;

            return (
              <div
                key={cat.id}
                onClick={() => navigateTo("categories", { categorySlug: cat.slug })}
                className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all shadow-sm hover:shadow-xl cursor-pointer group flex items-start justify-between gap-4"
              >
                <div className="space-y-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: cat.color || "#2563eb" }}
                  >
                    {getIcon(cat.icon)}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {cat.description}
                    </p>
                  </div>

                  <span className="inline-block text-xs font-semibold text-slate-400">
                    {count} Published {count === 1 ? "Story" : "Stories"}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-950 transition-colors">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
