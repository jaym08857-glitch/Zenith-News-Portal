import React from "react";
import { ExternalLink, Info } from "lucide-react";
import { useArticles } from "../../context/ArticleContext";

interface AdBannerProps {
  zone: "header-leaderboard" | "sidebar-rectangle" | "in-article-banner" | "footer-banner";
}

export const AdBanner: React.FC<AdBannerProps> = ({ zone }) => {
  const { ads } = useArticles();

  const ad = ads.find((a) => a.zone === zone && a.active);

  if (!ad) return null;

  return (
    <div id={`ad-banner-${zone}`} className="my-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-3 text-center overflow-hidden relative group">
        
        {/* Ad Tag Badge */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2 px-2">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-slate-400" /> Sponsored Advertisement
          </span>
          <span>{ad.dimensions}</span>
        </div>

        {/* Ad Image / Content Link */}
        <a
          href={ad.destinationUrl}
          onClick={(e) => {
            e.preventDefault();
            alert(`Monetization Demo: Click registered for sponsor '${ad.title}'!`);
          }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500/50 transition-all shadow-sm group-hover:shadow-md"
        >
          <div className="flex items-center gap-4 text-left">
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-16 h-12 rounded-lg object-cover shrink-0"
            />
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {ad.title}
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {ad.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0 bg-blue-50 dark:bg-blue-950/60 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-900">
            <span>Learn More</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </a>

      </div>
    </div>
  );
};
