
const express =
require("express");

const router =
express.Router();

const appointmentController =
require(
  "../controllers/appointmentController"
);

const authMiddleware =
require(
  "../../middleware/authMiddleware"
);

// =========================
// CREATE APPOINTMENT
// =========================

router.post(

  "/",

  authMiddleware,

  appointmentController.bookAppointment

);

// =========================
// GET APPOINTMENTS
// =========================

router.get(

  "/",

  authMiddleware,

  appointmentController.getAppointments

);

module.exports =
router;
