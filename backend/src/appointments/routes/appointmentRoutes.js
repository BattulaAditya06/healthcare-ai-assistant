const express =
require("express");

const router =
  express.Router();

const {

  getAvailableSlots,

  bookAppointment,

  getEmergencyDoctors

} = require(
  "../controllers/appointmentController"
);

// =========================
// GET AVAILABLE SLOTS
// =========================

router.get(
  "/emergency-doctors",
  getEmergencyDoctors
);

// =========================
// BOOK APPOINTMENT
// =========================

router.post(

  "/book",

  bookAppointment

);

// =========================
// EXPORT
// =========================

module.exports =
  router;