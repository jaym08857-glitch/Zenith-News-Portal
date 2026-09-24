import React, { useState } from "react";
import { Mail, CheckCircle2, ShieldCheck, Sparkles, Send } from "lucide-react";
import { useArticles } from "../../context/ArticleContext";

export const NewsletterSection: React.FC = () => {
  const { subscribeNewsletter, categories } = useArticles();
  const [email, setEmail] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All News");
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const res = subscribeNewsletter(email, selectedTopic);
    setFeedback(res);
    if (res.success) {
      setEmail("");
    }
  };

  return (
    <section id="newsletter-subscription" className="py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white relative overflow-hidden transition-colors">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Badge & Title */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Daily Chronicle Dispatch</span>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black font-serif tracking-tight leading-tight">
            Stay Ahead with Essential Morning Briefings
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Delivered every weekday at 6:00 AM EST. Curated analysis, breaking wire reports, and deep technological insights straight to your inbox.
          </p>
        </div>

        {/* Subscription Form Box */}
        <form onSubmit={handleSubscribe} className="max-w-xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-white/10 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20">
            <div className="flex items-center gap-2 px-3 w-full sm:w-auto flex-1">
              <Mail className="w-5 h-5 text-blue-400 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your professional email..."
                required
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm outline-none py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/40 flex items-center justify-center gap-2 shrink-0"
            >
              <span>Subscribe Free</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Interest Selector & Privacy Note */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 pt-2">
            <span className="font-medium text-slate-400">Preferred Desk:</span>
            <button
              type="button"
              onClick={() => setSelectedTopic("All News")}
              className={`px-3 py-1 rounded-full border transition-colors ${
                selectedTopic === "All News"
                  ? "bg-blue-600 border-blue-500 text-white font-bold"
                  : "bg-slate-800/60 border-slate-700 hover:bg-slate-800"
              }`}
            >
              All Desks
            </button>
            {categories.slice(0, 3).map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedTopic(cat.name)}
                className={`px-3 py-1 rounded-full border transition-colors ${
                  selectedTopic === cat.name
                    ? "bg-blue-600 border-blue-500 text-white font-bold"
                    : "bg-slate-800/60 border-slate-700 hover:bg-slate-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Feedback Message */}
          {feedback && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 ${
                feedback.success
                  ? "bg-emerald-950/80 border border-emerald-800 text-emerald-300"
                  : "bg-rose-950/80 border border-rose-800 text-rose-300"
              }`}
            >
              {feedback.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : null}
              <span>{feedback.message}</span>
            </div>
          )}
        </form>

        {/* Social Proof */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero Spam • Unsubscribe Anytime</span>
          </div>
          <span>•</span>
          <div>
            <span>Joined by <strong className="text-white">45,280+</strong> global readers</span>
          </div>
        </div>

      </div>
    </section>
  );
};
