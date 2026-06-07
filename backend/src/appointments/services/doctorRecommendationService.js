const doctors =
require("../data/doctors.json");

// =========================
// RECOMMEND DOCTORS
// =========================

const recommendDoctors =
  (department) => {

    if (!department) {

      return [];

    }

    return doctors.filter(

      (doctor) =>

        doctor.department
          .toLowerCase()
          .trim() ===

        department
          .toLowerCase()
          .trim()

    );

  };

// =========================
// EXPORT
// =========================

module.exports =
  recommendDoctors;