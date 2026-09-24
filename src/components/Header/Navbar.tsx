import React, { useState } from "react";
import {
  Globe,
  Search,
  Bookmark,
  Sun,
  Moon,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  LayoutDashboard
} from "lucide-react";
import { useArticles } from "../../context/ArticleContext";
import { useTheme } from "../../context/ThemeContext";
import { ViewPage } from "../../types";

export const Navbar: React.FC = () => {
  const { currentPage, navigateTo, setIsSearchOpen, bookmarkedIds, categories } = useArticles();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: ViewPage; categorySlug?: string }[] = [
    { label: "Home", page: "home" },
    { label: "Latest News", page: "news" },
    { label: "Trending Blogs", page: "blogs" },
    { label: "Categories", page: "categories" },
    { label: "About Us", page: "about" },
    { label: "Contact", page: "contact" }
  ];

  const handleNavClick = (page: ViewPage, categorySlug?: string) => {
    navigateTo(page, categorySlug ? { categorySlug } : undefined);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Globe className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif uppercase">
                  Chronicle
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-blue-600 dark:text-blue-400 -mt-1">
                  Global News & Media
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
                      : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Admin Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors relative flex items-center gap-2 text-xs font-medium"
              title="Search Articles (Cmd+K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline font-mono text-[11px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                ⌘K
              </span>
            </button>

            {/* Bookmarks Counter */}
            <button
              onClick={() => handleNavClick("blogs")}
              className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors relative"
              title="Saved Reading List"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkedIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {bookmarkedIds.length}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Admin Panel Button */}
            <button
              onClick={() => handleNavClick("admin")}
              className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                currentPage === "admin"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 text-white hover:opacity-95"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Category Nav Strip for Desktop */}
      <div className="hidden lg:block bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800/80 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-0.5">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] shrink-0">
              Top Topics:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleNavClick("categories", cat.slug)}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors shrink-0"
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px] shrink-0 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Verified Editorial Standards</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-slideDown">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3">
              Navigation
            </span>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-semibold text-sm ${
                  currentPage === item.page
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3">
              Quick Categories
            </span>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNavClick("categories", cat.slug)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 text-left truncate"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
            <button
              onClick={() => handleNavClick("admin")}
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm shadow-md"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Access Admin Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
