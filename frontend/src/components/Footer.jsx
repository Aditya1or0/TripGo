import React from "react";
import { assets } from "../assets/assets";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between gap-4 py-3 mt-auto">
      <Link
        to="/"
        className="flex-shrink-0 transition-transform hover:scale-105 duration-200"
      >
        <div className="flex items-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10  rounded-lg flex items-center justify-center mr-2">
            {/* <span className="text-white font-bold text-lg">T</span> */}
            <img src={logo} alt="Logo" />
          </div>
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            TripGo
          </span>
        </div>
      </Link>
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        &copy; 2024 TripGo. All Rights Reserved. | Powered by Innovation.
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
