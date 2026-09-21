import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Footer = () => {
  const { theme } = useContext(AppContext);
  const currentLogo = theme === "dark" ? assets.logo : assets.logodark;

  return (
    <footer className="flex items-center justify-between gap-4 py-6 border-t border-slate-200/80 dark:border-white/10 mt-auto transition-colors">
      <Link
        to="/"
        className="flex-shrink-0 transition-transform hover:scale-105 duration-200"
      >
        <img src={currentLogo} alt="TripGo" className="h-9 sm:h-10 w-auto object-contain" />
      </Link>
      <p className="flex-1 border-l border-slate-300 dark:border-white/20 pl-4 text-sm text-slate-500 dark:text-slate-400 max-sm:hidden">
        &copy; {new Date().getFullYear()} TripGo. All Rights Reserved. | Explore Beyond Ordinary.
      </p>
      <div className="flex gap-2.5">
        <img src={assets.facebook_icon} alt="fbimg" width={35} />
        <img src={assets.twitter_icon} alt="fbimg" width={35} />
        <img src={assets.instagram_icon} alt="fbimg" width={35} />
      </div>
    </footer>
  );
};

export default Footer;
