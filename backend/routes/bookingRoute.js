import express from "express";
import {
  createBooking,
  getBookings,
} from "../controllers/bookingController.js";
import { authMiddleware } from "../middlewares/auth.js";

const bookingRouter = express.Router();

bookingRouter.post("/", authMiddleware, createBooking);
bookingRouter.get("/", authMiddleware, getBookings);

export default bookingRouter;
