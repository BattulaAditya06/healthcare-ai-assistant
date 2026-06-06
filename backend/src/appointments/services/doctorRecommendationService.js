
const doctors = [

  {
    id: 1,
    name: "Dr. Sharma",
    department: "Pulmonology",
    experience: "12 years"
  },

  {
    id: 2,
    name: "Dr. Reddy",
    department: "Pulmonology",
    experience: "8 years"
  },

  {
    id: 3,
    name: "Dr. Kumar",
    department: "General Medicine",
    experience: "10 years"
  }

];

const recommendDoctors =
(department) => {

  console.log(
    "DEPARTMENT:",
    department
  );

  if (!department) {

    return [];

  }

  const matchedDoctors =

    doctors.filter(

      (doctor) =>

        doctor.department ===
        department

    );

  console.log(
    "MATCHED DOCTORS:",
    matchedDoctors
  );

  return matchedDoctors;

};

module.exports =
  recommendDoctors;
