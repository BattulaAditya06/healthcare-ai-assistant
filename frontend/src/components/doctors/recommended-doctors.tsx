
"use client";

interface Doctor {

  id: number;

  name: string;

  department: string;

  experience: string;

}

interface Props {

  doctors: Doctor[];

}

export function RecommendedDoctors({

  doctors

}: Props) {

  if (
    !doctors ||
    doctors.length === 0
  ) {

    return null;

  }

  return (

    <div
      className="
        space-y-4
      "
    >

      <h2
        className="
          text-2xl
          font-bold
        "
      >

        Recommended Doctors

      </h2>

      {

        doctors.map(
          (doctor) => (

            <div

              key={doctor.id}

              className="
                rounded-2xl
                border
                bg-white
                p-5
                shadow-sm
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <div
                  className="
                    space-y-1
                  "
                >

                  <h3
                    className="
                      text-lg
                      font-semibold
                    "
                  >

                    {doctor.name}

                  </h3>

                  <p
                    className="
                      text-sm
                      text-muted-foreground
                    "
                  >

                    {doctor.department}

                  </p>

                  <p
                    className="
                      text-sm
                      text-muted-foreground
                    "
                  >

                    Experience:
                    {" "}
                    {doctor.experience}

                  </p>

                </div>

                <button
                  className="
                    rounded-xl
                    bg-black
                    px-5
                    py-2
                    text-sm
                    text-white
                    transition
                    hover:opacity-90
                  "
                >

                  Book Appointment

                </button>

              </div>

            </div>

          )
        )

      }

    </div>

  );

}
