import React from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    event.target.reset();
    toast.success("Thank you for subscribing to TripGo alerts!");
  };

  return (
    <motion.div
      className="w-full p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-blue-50/60 to-white dark:from-[#1c1c1c] dark:to-[#141414] border border-slate-200/80 dark:border-white/10 text-center relative overflow-hidden shadow-sm"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-white/10 border border-blue-100 dark:border-white/15 text-brand-blue dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>Exclusive Insider Deals</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-slate-900 dark:text-white tracking-tight">
          Subscribe for Secret <span className="text-tripgo-gradient">Travel Deals</span>
        </h2>
        <p className="text-base text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
          Get weekly handpicked luxury getaways, early-bird flight discounts, and member-only promotions delivered to your inbox.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-[#252525] border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm shadow-xs transition-all"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto flex-shrink-0 bg-tripgo-gradient text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-md shadow-brand-blue/30 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Subscribe</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default NewsLetterBox;
