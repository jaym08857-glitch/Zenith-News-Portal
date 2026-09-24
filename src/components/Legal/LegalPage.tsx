import React from "react";
import { ShieldCheck, FileText, AlertTriangle, ArrowLeft } from "lucide-react";
import { useArticles } from "../../context/ArticleContext";

interface LegalPageProps {
  type: "privacy" | "terms" | "disclaimer";
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { navigateTo } = useArticles();

  const getDetails = () => {
    switch (type) {
      case "privacy":
        return {
          title: "Privacy Policy & Data Security",
          subtitle: "How Global Chronicle collects, protects, and respects user privacy.",
          icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
          content: `
### 1. Information We Collect
We collect minimal personal information strictly necessary for newsletter delivery, reader commenting, and analytical metrics.
- **Newsletter Subscriptions**: Email addresses provided voluntarily.
- **Comments**: Reader display names and emails provided when commenting.
- **Automated Analytics**: Anonymous telemetry regarding device type, geographic region, and aggregate page views.

### 2. How We Protect Your Data
We utilize industry-standard TLS encryption protocols and secure server architectures to safeguard all stored records. We never sell, rent, or commercialize subscriber lists to third-party data brokers.

### 3. Cookies and Preference Tracking
We use lightweight, privacy-focused local storage to save your reading theme preferences (Light Mode, Dark Mode, Sepia) and bookmarked reading lists directly on your browser.
          `.trim()
        };
      case "terms":
        return {
          title: "Terms & Conditions of Service",
          subtitle: "Guidelines and rules governing the use of Chronicle digital media.",
          icon: <FileText className="w-6 h-6 text-blue-600" />,
          content: `
### 1. Intellectual Property
All original news reports, photography, data visualizations, and editorial columns are protected by international copyright laws. Unattributed syndication or web scraping is strictly prohibited without written licensing approval.

### 2. Reader Conduct & Moderation
We welcome constructive debate in our comment sections. However, we maintain zero tolerance for hate speech, defamation, personal harassment, or commercial spam. Editors reserve the right to remove non-compliant comments.

### 3. Limitation of Liability
While we strive for 100% factual accuracy, news updates occur rapidly during breaking events. Global Chronicle shall not be held liable for temporary typographical errors or third-party service interruptions.
          `.trim()
        };
      case "disclaimer":
        return {
          title: "Editorial Disclaimer & Transparency",
          subtitle: "Editorial independence, advertising guidelines, and financial disclosures.",
          icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
          content: `
### 1. Editorial Independence
Our journalism operates completely free from commercial, political, or owner influence. Advertisers and sponsors have zero oversight or approval authority over news coverage or opinion pieces.

### 2. Financial & Investment Disclosures
Articles covering public corporations, market indexes, or cryptocurrencies are provided for informational and educational purposes only and do not constitute financial advice.

### 3. Sponsored Content & Advertising
All sponsored banner zones and native advertising are clearly marked with an "ADVERTISEMENT" or "SPONSORED" badge to ensure full transparency for our readers.
          `.trim()
        };
    }
  };

  const details = getDetails();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        <button
          onClick={() => navigateTo("home")}
          className="flex items-center gap-1.5 font-bold text-xs text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Front Page</span>
        </button>

        <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/60 rounded-2xl">
              {details.icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 dark:text-white">
                {details.title}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {details.subtitle}
              </p>
            </div>
          </div>

          <div className="space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-serif">
            {details.content.split("\n\n").map((para, i) => {
              if (para.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-lg font-bold font-serif text-slate-900 dark:text-white pt-2">
                    {para.replace("### ", "")}
                  </h3>
                );
              }
              return <p key={i}>{para}</p>;
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
