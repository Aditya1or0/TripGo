import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const SearchBar = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full"
      initial={{ opacity: 0.2, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-white/10 border border-blue-100 dark:border-white/15 text-brand-blue dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
        Seamless Experience
      </div>

      <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-center text-slate-900 dark:text-white tracking-tight">
        Plan in 3 Simple Steps with{" "}
        <span className="text-tripgo-gradient">TripGo</span>
      </h2>
      <p className="text-center text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mb-10">
        Everything you need to discover, customize, and embark on your dream journey.
      </p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15, duration: 0.5 },
          },
        }}
      >
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            className="group relative flex flex-col p-6 bg-white dark:bg-[#161616] hover:border-cyan-400/50 dark:hover:border-cyan-400/30 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-cyan-950/15 dark:hover:bg-[#1a1a1a] transition-all duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-blue/10 via-brand-cyan/10 to-brand-teal/10 dark:bg-white/5 flex items-center justify-center text-brand-blue dark:text-cyan-400 mb-4 group-hover:scale-110 group-hover:bg-tripgo-gradient group-hover:text-white transition-all duration-300 shadow-xs">
              <item.icon className="w-6 h-6 transition-colors" />
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-slate-400">0{index + 1}.</span>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-brand-blue dark:group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;
