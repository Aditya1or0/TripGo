import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      className="mt-20 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left py-20 px-6 relative overflow-hidden max-w-7xl mx-auto"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-blue-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-blue-500/30 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Left Section - Text Content */}
      <motion.div
        className="relative z-10 flex-1 lg:pr-12 mb-12 lg:mb-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
        >
          Welcome to{" "}
          <motion.span
            className="text-blue-500 relative inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            TripGo
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500/30 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            />
          </motion.span>
        </motion.h1>

        <motion.div
          className="space-y-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-700">
            Your ultimate travel companion!
          </p>

          <motion.p
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Discover exciting destinations, exclusive deals, and seamless
            booking experience.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Right Section - Image */}
      <motion.div
        className="relative z-10 flex-1 flex justify-center lg:justify-end"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          className="relative group max-w-md w-full"
          whileHover={{
            scale: 1.02,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          {/* Glow effect behind image */}
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/20 rounded-2xl blur-xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.img
            src={assets.headerimg}
            alt="earth"
            className="relative w-full h-auto object-contain rounded-xl shadow-2xl"
            whileHover={{
              rotate: [0, -2, 2, 0],
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          />

          {/* Floating elements around image */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-500/30"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500/15 rounded-full flex items-center justify-center backdrop-blur-sm"
            animate={{
              x: [0, 8, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <div className="w-3 h-3 bg-blue-500/70 rounded-full"></div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom decorative wave */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24 opacity-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
            className="text-blue-500/10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2, duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Header;
