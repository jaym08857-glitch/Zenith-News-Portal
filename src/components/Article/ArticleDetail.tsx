import React, { useState, useEffect } from "react";
import {
  Clock,
  Eye,
  ThumbsUp,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  MessageSquare,
  ArrowLeft,
  Copy,
  Check,
  Code,
  Send,
  User,
  Twitter,
  Linkedin,
  CornerDownRight,
  Sparkles,
  Type
} from "lucide-react";
import { Article } from "../../types";
import { useArticles } from "../../context/ArticleContext";
import { SEOInspectorModal } from "./SEOInspectorModal";

interface ArticleDetailProps {
  article: Article;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  const {
    navigateTo,
    likeArticle,
    likedIds,
    toggleBookmark,
    bookmarkedIds,
    comments,
    addComment,
    addReply,
    likeComment,
    articles
  } = useArticles();

  // Scroll Progress
  const [scrollProgress, setScrollProgress] = useState(0);

  // Reading Preferences
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [readingBg, setReadingBg] = useState<"default" | "sepia" | "dark">("default");

  // Audio Player State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Copy Link State
  const [copiedLink, setCopiedLink] = useState(false);

  // SEO Inspector Modal
  const [showSEOModal, setShowSEOModal] = useState(false);

  // Comment Form State
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const isLiked = likedIds.includes(article.id);
  const isBookmarked = bookmarkedIds.includes(article.id);

  // Filter comments for this article
  const articleComments = comments.filter((c) => c.articleId === article.id);

  // Related Articles
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Speech Narration
  const toggleAudioNarration = () => {
    if (!('speechSynthesis' in window)) {
      alert("Audio narration is not supported on this browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToRead = `${article.title}. ${article.excerpt}. ${article.content.replace(/[#>*|]/g, "")}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      
      setSpeechUtterance(utterance);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article.id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(article.id, commentText, authorName);
    setCommentText("");
  };

  const handlePostReply = (commentId: string) => {
    if (!replyText.trim()) return;
    addReply(commentId, replyText, authorName);
    setReplyText("");
    setReplyingToId(null);
  };

  // Font size classes
  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm": return "text-sm leading-relaxed";
      case "lg": return "text-lg leading-loose";
      case "xl": return "text-xl leading-loose";
      default: return "text-base leading-relaxed";
    }
  };

  // Reading mode classes
  const getReadingModeClass = () => {
    switch (readingBg) {
      case "sepia": return "bg-[#fbf0d9] text-[#2c2211] border-[#e6d8b8]";
      case "dark": return "bg-slate-900 text-slate-100 border-slate-800";
      default: return "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800";
    }
  };

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-16">
      
