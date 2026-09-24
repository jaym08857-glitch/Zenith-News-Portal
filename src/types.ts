export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string; // e.g. "bg-blue-600", "#2563eb"
  icon: string; // Lucide icon name string
  postCount: number;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  twitterHandle?: string;
  verified?: boolean;
}

export interface CommentReply {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  authorAvatar: string;
  email?: string;
  content: string;
  createdAt: string;
  likes: number;
  replies?: CommentReply[];
  isPinned?: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt: string;
  content: string; // Markdown or rich HTML text
  coverImage: string;
  imageCaption?: string;
  category: string; // Category slug or name
  tags: string[];
  author: Author;
  publishedAt: string;
  readTime: string; // e.g., "5 min read"
  views: number;
  likes: number;
  bookmarksCount: number;
  shares: number;
  commentsCount: number;
  isHero?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBreaking?: boolean;
  isDraft?: boolean;
  isEditorPick?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  audioText?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: "active" | "unsubscribed";
  categoryInterest?: string;
}

export interface AdPlacement {
  id: string;
  name: string;
  zone: "header-leaderboard" | "sidebar-rectangle" | "in-article-banner" | "footer-banner";
  dimensions: string; // e.g. "728x90", "300x250"
  imageUrl: string;
  title: string;
  subtitle: string;
  destinationUrl: string;
  active: boolean;
  impressions: number;
  clicks: number;
}

export interface AnalyticsData {
  totalPageViews: number;
  uniqueVisitors: number;
  avgReadTimeMinutes: number;
  newsletterSubscribersCount: number;
  dailyVisits: { date: string; views: number; visitors: number }[];
  categoryDistribution: { category: string; count: number; percentage: number }[];
  topArticles: { title: string; views: number; slug: string }[];
}

export type ViewPage = 
  | "home"
  | "article"
  | "blogs"
  | "news"
  | "categories"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "disclaimer"
  | "admin";

export interface ArticleFilterOptions {
  category?: string;
  searchQuery?: string;
  tag?: string;
  sortBy?: "latest" | "popular" | "trending" | "likes";
  viewMode?: "grid" | "list";
}
