import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import {
  MapPin,
  Calendar,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
  ShieldCheck,
  Globe2,
  Plus,
  Minus,
  Sparkles,
  Plane,
  Mountain,
  Train,
  Palmtree,
  ArrowRight,
} from "lucide-react";
import heroImage from "../assets/hero-image.png";

const FEATURED_DESTINATIONS = [
  { city: "Paris", country: "France", highlight: "Eiffel Tower & Louvre" },
  { city: "Tokyo", country: "Japan", highlight: "Shibuya & Mt. Fuji" },
  { city: "Rome", country: "Italy", highlight: "Colosseum & Historic Ruins" },
  { city: "Bali", country: "Indonesia", highlight: "Ubud & Tropical Beaches" },
  { city: "Swiss Alps", country: "Switzerland", highlight: "Matterhorn & Scenic Lakes" },
  { city: "Maldives", country: "South Asia", highlight: "Overwater Luxury Villas" },
  { city: "New York", country: "United States", highlight: "Manhattan & Broadway" },
  { city: "Dubai", country: "United Arab Emirates", highlight: "Iconic Skyline & Marina" },
];

const POPULAR_TAGS = ["Paris", "Bali", "Swiss Alps", "Tokyo", "Dubai"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Header = () => {
  const navigate = useNavigate();
  const { theme } = useContext(AppContext);

  // Search state
  const [destination, setDestination] = useState("");
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);

  // Date picker state
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date(2026, 9, 15)); // Oct 15, 2026
  const [endDate, setEndDate] = useState(new Date(2026, 9, 22)); // Oct 22, 2026
  const [hoverDate, setHoverDate] = useState(null);
  const [calMonth, setCalMonth] = useState(9); // Oct (0-indexed)
  const [calYear, setCalYear] = useState(2026);

  // Guests state
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  // Refs for click outside
  const destRef = useRef(null);
  const dateRef = useRef(null);
  const guestsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (destRef.current && !destRef.current.contains(e.target)) {
        setDestDropdownOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(e.target)) {
        setDatePickerOpen(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(e.target)) {
        setGuestsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format date helper
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getFormattedDateRange = () => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}, ${endDate.getFullYear()}`;
    }
    if (startDate) {
      return `${formatDate(startDate)} - Select return`;
    }
    return "Select travel dates";
  };

  // Calendar helpers
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((prev) => prev - 1);
    } else {
      setCalMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((prev) => prev + 1);
    } else {
      setCalMonth((prev) => prev + 1);
    }
  };

  const handleDateClick = (day) => {
    const clicked = new Date(calYear, calMonth, day);
    if (!startDate || (startDate && endDate)) {
      setStartDate(clicked);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (clicked < startDate) {
        setStartDate(clicked);
      } else {
        setEndDate(clicked);
        setDatePickerOpen(false);
      }
    }
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isInRange = (day) => {
    if (!startDate) return false;
    const current = new Date(calYear, calMonth, day);
    const targetEnd = endDate || hoverDate;
    if (!targetEnd) return false;
    return current > startDate && current < targetEnd;
  };

  // Apply Quick Date Preset
  const applyPreset = (daysFromNow, duration) => {
    const start = new Date(2026, 9, 21);
    start.setDate(start.getDate() + daysFromNow);
    const end = new Date(start);
    end.setDate(end.getDate() + duration);
    setStartDate(start);
    setEndDate(end);
    setCalMonth(start.getMonth());
    setCalYear(start.getFullYear());
    setDatePickerOpen(false);
  };

  const handleSearch = () => {
    navigate(destination ? `/tours?destination=${encodeURIComponent(destination)}` : "/tours");
  };

  return (
    <section
      className={`relative w-full min-h-[92vh] flex flex-col justify-between transition-colors duration-300 overflow-hidden ${
        theme === "dark"
          ? "bg-[#111] text-white"
          : "bg-gradient-to-b from-[#eaf4fc] via-[#f7faff] to-[#ffffff] text-slate-900"
      } pt-24 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-10`}
    >
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-96 h-96 bg-brand-blue/15 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[420px] h-[420px] bg-brand-teal/15 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-between flex-1 gap-10 lg:gap-12">
        
        {/* Top Split Area: Left = Typography & Value, Right = 3D Fixed Diorama */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center pt-2 sm:pt-4">
          
          {/* Left Column: Hero Text (lg:col-span-7) with overlap z-index */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-7 relative z-20 space-y-5"
          >
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm border ${
                theme === "dark"
                  ? "bg-white/10 backdrop-blur-md border-cyan-500/30 text-cyan-300"
                  : "bg-white/90 backdrop-blur-md border-blue-200 text-brand-blue shadow-blue-500/5"
              }`}
            >
              <Sparkles className="w-4 h-4 text-brand-teal animate-pulse" />
              <span>Handcrafted Worldwide Getaways</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
              <span className="text-[11px] font-normal opacity-80">2026 Collection</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black tracking-tight leading-[1.08] max-w-2xl"
            >
              Journey Beyond Ordinary with{" "}
              <span className={theme === "dark" ? "text-tripgo-glow drop-shadow-[0_0_35px_rgba(45,212,191,0.4)]" : "text-tripgo-gradient"}>
                TripGo
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className={`text-base sm:text-lg md:text-xl max-w-xl leading-relaxed font-normal ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Discover breathtaking landscapes, iconic global destinations, and tailor-made
              travel itineraries curated by passionate world-class explorers.
            </motion.p>

            {/* Quick Destination Tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1"
            >
              <span className={`text-xs font-semibold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                Trending:
              </span>
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setDestination(tag)}
                  className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                    destination === tag
                      ? "bg-tripgo-gradient text-white shadow-sm"
                      : theme === "dark"
                      ? "bg-[#181818] hover:bg-[#222] text-slate-300 border border-white/10"
                      : "bg-white hover:bg-blue-50 text-slate-700 border border-slate-200/80 hover:border-brand-blue/30 shadow-xs"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className={`pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-medium ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-amber-400 ${
                  theme === "dark" ? "bg-amber-400/10" : "bg-amber-50"
                }`}>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <span>4.9 / 5 Rating</span>
              </div>

              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-cyan-400 ${
                  theme === "dark" ? "bg-cyan-400/10" : "bg-cyan-50"
                }`}>
                  <Globe2 className="w-4 h-4" />
                </div>
                <span>120+ Curated Tours</span>
              </div>

              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-teal-400 ${
                  theme === "dark" ? "bg-teal-400/10" : "bg-teal-50"
                }`}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Verified Operators</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Isometric Diorama - Fixed & Enlarged with text overlap (lg:col-span-5) */}
          <div className="relative lg:col-span-5 flex items-center justify-center lg:justify-end py-4 lg:py-0 lg:-ml-20 xl:-ml-28 z-10 pointer-events-none">
            {/* Ambient Radial Backlight Glow */}
            <div className={`absolute inset-0 m-auto w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full blur-3xl pointer-events-none transition-all ${
              theme === "dark"
                ? "bg-gradient-to-tr from-cyan-500/20 via-teal-500/15 to-sky-400/10"
                : "bg-gradient-to-tr from-sky-300/35 via-cyan-200/30 to-teal-200/25"
            }`} />

            {/* Static (No Framer Motion floating loop), enlarged image container */}
            <div className="relative w-full flex items-center justify-center lg:justify-end">
              <img
                src={heroImage}
                alt="TripGo 3D Miniature Travel World"
                className="w-full max-w-[420px] sm:max-w-[560px] lg:max-w-[680px] xl:max-w-[760px] h-auto object-contain select-none drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section: Luxury Floating Booking Card matching #111 in dark mode */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className={`w-full max-w-6xl mx-auto rounded-3xl p-3 sm:p-4 shadow-2xl relative z-30 transition-all duration-300 ${
            theme === "dark"
              ? "bg-[#111] backdrop-blur-2xl border border-white/10 shadow-black/70"
              : "bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-brand-blue/10"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center">
            
            {/* Field 1: Destination Selector (md:col-span-4) */}
            <div ref={destRef} className="relative md:col-span-4">
              <div
                onClick={() => {
                  setDestDropdownOpen((prev) => !prev);
                  setDatePickerOpen(false);
                  setGuestsOpen(false);
                }}
                className={`flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                  destDropdownOpen
                    ? "bg-brand-blue/5 border-brand-blue/40 ring-2 ring-brand-blue/20"
                    : theme === "dark"
                    ? "bg-[#181818] hover:bg-[#202020] border-white/10"
                    : "bg-slate-50/90 hover:bg-slate-100/90 border-slate-200/80"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0 text-brand-blue">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Destination
                  </p>
                  <p className={`text-sm sm:text-base truncate ${
                    destination
                      ? theme === "dark" ? "font-bold text-white" : "font-bold text-slate-800"
                      : theme === "dark" ? "font-medium text-slate-400" : "font-medium text-slate-500"
                  }`}>
                    {destination || "Where would you like to go?"}
                  </p>
                </div>
              </div>

              {/* Destination Dropdown - Opens ABOVE */}
              <AnimatePresence>
                {destDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute left-0 bottom-full mb-3 w-full sm:w-80 rounded-2xl shadow-2xl border p-2 z-50 text-left ${
                      theme === "dark"
                        ? "bg-[#111] border-white/15 text-white shadow-black/80"
                        : "bg-white border-slate-200 text-slate-800"
                    }`}
                  >
                    <div className="p-2 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Select Destination
                      </p>
                      {destination && (
                        <button
                          type="button"
                          onClick={() => setDestination("")}
                          className="text-xs text-slate-400 hover:text-red-400 font-medium"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto py-1 space-y-1">
                      {FEATURED_DESTINATIONS.map((item) => (
                        <div
                          key={item.city}
                          onClick={() => {
                            setDestination(`${item.city}, ${item.country}`);
                            setDestDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                            destination.startsWith(item.city)
                              ? "bg-blue-50 dark:bg-white/10 text-brand-blue dark:text-cyan-300"
                              : theme === "dark"
                              ? "hover:bg-[#181818] text-slate-200"
                              : "hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-bold">{item.city}</p>
                            <p className="text-xs text-slate-400">{item.country} • {item.highlight}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Field 2: Date Picker (md:col-span-4) */}
            <div ref={dateRef} className="relative md:col-span-4">
              <div
                onClick={() => {
                  setDatePickerOpen((prev) => !prev);
                  setDestDropdownOpen(false);
                  setGuestsOpen(false);
                }}
                className={`flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                  datePickerOpen
                    ? "bg-brand-teal/5 border-brand-teal/40 ring-2 ring-brand-teal/20"
                    : theme === "dark"
                    ? "bg-[#181818] hover:bg-[#202020] border-white/10"
                    : "bg-slate-50/90 hover:bg-slate-100/90 border-slate-200/80"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center flex-shrink-0 text-brand-teal">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Travel Dates Range
                  </p>
                  <p className={`text-sm sm:text-base font-bold truncate ${
                    theme === "dark" ? "text-white" : "text-slate-800"
                  }`}>
                    {getFormattedDateRange()}
                  </p>
                </div>
              </div>

              {/* Interactive Calendar Popover - Opens ABOVE */}
              <AnimatePresence>
                {datePickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-3 w-full sm:w-88 rounded-3xl shadow-2xl border p-4 z-50 text-left ${
                      theme === "dark"
                        ? "bg-[#111] border-white/15 text-white shadow-black/80"
                        : "bg-white border-slate-200 text-slate-800"
                    }`}
                  >
                    {/* Month Navigator Header */}
                    <div className="flex items-center justify-between mb-3 px-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className={`p-1.5 rounded-lg transition-colors ${
                          theme === "dark" ? "hover:bg-[#222] text-slate-300" : "hover:bg-slate-100 text-slate-600"
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                        {MONTH_NAMES[calMonth]} {calYear}
                      </span>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className={`p-1.5 rounded-lg transition-colors ${
                          theme === "dark" ? "hover:bg-[#222] text-slate-300" : "hover:bg-slate-100 text-slate-600"
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Presets */}
                    <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1 text-xs">
                      <button
                        type="button"
                        onClick={() => applyPreset(2, 5)}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                          theme === "dark"
                            ? "bg-[#1e1e1e] hover:bg-cyan-500/20 text-slate-200"
                            : "bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-brand-blue"
                        }`}
                      >
                        This Weekend
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset(7, 7)}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                          theme === "dark"
                            ? "bg-[#1e1e1e] hover:bg-cyan-500/20 text-slate-200"
                            : "bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-brand-blue"
                        }`}
                      >
                        Next Week
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset(14, 10)}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                          theme === "dark"
                            ? "bg-[#1e1e1e] hover:bg-cyan-500/20 text-slate-200"
                            : "bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-brand-blue"
                        }`}
                      >
                        In 2 Weeks
                      </button>
                    </div>

                    {/* Weekday Names */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-1">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                        <div key={d} className="py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {Array.from({ length: getFirstDayOfMonth(calMonth, calYear) }).map((_, i) => (
                        <div key={`empty-${i}`} className="py-2" />
                      ))}

                      {Array.from({ length: getDaysInMonth(calMonth, calYear) }).map((_, i) => {
                        const day = i + 1;
                        const current = new Date(calYear, calMonth, day);
                        const isStart = isSameDay(current, startDate);
                        const isEnd = isSameDay(current, endDate);
                        const inRange = isInRange(day);

                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => handleDateClick(day)}
                            onMouseEnter={() => !endDate && setHoverDate(current)}
                            className={`py-2 rounded-xl font-medium transition-all relative ${
                              isStart || isEnd
                                ? "bg-tripgo-gradient text-white font-bold shadow-md shadow-brand-blue/30 z-10"
                                : inRange
                                ? theme === "dark"
                                  ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                                  : "bg-teal-50 text-brand-blue font-semibold"
                                : theme === "dark"
                                ? "hover:bg-[#1e1e1e] text-slate-200"
                                : "hover:bg-slate-100 text-slate-700"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Range Display & Confirm */}
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                      <span className="text-slate-400 truncate">
                        {startDate && endDate
                          ? `${formatDate(startDate)} - ${formatDate(endDate)}`
                          : "Select departure and return date"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setDatePickerOpen(false)}
                        className="px-3.5 py-1.5 rounded-lg bg-tripgo-gradient text-white font-semibold shadow-xs"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Field 3: Guests & Rooms Selector (md:col-span-2) */}
            <div ref={guestsRef} className="relative md:col-span-2">
              <div
                onClick={() => {
                  setGuestsOpen((prev) => !prev);
                  setDestDropdownOpen(false);
                  setDatePickerOpen(false);
                }}
                className={`flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                  guestsOpen
                    ? "bg-brand-cyan/5 border-brand-cyan/40 ring-2 ring-brand-cyan/20"
                    : theme === "dark"
                    ? "bg-[#181818] hover:bg-[#202020] border-white/10"
                    : "bg-slate-50/90 hover:bg-slate-100/90 border-slate-200/80"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center flex-shrink-0 text-brand-cyan">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Travelers
                  </p>
                  <p className={`text-sm sm:text-base font-bold truncate ${
                    theme === "dark" ? "text-white" : "text-slate-800"
                  }`}>
                    {adults + children} {adults + children === 1 ? "Guest" : "Guests"}
                  </p>
                </div>
              </div>

              {/* Guests Popover - Opens ABOVE */}
              <AnimatePresence>
                {guestsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 bottom-full mb-3 w-72 rounded-2xl shadow-2xl border p-4 z-50 text-left space-y-3 ${
                      theme === "dark"
                        ? "bg-[#111] border-white/15 text-white shadow-black/80"
                        : "bg-white border-slate-200 text-slate-800"
                    }`}
                  >
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Adults</p>
                        <p className="text-xs text-slate-400">Ages 13 and above</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors ${
                            theme === "dark"
                              ? "border-white/20 text-slate-300 hover:bg-[#222]"
                              : "border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdults((prev) => prev + 1)}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors ${
                            theme === "dark"
                              ? "border-white/20 text-slate-300 hover:bg-[#222]"
                              : "border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/10">
                      <div>
                        <p className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Children</p>
                        <p className="text-xs text-slate-400">Ages 0 - 12</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors ${
                            theme === "dark"
                              ? "border-white/20 text-slate-300 hover:bg-[#222]"
                              : "border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">
                          {children}
                        </span>
                        <button
                          type="button"
                          onClick={() => setChildren((prev) => prev + 1)}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors ${
                            theme === "dark"
                              ? "border-white/20 text-slate-300 hover:bg-[#222]"
                              : "border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Rooms */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/10">
                      <div>
                        <p className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Rooms</p>
                        <p className="text-xs text-slate-400">Total rooms</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setRooms((prev) => Math.max(1, prev - 1))}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors ${
                            theme === "dark"
                              ? "border-white/20 text-slate-300 hover:bg-[#222]"
                              : "border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">
                          {rooms}
                        </span>
                        <button
                          type="button"
                          onClick={() => setRooms((prev) => prev + 1)}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors ${
                            theme === "dark"
                              ? "border-white/20 text-slate-300 hover:bg-[#222]"
                              : "border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setGuestsOpen(false)}
                      className="w-full mt-2 py-2 rounded-xl bg-tripgo-gradient text-white text-xs font-semibold shadow-md"
                    >
                      Apply Travelers
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Field 4: Search CTA Button (md:col-span-2) */}
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full min-h-[52px] bg-tripgo-gradient text-white font-bold px-5 py-3.5 rounded-2xl shadow-lg shadow-brand-blue/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base group"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                <span>Search Tours</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Header;
