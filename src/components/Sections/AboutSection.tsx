import React from "react";
import { ShieldCheck, Award, Globe, Users, CheckCircle } from "lucide-react";
import { AUTHORS } from "../../data/mockData";

export const AboutSection: React.FC = () => {
  return (
    <section id="about-us-section" className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Editorial Mission Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Independent Editorial Excellence</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-serif tracking-tight leading-tight">
              Reporting Truth with Speed, Clarity, and Uncompromising Ethics
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Founded in 2024, <strong>Global Chronicle</strong> delivers real-time breaking news, rigorous investigative journalism, and forward-looking analysis across technology, geopolitical markets, space exploration, and macroeconomic policy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Verified Multi-Source Fact Checking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Zero Clickbait & Transparent Disclosures</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>24/7 Global Correspondent Wire</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Award-Winning Design & Data Visualizations</span>
              </div>
            </div>
          </div>

          {/* Stats Highlight Box */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl grid grid-cols-2 gap-6">
            <div className="space-y-1 border-r border-slate-100 dark:border-slate-800 pr-4">
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400 font-serif">2.4M+</span>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Readers</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400 font-serif">34</span>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Global Bureaus</p>
            </div>
            <div className="space-y-1 border-r border-slate-100 dark:border-slate-800 pr-4 pt-4 border-t">
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400 font-serif">45K+</span>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Newsletter Members</p>
            </div>
            <div className="space-y-1 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400 font-serif">12</span>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Journalism Awards</p>
            </div>
          </div>
        </div>

        {/* Editorial Board Highlights */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-serif">
              Our Senior Editorial Board
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Led by veteran journalists, astrophysicists, and technology analysts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUTHORS.map((author) => (
              <div
                key={author.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3 hover:shadow-lg transition-all"
              >
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-blue-500/20"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {author.name}
                  </h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {author.title}
                  </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {author.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
