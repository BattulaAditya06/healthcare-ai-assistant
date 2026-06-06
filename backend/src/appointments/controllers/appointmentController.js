
const {

  createAppointment,

  getUserAppointments

} = require(

  "../services/appointmentService"

);

// =========================
// BOOK APPOINTMENT
// =========================

const bookAppointment =
async (
  req,
  res
) => {

  try {

    const {

      doctorName,

      department,

      appointmentDate,

      timeSlot

    } = req.body;

    const appointment =
      await createAppointment({

        userId:
          req.user.id,

        doctorName,

        department,

        appointmentDate:
          new Date(
            appointmentDate
          ),

        timeSlot

      });

    return res.status(201).json({

      success: true,

      appointment

    });

  } catch (error) {

    console.log(
      "BOOK APPOINTMENT ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to create appointment"

    });

  }

};

// =========================
// GET APPOINTMENTS
// =========================

const getAppointments =
async (
  req,
  res
) => {

  try {

    const appointments =
      await getUserAppointments(

        req.user.id

      );

    return res.json({

      success: true,

      appointments

    });

  } catch (error) {

    console.log(
      "GET APPOINTMENTS ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to fetch appointments"

    });

  }

};


module.exports = {

  bookAppointment,

  getAppointments

};