      {/* Scroll Reading Progress Bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 z-40">
        <div
          className="h-full bg-blue-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Breadcrumb Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs">
          <button
            onClick={() => navigateTo("home")}
            className="flex items-center gap-1.5 font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Front Page</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSEOModal(true)}
              className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold rounded-lg border border-emerald-300/50 flex items-center gap-1 hover:bg-emerald-200 transition-colors"
              title="Inspect Google SEO JSON-LD Schema"
            >
              <Code className="w-3.5 h-3.5" />
              <span>SEO Schema Inspector</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* Category & Title */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg">
              {article.category}
            </span>
            {article.isBreaking && (
              <span className="px-2.5 py-1 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg animate-pulse">
                Breaking Wire
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-slate-900 dark:text-white leading-tight">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-lg sm:text-xl font-serif text-slate-600 dark:text-slate-300 leading-relaxed italic border-l-4 border-blue-600 pl-4 py-1">
              {article.subtitle}
            </p>
          )}

          {/* Meta & Author Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/20"
              />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {article.author.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {article.author.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                {article.readTime}
              </span>
              <span>•</span>
              <span>{new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                {article.views.toLocaleString()} Reads
              </span>
            </div>
          </div>

          {/* Reading Controls Bar (Audio Reader + Font Size + Reading Mode) */}
          <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* Audio Narrator */}
            <button
              onClick={toggleAudioNarration}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
                isPlayingAudio
                  ? "bg-rose-600 text-white animate-pulse"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingAudio ? "Pause Audio Reader" : "Listen to Story (AI Narrator)"}</span>
            </button>

            {/* Reading Mode Switcher */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span className="hidden sm:inline">Theme:</span>
              <button
                onClick={() => setReadingBg("default")}
                className={`px-2.5 py-1 rounded-lg border text-[11px] ${readingBg === "default" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 border-slate-300"}`}
              >
                Standard
              </button>
              <button
                onClick={() => setReadingBg("sepia")}
                className={`px-2.5 py-1 rounded-lg border text-[11px] ${readingBg === "sepia" ? "bg-[#2c2211] text-[#fbf0d9] border-amber-800" : "bg-[#fbf0d9] text-[#2c2211] border-amber-300"}`}
              >
                Sepia
              </button>
            </div>

            {/* Font Adjuster */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-1 text-xs">
              <Type className="w-3.5 h-3.5 text-slate-400 ml-1" />
              <button
                onClick={() => setFontSize("sm")}
                className={`px-2 py-0.5 rounded font-bold ${fontSize === "sm" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300"}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize("base")}
                className={`px-2 py-0.5 rounded font-bold ${fontSize === "base" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300"}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("lg")}
                className={`px-2 py-0.5 rounded font-bold ${fontSize === "lg" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300"}`}
              >
                A+
              </button>
            </div>

          </div>
        </div>

        {/* Cover Image */}
        <div className="space-y-2">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          {article.imageCaption && (
            <p className="text-xs text-slate-500 dark:text-slate-400 italic text-center">
              {article.imageCaption}
            </p>
          )}
        </div>

        {/* Article Body Content */}
        <div className={`p-6 sm:p-10 rounded-3xl border shadow-sm transition-all ${getReadingModeClass()} ${getFontSizeClass()} space-y-6`}>
          
          {/* Excerpt Lead Paragraph */}
          <p className="font-semibold text-lg sm:text-xl font-serif text-blue-900 dark:text-blue-300 leading-relaxed border-b pb-6">
            {article.excerpt}
          </p>

          {/* Formatted Content Blocks */}
          <div className="space-y-6 font-serif">
            {article.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl sm:text-2xl font-black font-serif text-slate-900 dark:text-white pt-4">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("> ")) {
                return (
                  <blockquote key={index} className="border-l-4 border-blue-600 pl-4 my-4 italic font-medium text-slate-700 dark:text-slate-200 bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-r-xl">
                    {paragraph.replace("> ", "")}
                  </blockquote>
                );
              }
              return (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags Footer */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Topics:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                onClick={() => navigateTo("blogs", { filterTag: tag })}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

        </div>

        {/* Engagement Action Buttons & Floating Share */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => likeArticle(article.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 border ${
                isLiked
                  ? "bg-rose-600 text-white border-rose-600"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-200"
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{article.likes} Likes</span>
            </button>

            <button
              onClick={() => toggleBookmark(article.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 border ${
                isBookmarked
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-200"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isBookmarked ? "Saved" : "Save Story"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-semibold flex items-center gap-1.5"
              title="Copy Story Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </div>

        {/* Interactive Comments Section */}
        <div id="comments-section" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>Reader Discussion ({articleComments.length})</span>
            </h3>
            <span className="text-xs text-slate-400">Moderated Community Standards</span>
          </div>

          {/* Post New Comment Form */}
          <form onSubmit={handlePostComment} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name / Handle"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 dark:text-white"
              />
            </div>

            <textarea
              required
              rows={3}
              placeholder="Join the conversation. Respectful and thoughtful contributions welcome..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 dark:text-white"
            />

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Response</span>
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6 pt-4">
            {articleComments.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">
                No comments yet. Be the first to share your perspective!
              </p>
            ) : (
              articleComments.map((comm) => (
                <div key={comm.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={comm.authorAvatar}
                        alt={comm.authorName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                          {comm.authorName}
                        </h5>
                        <span className="text-[10px] text-slate-400">
                          {new Date(comm.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => likeComment(comm.id)}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 font-semibold"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{comm.likes}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {comm.content}
                  </p>

                  {/* Replies List */}
                  {comm.replies && comm.replies.length > 0 && (
                    <div className="ml-6 space-y-2 border-l-2 border-blue-500/40 pl-3 pt-2">
                      {comm.replies.map((rep) => (
                        <div key={rep.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                          <span className="font-bold text-slate-900 dark:text-white">{rep.authorName}: </span>
                          <span className="text-slate-600 dark:text-slate-300">{rep.content}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Action */}
                  {replyingToId === comm.id ? (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg outline-none"
                      />
                      <button
                        onClick={() => handlePostReply(comm.id)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold"
                      >
                        Send
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyingToId(comm.id)}
                      className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                    >
                      <CornerDownRight className="w-3 h-3" /> Reply
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Related Articles Suggestions */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4 pt-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
              Recommended Stories in {article.category}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigateTo("article", { article: rel })}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">
                        {rel.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* SEO Schema Inspector Modal */}
      {showSEOModal && (
        <SEOInspectorModal
          article={article}
          onClose={() => setShowSEOModal(false)}
        />
      )}

    </article>
  );
};
