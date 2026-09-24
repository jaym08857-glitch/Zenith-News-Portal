import React from "react";
import { Share2, Twitter, Linkedin, Youtube, Instagram, Rss, ExternalLink } from "lucide-react";

export const SocialSection: React.FC = () => {
  const channels = [
    {
      name: "X (Twitter)",
      handle: "@GlobalChronicle",
      followers: "340K Followers",
      color: "from-slate-900 to-slate-800 text-white",
      icon: <Twitter className="w-5 h-5" />,
      link: "#"
    },
    {
      name: "LinkedIn",
      handle: "Chronicle Media Group",
      followers: "120K Professionals",
      color: "from-blue-700 to-blue-600 text-white",
      icon: <Linkedin className="w-5 h-5" />,
      link: "#"
    },
    {
      name: "YouTube Wire",
      handle: "@ChronicleLive",
      followers: "580K Subscribers",
      color: "from-red-700 to-red-600 text-white",
      icon: <Youtube className="w-5 h-5" />,
      link: "#"
    },
    {
      name: "Instagram",
      handle: "@chronicle_journal",
      followers: "210K Visual Readers",
      color: "from-purple-700 to-pink-600 text-white",
      icon: <Instagram className="w-5 h-5" />,
      link: "#"
    }
  ];

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Community & Live Networks
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-serif">
              Follow Our Live Media Channels
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Rss className="w-4 h-4 text-amber-500" />
            <span>Official Syndicated RSS Feeds</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((chan) => (
            <a
              key={chan.name}
              href={chan.link}
              onClick={(e) => e.preventDefault()}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all shadow-sm hover:shadow-lg flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${chan.color} flex items-center justify-center shadow-md`}>
                  {chan.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {chan.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    {chan.handle}
                  </p>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 block mt-1">
                    {chan.followers}
                  </span>
                </div>
              </div>

              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
