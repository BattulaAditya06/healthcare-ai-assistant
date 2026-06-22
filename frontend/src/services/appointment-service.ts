const API_URL =
  "http://localhost:5000/api/appointments";

// =========================
// GET EMERGENCY DOCTORS
// =========================

export const getEmergencyDoctors =
async () => {

  const response =
    await fetch(
      `${API_URL}/emergency-doctors`
    );

  return response.json();

};

// =========================
// GET AVAILABLE SLOTS
// =========================

export const getAvailableSlots =
async (
  doctorId: number
) => {

  const response =
    await fetch(

      `${API_URL}/slots?doctorId=${doctorId}`

    );

  return response.json();

};

// =========================
// BOOK APPOINTMENT
// =========================

export const bookAppointment =
async (
  payload: {
    doctorId: number;
    patientName: string;
    appointmentDate: string;
    appointmentTime: string;
    symptoms?: string[];
    severity?: string;
  }
) => {

  const response =
    await fetch(

      `${API_URL}/book`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(
          payload
        )
      }

    );

  return response.json();

};