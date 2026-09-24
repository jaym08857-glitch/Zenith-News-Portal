import React, { useState } from "react";
import { Code, Copy, Check, X, ShieldCheck } from "lucide-react";
import { Article } from "../../types";

interface SEOInspectorModalProps {
  article: Article;
  onClose: () => void;
}

export const SEOInspectorModal: React.FC<SEOInspectorModalProps> = ({ article, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Generate Google-friendly JSON-LD structured data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://globalchronicle.org/article/${article.slug}`
    },
    "headline": article.title,
    "description": article.metaDescription || article.excerpt,
    "image": [article.coverImage],
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "jobTitle": article.author.title
    },
    "publisher": {
      "@type": "Organization",
      "name": "Global Chronicle Media Group",
      "logo": {
        "@type": "ImageObject",
        "url": "https://globalchronicle.org/logo.png"
      }
    },
    "articleSection": article.category,
    "keywords": article.tags.join(", ")
  };

  const jsonString = JSON.stringify(jsonLdData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full text-slate-100 overflow-hidden shadow-2xl space-y-4 p-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-lg text-white font-serif">
              Google Structured Data Inspector (JSON-LD)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Google Search uses JSON-LD structured data to index articles for rich snippets, top stories carousels, and Google News features.
        </p>

        <div className="relative bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto max-h-80">
          <pre className="text-emerald-400">{jsonString}</pre>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Valid Schema.org Standard
          </span>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied JSON-LD!" : "Copy Schema JSON"}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
