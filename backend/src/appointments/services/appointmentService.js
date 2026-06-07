const crypto =
require("crypto");

const appointments = [];

const generateSlots = () => {

  return [

    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM"

  ];

};

const createAppointment = (
  data
) => {

  const appointment = {

    appointmentId:
      crypto.randomUUID(),

    ...data,

    status:
      "confirmed",

    createdAt:
      new Date()

  };

  appointments.push(
    appointment
  );

  return appointment;

};

module.exports = {

  createAppointment,

  generateSlots

};