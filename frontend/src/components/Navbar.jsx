import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, ChevronDown, Sun, Moon } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { user, logout, theme, toggleTheme } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        !event.target.closest(".mobile-menu-container") &&
        !event.target.closest(".menu-button")
      ) {
        setMenuOpen(false);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/tours", label: "Tours" },
    { to: "/booking", label: "Book Now" },
    ...(user ? [{ to: "/my-booking", label: "My Bookings" }] : []),
  ];

  const isActive = (path) => location.pathname === path;

  // Choose logo: in dark mode use white text logo, in light mode use dark text logodark
  const currentLogo = theme === "dark" ? assets.logo : assets.logodark;

  return (
    <>
      {/* Floating Navbar Container */}
      <header
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? theme === "dark"
              ? "bg-[#111]/95 backdrop-blur-md shadow-sm shadow-black/20 py-1.5 border-b border-white/10"
              : "bg-white/95 backdrop-blur-md shadow-sm shadow-slate-900/5 py-1.5 border-b border-slate-200/80"
            : theme === "dark"
            ? isHome
              ? "bg-transparent py-2"
              : "bg-[#111]/85 backdrop-blur-sm py-2 border-b border-white/10"
            : "bg-white/90 backdrop-blur-md py-2 border-b border-slate-200/70 shadow-xs"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-11 sm:h-12">
            
            {/* 1. Left: Brand Logo (Dynamic based on dark/light mode) */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center group transition-transform duration-200 hover:scale-[1.03]"
            >
              <img
                src={currentLogo}
                alt="TripGo"
                className="h-9 sm:h-10 md:h-11 w-auto object-contain drop-shadow-xs"
              />
            </Link>

            {/* 2. Center: Rectangle Bar for Navigation Items */}
            <div className="hidden md:flex items-center">
              <nav
                className={`flex items-center gap-1 px-2 py-1 rounded-xl border transition-all duration-300 ${
                  theme === "dark"
                    ? scrolled || !isHome
                      ? "bg-[#222]/90 border-white/15 shadow-xs backdrop-blur-md"
                      : "bg-[#222] border-white/20 shadow-md shadow-black/10 backdrop-blur-xl"
                    : "bg-slate-100/95 border-slate-200/90 shadow-xs backdrop-blur-md"
                }`}
              >
                {navLinks.map((link) => {
                  const active = isActive(link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`relative px-3.5 py-1 rounded-lg text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 ${
                        active
                          ? theme === "dark"
                            ? "bg-white/20 text-white font-semibold shadow-xs border border-white/30 backdrop-blur-sm"
                            : "bg-white text-brand-blue font-bold shadow-xs border border-slate-200/80"
                          : theme === "dark"
                          ? "text-slate-300 hover:text-white hover:bg-white/10 font-medium"
                          : "text-slate-700 hover:text-brand-blue hover:bg-white/80 font-semibold"
                      }`}
                    >
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 animate-pulse" />
                      )}
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* 3. Right: Theme Toggle & Auth / Action Button */}
            <div className="hidden md:flex items-center space-x-2.5">
              {/* Direct Dark/Light Mode Toggle (shadcn style, no switcher dropdown) */}
              <button
                type="button"
                onClick={toggleTheme}
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label="Toggle theme"
                className={`p-1.5 rounded-lg border transition-all duration-200 flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-[#222] border-white/20 text-amber-400 hover:bg-[#2d2d2d]"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
                )}
              </button>

              {user ? (
                <div className="relative group">
                  <div
                    className={`flex items-center space-x-2 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      scrolled || !isHome
                        ? theme === "dark"
                          ? "border-white/15 bg-[#222] text-white hover:bg-[#2a2a2a]"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                        : theme === "dark"
                        ? "border-white/20 bg-slate-900/50 text-white hover:bg-slate-900/70"
                        : "border-slate-200 bg-white/80 text-slate-800 hover:bg-white"
                    }`}
                  >
                    <img
                      src={assets.user}
                      alt="Profile"
                      className="w-6 h-6 rounded-full ring-2 ring-cyan-400/50"
                    />
                    <span className="text-xs sm:text-sm font-semibold max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-3 h-3 opacity-70" />
                  </div>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#1c1c1c] rounded-xl shadow-xl border border-slate-100 dark:border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-50">
                    <div className="p-2.5 border-b border-slate-100 dark:border-white/10 bg-slate-50/70 dark:bg-[#161616]">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Signed in as</p>
                      <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
                        {user.name}
                      </p>
                    </div>
                    <div className="p-1">
                      <Link
                        to="/my-booking"
                        className="flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <User className="w-3.5 h-3.5 mr-2 text-brand-teal" />
                        My Bookings
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full flex items-center px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors text-left"
                      >
                        <LogOut className="w-3.5 h-3.5 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <button className="relative px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-tripgo-gradient shadow-sm shadow-brand-blue/20 hover:shadow-md hover:shadow-cyan-500/25 hover:opacity-95 transform hover:-translate-y-0.5 active:translate-y-0 transition-all">
                    Login
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2 mobile-menu-container">
              {/* Direct Dark/Light Mode Toggle for Mobile */}
              <button
                type="button"
                onClick={toggleTheme}
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label="Toggle theme"
                className={`p-2 rounded-xl border transition-all duration-200 flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-[#222] border-white/20 text-amber-400 hover:bg-[#2d2d2d]"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
                )}
              </button>

              {user && (
                <img
                  src={assets.user}
                  alt="Profile"
                  className="w-7 h-7 rounded-full ring-2 ring-cyan-400"
                />
              )}
              <button
                onClick={toggleMenu}
                className={`menu-button p-2 rounded-xl border transition-colors ${
                  theme === "dark"
                    ? isHome && !scrolled
                      ? "text-white bg-slate-900/40 border-white/20"
                      : "text-white hover:bg-white/10 border-white/10"
                    : "text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed top-16 left-4 right-4 bg-white/95 dark:bg-[#1c1c1c]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 mobile-menu-container overflow-hidden p-4 space-y-3">
            {/* Centered Rectangle Bar inside Mobile */}
            <div className="p-2 bg-slate-50 dark:bg-[#252525] rounded-xl space-y-1 border border-slate-100 dark:border-white/5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? theme === "dark"
                        ? "bg-white/15 text-white font-bold shadow-xs border border-white/20"
                        : "bg-white text-brand-blue font-bold shadow-xs border border-slate-200/60"
                      : theme === "dark"
                      ? "text-slate-300 hover:text-white hover:bg-white/10"
                      : "text-slate-700 hover:text-brand-blue hover:bg-white"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive(link.to) && (
                    <span className="w-2 h-2 rounded-full bg-brand-teal" />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Auth */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/10">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center px-3 py-2 bg-slate-50 dark:bg-[#252525] rounded-lg">
                    <User className="w-4 h-4 text-slate-400 mr-2" />
                    <span className="text-xs text-slate-600 dark:text-slate-300 truncate">
                      Signed in as <strong className="text-slate-800 dark:text-white">{user.name}</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center px-4 py-2.5 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 rounded-xl font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button className="w-full px-4 py-2.5 bg-tripgo-gradient text-white rounded-xl text-sm font-semibold shadow-md">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Spacer only for non-home pages so content is not hidden under fixed navbar */}
      {!isHome && <div className="h-16 sm:h-20" />}
    </>
  );
};

export default Navbar;
