import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Editorial Pitch",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "Editorial Pitch", message: "" });
    }, 4000);
  };

  return (
    <section id="contact-us-section" className="py-16 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Get in Touch
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white font-serif">
            Contact the Chronicle Newsroom
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Have a confidential tip, press release, licensing query, or feedback? Our team is listening.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Direct Details Sidebar */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif mb-2">
                Headquarters & Bureaus
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Main editorial desk located in New York City with regional bureaus in London, Tokyo, and Geneva.
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-950/60 text-blue-600 rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Global Press Center</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    550 Fifth Avenue, 12th Floor, New York, NY 10036
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-950/60 text-blue-600 rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Email Desks</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    newsroom@globalchronicle.org (Tips)<br />
                    press@globalchronicle.org (Media)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-950/60 text-blue-600 rounded-xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Editorial Phone Wire</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    +1 (212) 555-0192 (Mon - Fri, 8:00 AM - 6:00 PM EST)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Message Dispatched to Newsroom
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Thank you for reaching out. An assigned editor will review your submission promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@organization.com"
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Inquiry Department</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors dark:text-white"
                  >
                    <option value="Editorial Pitch">Editorial Pitch / Article Submission</option>
                    <option value="Confidential Tip">Confidential Whistleblower Tip</option>
                    <option value="Press & Media">Press & Media Inquiries</option>
                    <option value="Licensing & Syndication">Content Syndication / Licensing</option>
                    <option value="General Feedback">General Reader Feedback</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Message Content</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details of your pitch or inquiry..."
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Editors</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
