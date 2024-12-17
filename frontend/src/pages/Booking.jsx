import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tour = location.state?.tour;

  if (!tour) {
    return <div>No tour selected. Please go back.</div>;
  }

  const { title, price } = tour;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 1,
    specialRequests: "",
  });
  const [totalPrice, setTotalPrice] = useState(price);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            tourId: tour.id, // Use tour.id instead of tour._id
            tourTitle: tour.title,
            totalPrice,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create booking");
      }

      const data = await response.json();

      toast.success("Booking successful!");
      navigate("/invoice", { state: { booking: data.booking } });
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Error: " + error.message);
    }
  };

  useEffect(() => {
    console.log("Tour object:", tour); // Added console.log statement
    setTotalPrice(price * parseInt(formData.travelers, 10));
  }, [formData.travelers, price, tour]); // Added tour to dependencies

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/20 rounded-lg bg-inherit shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Book Your Tour: {title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-inherit"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-inherit"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-inherit"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold">
            Number of Travelers
          </label>
          <input
            type="number"
            name="travelers"
            min="1"
            value={formData.travelers}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-inherit"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold">
            Special Requests (Optional)
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-inherit"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Total Price: ₹{totalPrice}</h3>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-b from-sky-500 to-blue-500 text-white hover:from-sky-800 hover:to-blue-700  p-3 rounded-lg bg-inherit"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
