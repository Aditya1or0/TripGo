import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Tour from "./pages/Tour";
import TourDetails from "./pages/TourDetails";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Booking from "./pages/Booking";
import Invoice from "./pages/Invoice";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";
import MyBooking from "./pages/MyBooking";
import { AppContext } from "./context/AppContext";

const App = () => {
  const { theme } = useContext(AppContext);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div
      className={`flex flex-col text-slate-800 dark:text-slate-100 antialiased selection:bg-brand-teal selection:text-white transition-colors duration-300 ${
        isLoginPage
          ? "h-screen max-h-screen overflow-hidden bg-[#000000]"
          : "min-h-screen bg-white dark:bg-[#111]"
      }`}
    >
      <ToastContainer
        theme={theme === "dark" ? "dark" : "light"}
        position="bottom-right"
        autoClose={1500}
      />
      {!isLoginPage && <Navbar />}
      <ScrollToTop />
      <main className={isLoginPage ? "h-full w-full overflow-hidden" : "flex-1 w-full"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/tours"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 w-full">
                <Tour />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 w-full">
                <About />
              </div>
            }
          />
          <Route
            path="/tours/:id"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 w-full">
                <TourDetails />
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route
            path="/booking"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 w-full">
                <Booking />
              </div>
            }
          />
          <Route
            path="/invoice"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 w-full">
                <Invoice />
              </div>
            }
          />
          <Route
            path="/my-booking"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 w-full">
                <MyBooking />
              </div>
            }
          />
        </Routes>
      </main>
      {!isLoginPage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 w-full">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
