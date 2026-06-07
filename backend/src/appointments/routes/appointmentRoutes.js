const express =
require("express");

const router =
  express.Router();

const {

  getAvailableSlots,

  bookAppointment

} = require(
  "../controllers/appointmentController"
);

// =========================
// GET AVAILABLE SLOTS
// =========================

router.get(

  "/slots",

  getAvailableSlots

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