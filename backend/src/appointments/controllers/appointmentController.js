const crypto =
require("crypto");

// =========================
// DOCTORS DATA
// =========================

const doctors =
require("../data/doctors.json");

// =========================
// TEMP STORAGE
// =========================

const appointments = [];

// =========================
// ALL SLOTS
// =========================

const allSlots = [

  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM"

];

// =========================
// GET AVAILABLE SLOTS
// =========================

const getAvailableSlots =
(req, res) => {

  const {
    doctorId
  } = req.query;

  // =====================
  // FIND BOOKED SLOTS
  // =====================

  const bookedSlots =

    appointments

      .filter(

        (appointment) =>

          String(
            appointment.doctorId
          ) === String(
            doctorId
          )

      )

      .map(

        (appointment) =>

          appointment
            .appointmentTime

      );

  // =====================
  // REMOVE BOOKED
  // =====================

  const availableSlots =

    allSlots.filter(

      (slot) =>

        !bookedSlots.includes(
          slot
        )

    );

  return res.json({

    success: true,

    slots:
      availableSlots

  });

};

// =========================
// BOOK APPOINTMENT
// =========================

const bookAppointment =
(req, res) => {

  const {

    doctorId,

    patientName,

    appointmentDate,

    appointmentTime,

    symptoms = [],

    severity = "medium"

  } = req.body;

  // =====================
  // FIND DOCTOR
  // =====================

  const doctor =

    doctors.find(

      (doc) =>

        String(doc.id) ===
        String(doctorId)

    );

  if (!doctor) {

    return res.status(404)
      .json({

        success: false,

        message:
          "Doctor not found"

      });

  }

  // =====================
  // SLOT ALREADY TAKEN
  // =====================

  const alreadyBooked =

    appointments.find(

      (appointment) =>

        String(
          appointment.doctorId
        ) === String(
          doctorId
        ) &&

        appointment
          .appointmentTime ===
        appointmentTime

    );

  if (alreadyBooked) {

    return res.status(400)
      .json({

        success: false,

        message:
          "Slot already booked"

      });

  }

  // =====================
  // CREATE APPOINTMENT
  // =====================

  const appointment = {

    appointmentId:
      crypto.randomUUID(),

    doctorId:
      doctor.id,

    doctorName:
      doctor.name,

    department:
      doctor.department,

    patientName,

    appointmentDate,

    appointmentTime,

    symptoms,

    severity,

    status:
      "confirmed",

    createdAt:
      new Date()

  };

  // =====================
  // SAVE
  // =====================

  appointments.push(
    appointment
  );

  // =====================
  // RESPONSE
  // =====================

  return res.json({

    success: true,

    message:
      "Appointment booked successfully",

    appointment

  });

};

// =========================
// EXPORTS
// =========================

module.exports = {

  getAvailableSlots,

  bookAppointment

};