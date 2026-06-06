
const API_URL =
"http://localhost:5000/api/appointments";

// =========================
// CREATE APPOINTMENT
// =========================

export const createAppointment =
async (

  token: string,

  payload: {

    doctorName: string;

    department: string;

    appointmentDate: string;

    timeSlot: string;

  }

) => {

  const response =
    await fetch(

      API_URL,

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`

        },

        body: JSON.stringify(
          payload
        )

      }

    );

  return response.json();

};

// =========================
// GET APPOINTMENTS
// =========================

export const getAppointments =
async (
  token: string
) => {

  const response =
    await fetch(

      API_URL,

      {

        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );

  return response.json();

};