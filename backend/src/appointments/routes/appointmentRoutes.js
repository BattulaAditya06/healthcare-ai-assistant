
const express = require("express");
const router = express.Router();

const {
  getAvailableSlots,
  bookAppointment,
  getEmergencyDoctors
} = require("../controllers/appointmentController");

const protect = require("../../middleware/authMiddleware");

// Public doctor directory.
router.get("/emergency-doctors", getEmergencyDoctors);

// Authenticated slot availability.
router.get("/slots", protect, getAvailableSlots);

// Authenticated appointment booking.
router.post("/book", protect, bookAppointment);

module.exports = router;
