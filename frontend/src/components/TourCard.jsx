import React from "react";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TourCard = ({ tour }) => {
  const { id, title, photo, price, featured, city, avgRating } = tour;
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-white/10 hover:border-cyan-400/50 dark:hover:border-cyan-400/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-cyan-950/20 transition-all duration-500 flex flex-col h-full group"
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Visual Image Header */}
      <div className="relative overflow-hidden aspect-[16/11]">
        <img
          src={photo}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Ambient Bottom Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

        {/* Featured Tag */}
        {featured && (
          <span className="absolute top-3.5 left-3.5 bg-tripgo-gradient text-white py-1 px-3 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md shadow-brand-blue/30">
            Featured
          </span>
        )}

        {/* City / Location Pill */}
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md border border-white/15 text-white px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-brand-teal" />
          <span>{city}</span>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md border border-white/15 text-white px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{avgRating || "4.8"}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-brand-teal uppercase tracking-wider">
            Curated Itinerary
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white mt-1 group-hover:text-brand-blue dark:group-hover:text-cyan-300 transition-colors line-clamp-1">
            <Link
              to={`/tours/${id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {title}
            </Link>
          </h3>
        </div>

        {/* Price & Action Button */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-white/10">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Starting at</p>
            <h5 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              ₹{price?.toLocaleString()}{" "}
              <span className="text-xs font-normal text-slate-400">/person</span>
            </h5>
          </div>
          
          <button
            onClick={() => navigate(`/tours/${id}`)}
            className="inline-flex items-center gap-1.5 bg-tripgo-gradient hover:bg-tripgo-gradient-hover text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl shadow-md shadow-brand-blue/20 hover:shadow-cyan-500/30 transition-all group/btn"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
