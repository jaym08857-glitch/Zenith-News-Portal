import React from "react";
import { BookOpen, ThumbsUp, MessageSquare, ArrowRight, UserCheck } from "lucide-react";
import { useArticles } from "../../context/ArticleContext";

export const TrendingBlogs: React.FC = () => {
  const { articles, navigateTo, likeArticle, likedIds } = useArticles();

  // Filter blog posts or articles with opinion/culture/tech insights
  const blogList = articles.slice(0, 4);

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Thought Leadership & Columns
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
              Trending Blogs & Editorial Opinions
            </h2>
          </div>

          <button
            onClick={() => navigateTo("blogs")}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 group"
          >
            <span>View All Editorial Columns</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Blog Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogList.map((blog) => {
            const isLiked = likedIds.includes(blog.id);
            return (
              <div
                key={blog.id}
                className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-lg flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* Author Header */}
                  <div className="flex items-center gap-3">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                        {blog.author.name}
                        {blog.author.verified && <UserCheck className="w-3.5 h-3.5 text-blue-500" />}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[160px]">
                        {blog.author.title}
                      </p>
                    </div>
                  </div>

                  {/* Blog Title */}
                  <h3
                    onClick={() => navigateTo("article", { article: blog })}
                    className="font-bold text-slate-900 dark:text-slate-100 font-serif text-base leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer line-clamp-3"
                  >
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Card Engagement Bar */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => likeArticle(blog.id)}
                      className={`flex items-center gap-1 font-semibold transition-colors ${
                        isLiked ? "text-rose-600 dark:text-rose-400" : "hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{blog.likes}</span>
                    </button>

                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{blog.commentsCount}</span>
                    </span>
                  </div>

                  <span className="text-[11px] font-medium text-slate-400">
                    {blog.readTime}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
