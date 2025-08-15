import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { AppContext } from "../context/AppContext";
import logo from "../assets/logo.png";

// Mock assets
const assets = {
  user: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%234F46E5'/%3E%3Cpath d='M20 22c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm0 2c-4.418 0-14 2.209-14 7v3h28v-3c0-4.791-9.582-7-14-7z' fill='white'/%3E%3C/svg%3E",
};

const Navbar = () => {
  const { user, logout } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent click from bubbling to document
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
      // Check if the click is outside the mobile menu container and menu button
      if (
        menuOpen &&
        !event.target.closest(".mobile-menu-container") &&
        !event.target.closest(".menu-button")
      ) {
        setMenuOpen(false);
      }
    };

    // Add a slight delay to ensure initial click doesn't trigger immediate close
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
    ...(user ? [{ to: "/my-booking", label: "My Bookings" }] : []),
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Navbar */}
      <nav
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0 transition-transform hover:scale-105 duration-200"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mr-2">
                  <img src={logo} alt="Logo" />
                </div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  TripGo
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop User Section */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* User Profile */}
                  <div className="relative group">
                    <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <img
                        src={assets.user}
                        alt="Profile"
                        className="w-8 h-8 rounded-full ring-2 ring-blue-100"
                      />
                      <span className="text-sm font-medium text-gray-700 hidden lg:block">
                        {user.name}
                      </span>
                    </div>

                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-2">
                        <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                          Signed in as <strong>{user.name}</strong>
                        </div>
                        <button
                          onClick={logout}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <button className="px-6 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-sky-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200">
                    Login
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3 mobile-menu-container">
              {user && (
                <img
                  src={assets.user}
                  alt="Profile"
                  className="w-8 h-8 rounded-full ring-2 ring-blue-100"
                />
              )}
              <button
                onClick={toggleMenu}
                className="menu-button p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm">
          <div className="fixed top-16 sm:top-20 left-0 right-0 bg-white shadow-xl border-t border-gray-100 mobile-menu-container">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive(link.to)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile User Section */}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center px-4 py-2">
                      <User className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-600">
                        Signed in as <strong>{user.name}</strong>
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Sign out
                    </button>
                  </div>
                ) : (
                  <Link to="/login">
                    <button
                      onClick={() => setMenuOpen(false)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-200"
                    >
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16 sm:h-20" />
    </>
  );
};

export default Navbar;
