import React from "react";

const ServiceCard = ({ item }) => {
  return (
    <div className="bg-white dark:bg-[#181818] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-cyan-900/5 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-white/10 flex items-center justify-center flex-shrink-0 text-brand-blue dark:text-cyan-400">
          {item.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
            {item.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
