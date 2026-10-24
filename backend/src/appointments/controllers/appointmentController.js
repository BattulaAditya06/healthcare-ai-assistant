const doctors = require("../data/doctors.json");
const prisma = require("../../config/prisma");

const allSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM"
];

function parseAppointmentDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    return null;
  }
  return date;
}

function nextUtcDay(date) {
  return new Date(date.getTime() + 24 * 60 * 60 * 1000);
}

// GET /api/appointments/slots?doctorId=1&appointmentDate=YYYY-MM-DD
const getAvailableSlots = async (req, res) => {
  try {
    const doctor = doctors.find((item) => String(item.id) === String(req.query.doctorId));
    const appointmentDate = parseAppointmentDate(req.query.appointmentDate);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    if (!appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "appointmentDate is required in YYYY-MM-DD format"
      });
    }

    const bookedAppointments = await prisma.appointment.findMany({
      where: {
        doctorName: doctor.name,
        appointmentDate: { gte: appointmentDate, lt: nextUtcDay(appointmentDate) },
        status: { not: "cancelled" }
      },
      select: { timeSlot: true }
    });

    const offeredSlots = Array.isArray(doctor.availableSlots) && doctor.availableSlots.length
      ? doctor.availableSlots
      : allSlots;
    const bookedSlots = new Set(bookedAppointments.map((item) => item.timeSlot));

    return res.json({
      success: true,
      doctorId: doctor.id,
      appointmentDate: req.query.appointmentDate,
      slots: offeredSlots.filter((slot) => !bookedSlots.has(slot))
    });
  } catch (error) {
    console.error("GET APPOINTMENT SLOTS ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to load appointment slots" });
  }
};

// POST /api/appointments/book
// Request body: { doctorId, appointmentDate, appointmentTime, symptoms?, severity? }
const bookAppointment = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { doctorId, appointmentDate: dateString, appointmentTime } = req.body || {};
    const doctor = doctors.find((item) => String(item.id) === String(doctorId));
    const appointmentDate = parseAppointmentDate(dateString);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    if (!appointmentDate || typeof appointmentTime !== "string" || !appointmentTime.trim()) {
      return res.status(400).json({
        success: false,
        message: "doctorId, appointmentDate (YYYY-MM-DD), and appointmentTime are required"
      });
    }

    const offeredSlots = Array.isArray(doctor.availableSlots) && doctor.availableSlots.length
      ? doctor.availableSlots
      : allSlots;
    if (!offeredSlots.includes(appointmentTime)) {
      return res.status(400).json({ success: false, message: "Invalid appointment time for this doctor" });
    }

    const existing = await prisma.appointment.findFirst({
      where: {
        doctorName: doctor.name,
        appointmentDate: { gte: appointmentDate, lt: nextUtcDay(appointmentDate) },
        timeSlot: appointmentTime,
        status: { not: "cancelled" }
      }
    });
    if (existing) {
      return res.status(409).json({ success: false, message: "Slot already booked" });
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId,
        doctorName: doctor.name,
        department: doctor.department,
        appointmentDate,
        timeSlot: appointmentTime,
        status: "confirmed"
      }
    });

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: {
        ...appointment,
        doctorId: doctor.id,
        hospital: doctor.hospital
      }
    });
  } catch (error) {
    console.error("BOOK APPOINTMENT ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to book appointment" });
  }
};

const getEmergencyDoctors = (req, res) => {
  const department = typeof req.query.department === "string"
    ? req.query.department.toLowerCase().trim()
    : "";
  const availableDoctors = doctors.filter((doctor) => doctor.availability);
  const filteredDoctors = department
    ? availableDoctors.filter((doctor) => doctor.department.toLowerCase().trim() === department)
    : availableDoctors;

  return res.json({ success: true, doctors: filteredDoctors });
};

module.exports = { getAvailableSlots, bookAppointment, getEmergencyDoctors };
