import React from "react";
import { Globe, ArrowUp, ShieldCheck, Heart, Rss } from "lucide-react";
import { useArticles } from "../../context/ArticleContext";
import { ViewPage } from "../../types";

export const Footer: React.FC = () => {
  const { navigateTo, categories } = useArticles();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLink = (page: ViewPage, categorySlug?: string) => {
    navigateTo(page, categorySlug ? { categorySlug } : undefined);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-serif uppercase">
                Chronicle
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Global Chronicle is a premier digital publication dedicated to independent journalism, deep tech investigation, global market telemetry, and cultural critique.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/50 w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified International Press Member</span>
            </div>
          </div>

          {/* Col 2: Navigation Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-100 font-mono">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => handleLink("home")} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLink("news")} className="hover:text-white transition-colors">
                  Breaking News Feed
                </button>
              </li>
              <li>
                <button onClick={() => handleLink("blogs")} className="hover:text-white transition-colors">
                  Editorial Blogs & Columns
                </button>
              </li>
              <li>
                <button onClick={() => handleLink("about")} className="hover:text-white transition-colors">
                  About Our Newsroom
                </button>
              </li>
              <li>
                <button onClick={() => handleLink("contact")} className="hover:text-white transition-colors">
                  Contact Editors & Pitch
                </button>
              </li>
              <li>
                <button onClick={() => handleLink("admin")} className="hover:text-blue-400 transition-colors font-bold text-blue-400">
                  Admin Management
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-100 font-mono">
              Editorial Desks
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleLink("categories", cat.slug)}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal & Policy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-100 font-mono">
              Editorial Policies
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => handleLink("privacy")} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleLink("terms")} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => handleLink("disclaimer")} className="hover:text-white transition-colors">
                  Editorial Disclaimer
                </button>
              </li>
              <li className="pt-2 text-slate-500 flex items-center gap-1">
                <Rss className="w-3.5 h-3.5 text-amber-500" />
                <span>RSS Wire Output Available</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium pt-4">
          <p>© {new Date().getFullYear()} Global Chronicle Media Group. All Rights Reserved. Built with modern web performance & accessibility best practices.</p>

          <button
            onClick={scrollToTop}
            className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl transition-all border border-slate-800 flex items-center gap-2"
            title="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
