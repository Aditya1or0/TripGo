import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Ravine from "../components/Ravine";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  Sun,
  Moon,
} from "lucide-react";

const LoginPage = () => {
  const { backendUrl, setToken, setUser, theme, toggleTheme } = useContext(AppContext);
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(() => location.pathname !== "/signup");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Prevent any scrolling on the window while on login/signup page
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Update tab if path changes between /login and /signup
  useEffect(() => {
    if (location.pathname === "/signup") {
      setIsLogin(false);
    } else if (location.pathname === "/login") {
      setIsLogin(true);
    }
  }, [location.pathname]);

  const currentLogo = theme === "dark" ? assets.logo : assets.logodark;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password || (!isLogin && !name)) {
        toast.error("Please fill in all required fields!");
        return;
      }

      setLoading(true);
      let response;

      if (isLogin) {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
      }

      if (response.data.success) {
        const { token, user } = response.data;
        setToken(token);
        setUser(user);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success(
          isLogin ? "Welcome back to TripGo!" : "Account created successfully!"
        );

        navigate("/");
      } else {
        toast.error(response.data.message || "Authentication failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen max-h-screen w-full overflow-hidden select-none bg-[#000000] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* 1. Whole Page Background: React Bits Ravine (Ray-Marched Canyon Shader Flight) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Ravine
          speed={0.8}
          steps={128}
          stepScale={0.5}
          scale={0.25}
          height={1.0}
          spread={34}
          wallCurve={2.5}
          fade={35}
          cameraHeight={6.0}
          tilt={0.05}
          roll={0.075}
          fov={1.0}
          nearColor="#000000"
          farColor="#ffffff"
          brightness={0.85}
          contrast={1.0}
          grain={0.005}
          className="w-full h-full"
        />
      </div>

      {/* Subtle Dark Vignette Overlay for Crisp Contrast */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-radial from-black/20 via-black/40 to-black/80" />

      {/* 2. Top Header Controls: Back to Home & Theme Switcher */}
      <header className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 hover:bg-black/65 backdrop-blur-xl border border-white/15 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold transition-all group shadow-lg shadow-black/40"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan-400" />
          <span>Back to Home</span>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle theme"
          className="p-2.5 rounded-xl bg-black/40 hover:bg-black/65 backdrop-blur-xl border border-white/15 text-amber-400 hover:text-amber-300 transition-all flex items-center justify-center shadow-lg shadow-black/40"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
          ) : (
            <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
          )}
        </button>
      </header>

      {/* 3. Middle: Perfectly Centered Glassmorphic Auth Card */}
      <main className="relative z-10 w-full max-w-md mx-auto my-auto py-2">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full bg-[#111111]/85 dark:bg-[#0c0c0c]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/90 border border-white/15"
        >
          {/* Brand Logo & Heading */}
          <div className="text-center mb-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center transition-transform hover:scale-105 duration-200"
            >
              <img
                src={assets.logo}
                alt="TripGo"
                className="h-9 sm:h-10 w-auto object-contain drop-shadow"
              />
            </Link>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-2.5">
              {isLogin ? "Welcome Back" : "Begin Your Journey"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isLogin
                ? "Sign in to manage your bookings and explore tours"
                : "Create an account to unlock exclusive travel packages"}
            </p>
          </div>

          {/* Segmented Tab Switcher: Sign In / Sign Up */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-white/10 border border-white/10 mb-4">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
                isLogin
                  ? "bg-white/20 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
                !isLogin
                  ? "bg-white/20 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-3">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1"
                >
                  <label
                    htmlFor="name"
                    className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider"
                  >
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                      placeholder="e.g. Alex Morgan"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Address */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider"
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider"
                >
                  Password
                </label>
                {isLogin && (
                  <span className="text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer font-medium transition-colors">
                    Forgot?
                  </span>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="p-1.5 text-slate-400 hover:text-white absolute right-2.5 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-1 bg-tripgo-gradient text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-blue/30 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>
                {loading
                  ? "Processing..."
                  : isLogin
                  ? "Sign In to TripGo"
                  : "Create Account"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Bottom Switch Link */}
          <div className="mt-4 pt-3 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">
              {isLogin ? "New to TripGo?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors cursor-pointer"
              >
                {isLogin ? "Create an account" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Security Badge */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-bit encrypted & secure travel platform</span>
          </div>
        </motion.div>
      </main>

      {/* 4. Bottom Footer Note */}
      <footer className="relative z-10 w-full text-center text-[11px] text-slate-500 py-1">
        &copy; {new Date().getFullYear()} TripGo. All Rights Reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
