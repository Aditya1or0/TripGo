import React from "react";
import ServiceCard from "./ServiceCard";
import { Hotel, Plane, Compass } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    desc: "Book flights to your desired destination with ease. Our platform offers competitive prices and convenient booking options.",
  },
  {
    icon: Hotel,
    title: "Hotel Booking",
    desc: "Find and book the best hotels at your destination. From budget stays to luxury accommodations, we have something for every traveler.",
  },
  {
    icon: Compass,
    title: "Adventure Tours",
    desc: "Embark on thrilling adventure tours to some of the most exciting and unexplored destinations. Perfect for adrenaline junkies and nature lovers.",
  },
];

const ServiceList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
      {services.map((item, index) => (
        <ServiceCard item={item} key={index} index={index} />
      ))}
    </div>
  );
};

export default ServiceList;
