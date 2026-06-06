
const prisma =
require("../../config/prisma");

// =========================
// CREATE APPOINTMENT
// =========================

const createAppointment =
async (
  data
) => {

  return prisma.appointment.create({

    data

  });

};

// =========================
// GET USER APPOINTMENTS
// =========================

const getUserAppointments =
async (
  userId
) => {

  return prisma.appointment.findMany({

    where: {

      userId

    },

    orderBy: {

      appointmentDate:
        "asc"

    }

  });

};

module.exports = {

  createAppointment,

  getUserAppointments

};
