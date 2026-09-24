import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Users,
  DollarSign,
  Sparkles,
  Plus,
  Trash2,
  Edit,
  Eye,
  TrendingUp,
  BarChart3,
  Check,
  Zap,
  Send,
  Loader2,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useArticles } from "../../context/ArticleContext";
import { Article, Category } from "../../types";

export const AdminDashboard: React.FC = () => {
  const {
    articles,
    categories,
    subscribers,
    ads,
    analytics,
    addArticle,
    updateArticle,
    deleteArticle,
    addCategory,
    deleteCategory,
    toggleAdActive,
    navigateTo
  } = useArticles();

  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "categories" | "subscribers" | "ads">("overview");

  // AI Article Generator State
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiCategory, setAiCategory] = useState("Technology");
  const [aiTone, setAiTone] = useState("Professional");
  const [isGenerating, setIsGenerating] = useState(false);

  // New Article Form
  const [articleForm, setArticleForm] = useState<Partial<Article>>({
    title: "",
    subtitle: "",
    excerpt: "",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200",
    category: "Technology",
    tags: ["News", "Analysis"],
    isHero: false,
    isFeatured: false,
    isBreaking: false,
    isDraft: false
  });

  // Category Form
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [newCatColor, setNewCatColor] = useState("#2563eb");

  // Call Gemini AI API
  const handleAIGenerate = async () => {
    if (!aiTopic.trim()) {
      alert("Please enter a topic for the AI writer.");
      return;
    }
    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: aiTopic,
          category: aiCategory,
          tone: aiTone
        })
      });
      const data = await response.json();
      
      setArticleForm((prev) => ({
        ...prev,
        title: data.title || prev.title,
        subtitle: data.subtitle || prev.subtitle,
        excerpt: data.excerpt || prev.excerpt,
        content: data.content || prev.content,
        metaTitle: data.metaTitle || data.title,
        metaDescription: data.metaDescription || data.excerpt,
        tags: data.tags || prev.tags,
        category: aiCategory
      }));
    } catch (e) {
      console.error("AI Generation Error", e);
      alert("Failed to generate article with AI.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    addArticle(articleForm);
    setShowArticleModal(false);
    alert("Article created successfully!");
    setArticleForm({
      title: "",
      subtitle: "",
      excerpt: "",
      content: "",
      coverImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200",
      category: "Technology",
      tags: ["News", "Analysis"],
      isHero: false,
      isFeatured: false,
      isBreaking: false,
      isDraft: false
    });
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory({
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: newCatDesc || "Coverage on " + newCatName,
      color: newCatColor,
      icon: "FolderKanban"
    });
    setNewCatName("");
    setNewCatDesc("");
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-16">
      
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              <LayoutDashboard className="w-4 h-4" />
              <span>Editorial & CMS Administration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-white">
              Chronicle Control Panel
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo("home")}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all border border-slate-700"
            >
              View Live Website →
            </button>
            <button
              onClick={() => setShowArticleModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Publish New Story</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Navigation Tabs */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-4 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics & Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("articles")}
            className={`py-4 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "articles"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`py-4 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "categories"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Desks & Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("subscribers")}
            className={`py-4 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "subscribers"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Subscribers ({subscribers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("ads")}
            className={`py-4 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "ads"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Ad Monetization ({ads.length})</span>
          </button>
        </div>
      </div>

      {/* Body Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Page Views</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white font-serif">
                  {analytics.totalPageViews.toLocaleString()}
                </div>
                <p className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +14.2% vs last week
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unique Readers</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white font-serif">
                  {analytics.uniqueVisitors.toLocaleString()}
                </div>
                <p className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Organic Traffic Growth
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Reading Time</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white font-serif">
                  {analytics.avgReadTimeMinutes} mins
                </div>
                <p className="text-xs text-blue-500 font-semibold">
                  High Engagement Retention
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Subscribers</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white font-serif">
                  {analytics.newsletterSubscribersCount.toLocaleString()}
                </div>
                <p className="text-xs text-emerald-500 font-semibold">
                  Zero Bounce Rate
                </p>
              </div>
            </div>

            {/* Visual Bar Chart for Daily Telemetry */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white font-serif">
                    Reader Telemetry & Traffic Chart
                  </h3>
                  <p className="text-xs text-slate-500">Daily unique pageviews over the past week</p>
                </div>
              </div>

              <div className="h-48 flex items-end justify-between gap-4 pt-8 border-b border-slate-100 dark:border-slate-800 px-4">
                {analytics.dailyVisits.map((day, idx) => {
                  const heightPercent = (day.views / 60000) * 100;
                  return (
                    <div key={day.date} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-500">
                        {(day.views / 1000).toFixed(1)}k
                      </span>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg overflow-hidden h-32 flex items-end">
                        <div
                          className="w-full bg-blue-600 group-hover:bg-blue-500 transition-all rounded-t-lg"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{day.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Performing Articles */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white font-serif">
                Top Performing Stories
              </h3>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {articles.slice(0, 4).map((art) => (
                  <div key={art.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded-lg text-xs font-bold">
                        {art.category}
                      </span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                        {art.title}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-500 shrink-0">
                      {art.views.toLocaleString()} reads
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ARTICLES TAB */}
        {activeTab === "articles" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                All Published & Draft Stories
              </h3>
              <button
                onClick={() => setShowArticleModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Story</span>
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-4">Title & Desk</th>
                      <th className="p-4">Author</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Views</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-4">
                          <div className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                            {art.title}
                          </div>
                          <span className="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-bold">
                            {art.category}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">
                          {art.author.name}
                        </td>
                        <td className="p-4">
                          {art.isDraft ? (
                            <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-md font-bold text-[10px]">
                              Draft
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px]">
                              Published
                            </span>
                          )}
                        </td>
                        <td className="p-4 font-mono text-slate-600 dark:text-slate-400">
                          {art.views.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigateTo("article", { article: art })}
                              className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg hover:text-blue-600"
                              title="Preview Article"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteArticle(art.id)}
                              className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100"
                              title="Delete Article"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === "categories" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Category List */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                Existing Editorial Desks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{cat.name}</h4>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2">{cat.description}</p>
                    </div>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Category Form */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="font-bold text-base text-slate-900 dark:text-white font-serif">
                Add New Desk Category
              </h4>
              <form onSubmit={handleAddCategorySubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-600">Category Name</label>
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Climate & Environment"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600">Description</label>
                  <textarea
                    rows={3}
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    placeholder="Brief description of the desk..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Create Desk Category
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SUBSCRIBERS TAB */}
        {activeTab === "subscribers" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                Newsletter Audience Directory ({subscribers.length})
              </h3>
              <button
                onClick={() => alert("CSV Export simulation complete!")}
                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl"
              >
                Export CSV List
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Email</th>
                    <th className="p-4">Subscribed Date</th>
                    <th className="p-4">Interest Desk</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {subscribers.map((sub) => (
                    <tr key={sub.id}>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{sub.email}</td>
                      <td className="p-4 text-slate-500">{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                      <td className="p-4 text-blue-600 font-semibold">{sub.categoryInterest || "All News"}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ADS TAB */}
        {activeTab === "ads" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              Ad Placement & Monetization Controls
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ads.map((ad) => (
                <div key={ad.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white">{ad.name}</h4>
                      <span className="text-xs font-mono text-slate-400">{ad.zone} ({ad.dimensions})</span>
                    </div>
                    <button
                      onClick={() => toggleAdActive(ad.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        ad.active ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {ad.active ? "Active" : "Disabled"}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t text-xs">
                    <div>
                      <span className="text-slate-400 block">Impressions</span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{ad.impressions.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Clicks</span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{ad.clicks.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* CREATE ARTICLE MODAL WITH AI ASSISTANT */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="font-bold text-xl text-slate-900 dark:text-white font-serif flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Publish New Article or Report</span>
              </h3>
              <button onClick={() => setShowArticleModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            {/* AI Assistant Generator Bar */}
            <div className="p-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white rounded-2xl space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Gemini AI Senior Editor Writer Assistant</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter news topic (e.g., 'Autonomous Quantum Microchips')"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 text-white placeholder-slate-300 text-xs rounded-xl outline-none border border-white/20"
                />
                <button
                  type="button"
                  onClick={handleAIGenerate}
                  disabled={isGenerating}
                  className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shrink-0 flex items-center justify-center gap-1.5 shadow-md"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>{isGenerating ? "Drafting..." : "AI Auto-Draft"}</span>
                </button>
              </div>
            </div>

            {/* Manual Edit Form */}
            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Article Title</label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  placeholder="Compelling news headline..."
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm outline-none dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Category / Desk</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm outline-none dark:text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Cover Image URL</label>
                  <input
                    type="text"
                    value={articleForm.coverImage}
                    onChange={(e) => setArticleForm({ ...articleForm, coverImage: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm outline-none dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Excerpt / Lead Summary</label>
                <textarea
                  rows={2}
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs outline-none dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Article Body Content (Markdown Supported)</label>
                <textarea
                  rows={8}
                  required
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs outline-none dark:text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={articleForm.isBreaking}
                    onChange={(e) => setArticleForm({ ...articleForm, isBreaking: e.target.checked })}
                  />
                  <span>Mark as Breaking News</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={articleForm.isFeatured}
                    onChange={(e) => setArticleForm({ ...articleForm, isFeatured: e.target.checked })}
                  />
                  <span>Feature on Front Page</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Publish Story
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
