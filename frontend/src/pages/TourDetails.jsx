import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, DollarSign, MapPin, Users, Star } from "lucide-react";
import tourData from "../assets/data/tour.js";
import { AppContext } from "../context/AppContext";

const TourDetails = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const tour = tourData.find((tour) => tour.id === id);

  if (!tour) return <div className="text-center py-12">Tour not found</div>;

  const {
    photo,
    title,
    desc,
    price,
    reviews,
    city,
    distance,
    maxGroupSize,
    availableDates,
    avgRating,
  } = tour;

  const [selectedDate, setSelectedDate] = useState(availableDates[0]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, i) => (
      <Star
        key={i}
        size={18}
        className={`${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Hero Image */}
        <div className="relative h-96 md:h-[500px] overflow-hidden rounded-3xl shadow-lg">
          <img
            src={photo}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{title}</h1>
            <div className="flex items-center space-x-4 text-sm md:text-lg">
              <div className="flex items-center space-x-1">
                <MapPin size={18} />
                <span>{city}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={18} />
                <span>{availableDates.length} Dates</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users size={18} />
                <span>Max {maxGroupSize}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tour Info */}
          <div className="space-y-6">
            <div className="text-xl text-gray-800 leading-relaxed">{desc}</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Price */}
              <div className="bg-white/80 p-5 rounded-xl shadow border">
                <div className="flex items-center space-x-2 text-gray-700 mb-2">
                  <DollarSign size={20} />
                  <span className="font-semibold">Price</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{price.toLocaleString()}
                </p>
              </div>

              {/* Distance */}
              <div className="bg-white/80 p-5 rounded-xl shadow border">
                <div className="flex items-center space-x-2 text-gray-700 mb-2">
                  <MapPin size={20} />
                  <span className="font-semibold">Distance</span>
                </div>
                <p className="text-xl">{distance} km away</p>
              </div>
            </div>

            {/* Date Selector */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                <Calendar className="inline mr-2 text-blue-600" size={18} />
                Choose Date
              </label>
              <select
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full p-3 rounded-xl border bg-white/70 shadow text-gray-700 focus:ring-2 focus:ring-blue-400 transition"
              >
                {availableDates.map((date, idx) => (
                  <option key={idx} value={date}>
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* Booking Button */}
            <button
              onClick={() => {
                scrollTo(0, 0);
                if (!user) {
                  navigate("/login");
                } else {
                  navigate("/booking", { state: { tour } });
                }
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              🎉 Book This Tour
            </button>
          </div>

          {/* Reviews */}
          <div className="bg-white/90 rounded-xl p-6 shadow space-y-6 border">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Customer Reviews
              </h3>
              <div className="flex items-center space-x-2">
                <div className="flex">{renderStars(Math.round(avgRating))}</div>
                <span className="text-gray-600">{avgRating} stars</span>
              </div>
              <p className="text-gray-600 mt-1">{reviews.length} reviews</p>
            </div>

            <div className="space-y-4">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-50 rounded-lg border shadow-sm"
                >
                  <div className="font-semibold text-gray-800 mb-1">
                    {review.name}
                  </div>
                  <div className="flex mb-2">
                    {renderStars(Math.round(review.rating))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
