import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ArticleProvider, useArticles } from "./context/ArticleContext";
import { Navbar } from "./components/Header/Navbar";
import { BreakingTicker } from "./components/Header/BreakingTicker";
import { SearchModal } from "./components/Header/SearchModal";
import { HeroSlider } from "./components/Hero/HeroSlider";
import { BreakingNews } from "./components/Sections/BreakingNews";
import { FeaturedArticles } from "./components/Sections/FeaturedArticles";
import { TrendingBlogs } from "./components/Sections/TrendingBlogs";
import { LatestNews } from "./components/Sections/LatestNews";
import { PopularCategories } from "./components/Sections/PopularCategories";
import { NewsletterSection } from "./components/Sections/NewsletterSection";
import { AboutSection } from "./components/Sections/AboutSection";
import { ContactSection } from "./components/Sections/ContactSection";
import { SocialSection } from "./components/Sections/SocialSection";
import { AdBanner } from "./components/Sections/AdBanner";
import { Footer } from "./components/Footer/Footer";
import { ArticleDetail } from "./components/Article/ArticleDetail";
import { AdminDashboard } from "./components/Admin/AdminDashboard";
import { LegalPage } from "./components/Legal/LegalPage";

const MainContent: React.FC = () => {
  const { currentPage, selectedArticle } = useArticles();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col justify-between font-sans selection:bg-blue-600 selection:text-white transition-colors">
      
      {/* Top Header Navigation */}
      <div>
        <BreakingTicker />
        <Navbar />
        <SearchModal />
      </div>

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === "home" && (
          <>
            <AdBanner zone="header-leaderboard" />
            <HeroSlider />
            <BreakingNews />
            <FeaturedArticles />
            <TrendingBlogs />
            <LatestNews />
            <AdBanner zone="in-article-banner" />
            <PopularCategories />
            <NewsletterSection />
            <AboutSection />
            <ContactSection />
            <SocialSection />
          </>
        )}

        {currentPage === "article" && selectedArticle && (
          <ArticleDetail article={selectedArticle} />
        )}

        {currentPage === "blogs" && (
          <>
            <TrendingBlogs />
            <LatestNews />
            <NewsletterSection />
          </>
        )}

        {currentPage === "news" && (
          <>
            <BreakingNews />
            <LatestNews />
          </>
        )}

        {currentPage === "categories" && (
          <>
            <PopularCategories />
            <LatestNews />
          </>
        )}

        {currentPage === "about" && (
          <>
            <AboutSection />
            <NewsletterSection />
          </>
        )}

        {currentPage === "contact" && (
          <ContactSection />
        )}

        {currentPage === "privacy" && <LegalPage type="privacy" />}
        {currentPage === "terms" && <LegalPage type="terms" />}
        {currentPage === "disclaimer" && <LegalPage type="disclaimer" />}

        {currentPage === "admin" && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ArticleProvider>
        <MainContent />
      </ArticleProvider>
    </ThemeProvider>
  );
}
