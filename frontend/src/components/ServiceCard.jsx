import React from "react";
import { motion } from "framer-motion";

const ServiceCard = ({ item, index }) => {
  const IconComponent = item.icon;

  return (
    <motion.div
      className="group relative flex flex-col p-6 bg-white dark:bg-[#161616] hover:border-cyan-400/50 dark:hover:border-cyan-400/30 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-cyan-950/15 dark:hover:bg-[#1a1a1a] transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-blue/10 via-brand-cyan/10 to-brand-teal/10 dark:bg-white/5 flex items-center justify-center text-brand-blue dark:text-cyan-400 mb-4 group-hover:scale-110 group-hover:bg-tripgo-gradient group-hover:text-white transition-all duration-300 shadow-xs">
        <IconComponent className="w-6 h-6 transition-colors" />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold text-slate-400">0{index + 1}.</span>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-brand-blue dark:group-hover:text-cyan-300 transition-colors">
          {item.title}
        </h3>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {item.desc}
      </p>
    </motion.div>
  );
};

export default ServiceCard;
