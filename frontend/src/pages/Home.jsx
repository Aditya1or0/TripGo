import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Services from "../components/Services";
import AllTours from "../components/AllTours";
import Experience from "../components/Experience";
import NewsLetterBox from "../components/NewsLetterBox";

const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 space-y-12 sm:space-y-20 py-8">
        <SearchBar />
        <Services />
        <AllTours />
        <Experience />
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default Home;
