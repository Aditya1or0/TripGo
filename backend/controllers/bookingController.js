import bookingModel from "../models/bookingModel.js";

/*
 * Create a new booking
 */
export const createBooking = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      travelers,
      specialRequests,
      tourId,
      tourTitle,
      totalPrice,
    } = req.body;

    const userId = req.userId;

    if (
      !name ||
      !email ||
      !phone ||
      !tourId ||
      !tourTitle ||
      !totalPrice ||
      !userId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newBooking = new bookingModel({
      userId,
      name,
      email,
      phone,
      travelers: parseInt(travelers, 10),
      specialRequests,
      tourId,
      tourTitle,
      totalPrice: parseFloat(totalPrice),
      status: "confirmed",
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      booking: savedBooking,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/*
 * Get and show all bookings of logged in user
 */
export const getBookings = async (req, res) => {
  try {
    const userId = req.userId;

    const bookings = await bookingModel
      .find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
