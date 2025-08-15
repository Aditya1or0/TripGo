import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import useBooking from "../hooks/useCreateBooking";

const Booking = () => {
  const location = useLocation();
  const tour = location.state?.tour;

  // Early block render if data missing
  if (!tour) return null;

  const { title = "" } = tour;

  const { formData, totalPrice, isSubmitting, handleChange, handleSubmit } =
    useBooking(tour);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const formFieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const priceCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Book Your Adventure
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Complete your booking for{" "}
            <span className="font-semibold text-blue-600">{title}</span>
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <motion.div
            className="lg:col-span-2"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                Traveler Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={formFieldVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400"
                    placeholder="Enter your full name"
                    required
                  />
                </motion.div>

                <motion.div variants={formFieldVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400"
                    placeholder="your.email@example.com"
                    required
                  />
                </motion.div>

                <motion.div variants={formFieldVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400"
                    placeholder="+91 98765 43210"
                    required
                  />
                </motion.div>

                <motion.div variants={formFieldVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="travelers"
                      min="1"
                      max="20"
                      value={formData.travelers || 1}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                    <div className="absolute right-4 top-4 text-gray-400 pointer-events-none">
                      👥
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={formFieldVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Requests
                    <span className="text-gray-500 font-normal ml-1">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests || ""}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400 resize-none"
                    placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 transform ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Price Summary Sidebar */}
          <motion.div
            className="lg:col-span-1"
            variants={priceCardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="sticky top-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">₹</span>
                  </div>
                  Booking Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Tour</span>
                    <span className="font-semibold text-gray-800 text-right text-sm">
                      {title}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Price per person</span>
                    <span className="font-semibold text-gray-800">
                      ₹{tour.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Travelers</span>
                    <span className="font-semibold text-gray-800">
                      {formData.travelers}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg px-4 border-2 border-blue-200">
                    <span className="text-lg font-bold text-gray-800">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Booking;
