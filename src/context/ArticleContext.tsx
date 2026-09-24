import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Article,
  Category,
  Comment,
  NewsletterSubscriber,
  AdPlacement,
  AnalyticsData,
  ViewPage,
  ArticleFilterOptions
} from "../types";
import {
  INITIAL_ARTICLES,
  INITIAL_CATEGORIES,
  INITIAL_COMMENTS,
  INITIAL_SUBSCRIBERS,
  INITIAL_ADS,
  INITIAL_ANALYTICS,
  AUTHORS
} from "../data/mockData";

interface ArticleContextType {
  articles: Article[];
  categories: Category[];
  comments: Comment[];
  subscribers: NewsletterSubscriber[];
  ads: AdPlacement[];
  analytics: AnalyticsData;
  currentPage: ViewPage;
  selectedArticle: Article | null;
  activeCategoryFilter: string | null;
  searchQuery: string;
  isSearchOpen: boolean;
  bookmarkedIds: string[];
  likedIds: string[];
  filterOptions: ArticleFilterOptions;
  
  // Navigation & Search
  navigateTo: (page: ViewPage, extraData?: { article?: Article; categorySlug?: string; filterTag?: string }) => void;
  setSearchQuery: (query: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  setFilterOptions: React.Dispatch<React.SetStateAction<ArticleFilterOptions>>;
  
  // User Actions
  likeArticle: (id: string) => void;
  toggleBookmark: (id: string) => void;
  addComment: (articleId: string, content: string, name: string, email?: string) => void;
  addReply: (commentId: string, content: string, name: string) => void;
  likeComment: (commentId: string) => void;
  subscribeNewsletter: (email: string, categoryInterest?: string) => { success: boolean; message: string };
  
  // Admin Operations
  addArticle: (newArticle: Partial<Article>) => Article;
  updateArticle: (id: string, updatedData: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  addCategory: (category: Omit<Category, "id" | "postCount">) => void;
  deleteCategory: (id: string) => void;
  toggleAdActive: (adId: string) => void;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Articles state with localStorage fallback
  const [articles, setArticles] = useState<Article[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chronicle_articles");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed parsing stored articles", e);
        }
      }
    }
    return INITIAL_ARTICLES;
  });

  // Categories state
  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chronicle_categories");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return INITIAL_CATEGORIES;
  });

  // Comments state
  const [comments, setComments] = useState<Comment[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chronicle_comments");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return INITIAL_COMMENTS;
  });

  // Newsletter subscribers
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chronicle_subscribers");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return INITIAL_SUBSCRIBERS;
  });

  // Ads state
  const [ads, setAds] = useState<AdPlacement[]>(INITIAL_ADS);

  // Analytics
  const [analytics, setAnalytics] = useState<AnalyticsData>(INITIAL_ANALYTICS);

  // View state
  const [currentPage, setCurrentPage] = useState<ViewPage>("home");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<ArticleFilterOptions>({
    sortBy: "latest",
    viewMode: "grid"
  });

  // Bookmarks & Liked IDs
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chronicle_bookmarks");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return ["art-1"];
  });

  const [likedIds, setLikedIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chronicle_likes");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return ["art-1", "art-3"];
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("chronicle_articles", JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem("chronicle_categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("chronicle_comments", JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem("chronicle_subscribers", JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    localStorage.setItem("chronicle_bookmarks", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem("chronicle_likes", JSON.stringify(likedIds));
  }, [likedIds]);

  // Page view tracker
  const navigateTo = (page: ViewPage, extraData?: { article?: Article; categorySlug?: string; filterTag?: string }) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (page === "article" && extraData?.article) {
      setSelectedArticle(extraData.article);
      // Increment view count
      setArticles((prev) =>
        prev.map((art) => (art.id === extraData.article!.id ? { ...art, views: art.views + 1 } : art))
      );
      setAnalytics((prev) => ({
        ...prev,
        totalPageViews: prev.totalPageViews + 1
      }));
    } else if (page === "categories" && extraData?.categorySlug) {
      setActiveCategoryFilter(extraData.categorySlug);
      setFilterOptions((prev) => ({ ...prev, category: extraData.categorySlug }));
    } else if (extraData?.filterTag) {
      setFilterOptions((prev) => ({ ...prev, tag: extraData.filterTag }));
    }
  };

  // Like Article
  const likeArticle = (id: string) => {
    const isLiked = likedIds.includes(id);
    if (isLiked) {
      setLikedIds((prev) => prev.filter((item) => item !== id));
      setArticles((prev) =>
        prev.map((art) => (art.id === id ? { ...art, likes: Math.max(0, art.likes - 1) } : art))
      );
    } else {
      setLikedIds((prev) => [...prev, id]);
      setArticles((prev) =>
        prev.map((art) => (art.id === id ? { ...art, likes: art.likes + 1 } : art))
      );
    }
  };

  // Bookmark Toggle
  const toggleBookmark = (id: string) => {
    const isBookmarked = bookmarkedIds.includes(id);
    if (isBookmarked) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
      setArticles((prev) =>
        prev.map((art) => (art.id === id ? { ...art, bookmarksCount: Math.max(0, art.bookmarksCount - 1) } : art))
      );
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
      setArticles((prev) =>
        prev.map((art) => (art.id === id ? { ...art, bookmarksCount: art.bookmarksCount + 1 } : art))
      );
    }
  };

  // Add Comment
  const addComment = (articleId: string, content: string, name: string, email?: string) => {
    const newComm: Comment = {
      id: `comm-${Date.now()}`,
      articleId,
      authorName: name || "Anonymous Reader",
      authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || "reader")}`,
      email,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: []
    };
    setComments((prev) => [newComm, ...prev]);
    // update comment count on article
    setArticles((prev) =>
      prev.map((art) => (art.id === articleId ? { ...art, commentsCount: art.commentsCount + 1 } : art))
    );
  };

  // Add Reply
  const addReply = (commentId: string, content: string, name: string) => {
    const replyObj = {
      id: `rep-${Date.now()}`,
      authorName: name || "Reader",
      authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || "reply")}`,
      content,
      createdAt: new Date().toISOString(),
      likes: 0
    };

    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, replies: [...(c.replies || []), replyObj] }
          : c
      )
    );
  };

  // Like comment
  const likeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  // Subscribe Newsletter
  const subscribeNewsletter = (email: string, categoryInterest?: string) => {
    if (!email || !email.includes("@")) {
      return { success: false, message: "Please provide a valid email address." };
    }
    const exists = subscribers.some((sub) => sub.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, message: "You are already subscribed to our daily updates!" };
    }

    const newSub: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString(),
      status: "active",
      categoryInterest: categoryInterest || "All News"
    };

    setSubscribers((prev) => [newSub, ...prev]);
    setAnalytics((prev) => ({
      ...prev,
      newsletterSubscribersCount: prev.newsletterSubscribersCount + 1
    }));
    return { success: true, message: "Thank you for subscribing! Check your inbox for our welcome dispatch." };
  };

  // Admin Article CRUD
  const addArticle = (newArticle: Partial<Article>): Article => {
    const created: Article = {
      id: `art-${Date.now()}`,
      title: newArticle.title || "Untitled News Article",
      slug: (newArticle.title || "article").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      subtitle: newArticle.subtitle || "",
      excerpt: newArticle.excerpt || "Comprehensive coverage on breaking developments.",
      content: newArticle.content || "Draft article content.",
      coverImage: newArticle.coverImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200",
      imageCaption: newArticle.imageCaption || "",
      category: newArticle.category || "Technology",
      tags: newArticle.tags || ["News", "Trending"],
      author: newArticle.author || AUTHORS[0],
      publishedAt: new Date().toISOString(),
      readTime: `${Math.ceil((newArticle.content?.split(" ").length || 300) / 200)} min read`,
      views: 1,
      likes: 0,
      bookmarksCount: 0,
      shares: 0,
      commentsCount: 0,
      isHero: Boolean(newArticle.isHero),
      isFeatured: Boolean(newArticle.isFeatured),
      isTrending: Boolean(newArticle.isTrending),
      isBreaking: Boolean(newArticle.isBreaking),
      isDraft: Boolean(newArticle.isDraft),
      isEditorPick: Boolean(newArticle.isEditorPick),
      metaTitle: newArticle.metaTitle || newArticle.title,
      metaDescription: newArticle.metaDescription || newArticle.excerpt
    };

    setArticles((prev) => [created, ...prev]);
    return created;
  };

  const updateArticle = (id: string, updatedData: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, ...updatedData } : art))
    );
    if (selectedArticle?.id === id) {
      setSelectedArticle((prev) => (prev ? { ...prev, ...updatedData } : null));
    }
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((art) => art.id !== id));
  };

  // Admin Category CRUD
  const addCategory = (catData: Omit<Category, "id" | "postCount">) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`,
      postCount: 0
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleAdActive = (adId: string) => {
    setAds((prev) =>
      prev.map((ad) => (ad.id === adId ? { ...ad, active: !ad.active } : ad))
    );
  };

  return (
    <ArticleContext.Provider
      value={{
        articles,
        categories,
        comments,
        subscribers,
        ads,
        analytics,
        currentPage,
        selectedArticle,
        activeCategoryFilter,
        searchQuery,
        isSearchOpen,
        bookmarkedIds,
        likedIds,
        filterOptions,
        navigateTo,
        setSearchQuery,
        setIsSearchOpen,
        setFilterOptions,
        likeArticle,
        toggleBookmark,
        addComment,
        addReply,
        likeComment,
        subscribeNewsletter,
        addArticle,
        updateArticle,
        deleteArticle,
        addCategory,
        deleteCategory,
        toggleAdActive
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticles must be used within an ArticleProvider");
  }
  return context;
};
