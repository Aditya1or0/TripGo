import React from "react";
import { TrendingUp, UserCheck, Award } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: TrendingUp,
    value: "12k+",
    label: "Successful Trips",
    color: "text-brand-blue dark:text-cyan-400",
    bg: "bg-blue-50 dark:bg-white/10",
  },
  {
    icon: UserCheck,
    value: "25k+",
    label: "Happy Travelers",
    color: "text-brand-teal dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-white/10",
  },
  {
    icon: Award,
    value: "10+",
    label: "Years of Excellence",
    color: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-white/10",
  },
];

const Experience = () => {
  return (
    <motion.div
      className="w-full flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-white/10 border border-blue-100 dark:border-white/15 text-brand-blue dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
          Proven Track Record
        </div>
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold mb-3 text-center text-slate-900 dark:text-white tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Why Travelers Choose <span className="text-tripgo-gradient">TripGo</span>
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg text-slate-500 dark:text-slate-400 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Decades of curated travel expertise ensuring unparalleled luxury, safety, and comfort on every single itinerary.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center bg-white dark:bg-[#181818] border border-slate-200/80 dark:border-white/10 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300 transform hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-4 shadow-xs`}>
              <item.icon className="w-7 h-7" />
            </div>
            <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">
              {item.value}
            </span>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;
