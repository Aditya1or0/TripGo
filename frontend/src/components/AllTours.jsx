import React from "react";
import { motion } from "framer-motion";
import TourList from "./TourList";

const AllTours = () => {
  return (
    <motion.div
      className="flex flex-col justify-center items-center my-16 sm:my-20 p-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-white/10 border border-blue-100 dark:border-white/15 text-brand-blue dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
        Handpicked Getaways
      </div>
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold mb-3 text-center text-slate-900 dark:text-white tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Our Featured <span className="text-tripgo-gradient">Tours</span>
      </motion.h2>
      <motion.p
        className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-10 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Unforgettable journeys tailored to your interests. Explore the world in the most beautiful and luxurious ways possible.
      </motion.p>
      <TourList />
    </motion.div>
  );
};

export default AllTours;
