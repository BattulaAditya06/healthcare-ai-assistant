import type { Doctor }
from "@/shared/types/doctor";

type Props = {

  doctor: Doctor;

  onBook: (
    doctor: Doctor
  ) => void;

};

export default function DoctorCard({

  doctor,

  onBook

}: Props) {

  return (

    <div
      className="
        bg-white
        border
        rounded-2xl
        p-5
        shadow-sm
      "
    >

      <div
        className="
          flex
          justify-between
          items-start
        "
      >

        <div>

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
              text-gray-500
              mt-1
            "
          >

            {doctor.department}

          </p>

        </div>

        <div
          className="
            px-3
            py-1
            rounded-full
            bg-blue-100
            text-blue-700
            text-sm
          "
        >

          ⭐ {doctor.rating}

        </div>

      </div>

      <div className="mt-4">

        <p>

          Experience:
          {" "}
          {doctor.experience}
          {" "}
          years

        </p>

        <p className="mt-1">

          {doctor.hospital}

        </p>

      </div>

      <button

        onClick={() =>
          onBook(doctor)
        }

        className="
          mt-5
          w-full
          bg-black
          text-white
          py-3
          rounded-xl
          hover:opacity-90
          transition
        "

      >

        Book Appointment

      </button>

    </div>

  );

}