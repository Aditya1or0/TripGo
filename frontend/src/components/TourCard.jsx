import React from "react";
import { MapPin, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const hoverEffect = {
  y: -5,
  transition: { duration: 0.25 },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TourCard = ({ tour }) => {
  const { id, title, photo, price, featured, city, avgRating } = tour;
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-white dark:bg-[#181818] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-cyan-900/5 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full group"
      whileHover={hoverEffect}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={photo}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {featured && (
          <span className="absolute top-3 left-3 bg-tripgo-gradient text-white py-1 px-3 rounded-full text-xs font-bold shadow-md shadow-brand-blue/30">
            Featured
          </span>
        )}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{avgRating || "4.8"}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-medium mb-1.5 gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-teal" />
            <span>{city}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white mb-3 group-hover:text-brand-blue transition-colors line-clamp-1">
            <Link
              to={`/tours/${id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {title}
            </Link>
          </h3>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-white/10">
          <div>
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Starting at</p>
            <h5 className="text-lg font-black text-slate-900 dark:text-white">
              ₹{price?.toLocaleString()}{" "}
              <span className="text-xs font-normal text-slate-400">/person</span>
            </h5>
          </div>
          <motion.button
            className="bg-tripgo-gradient text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded-xl shadow-sm shadow-brand-blue/20 hover:shadow-md hover:shadow-cyan-500/25 transition-all"
            onClick={() => navigate(`/tours/${id}`)}
            whileTap={{ scale: 0.95 }}
          >
            Explore
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
