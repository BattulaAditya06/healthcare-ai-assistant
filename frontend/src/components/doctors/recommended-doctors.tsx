"use client";

import {
  useState
} from "react";

import type {

  Doctor

} from "@/features/chatbot/types/chat";

import AppointmentModal
from "@/components/appointments/appointment-modal";

// =========================
// TYPES
// =========================

interface Props {

  doctors: Doctor[];

}

// =========================
// COMPONENT
// =========================

export function RecommendedDoctors({

  doctors

}: Props) {

  // =========================
  // LOCAL STATE
  // =========================

  const [

    selectedDoctor,

    setSelectedDoctor

  ] = useState<Doctor | null>(
    null
  );

  const [

    open,

    setOpen

  ] = useState(false);

  // =========================
  // EMPTY STATE
  // =========================

  if (

    !doctors ||

    doctors.length === 0

  ) {

    return null;

  }

  // =========================
  // UI
  // =========================

  return (

    <>

      <div
        className="
          space-y-4
        "
      >

        {/* HEADER */}

        <div>

          <h2
            className="
              text-2xl
              font-bold
            "
          >

            Recommended Doctors

          </h2>

          <p
            className="
              text-sm
              text-muted-foreground
            "
          >

            Specialists recommended based on AI analysis

          </p>

        </div>

        {/* DOCTOR LIST */}

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
                  transition
                  hover:shadow-md
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    md:flex-row
                    md:items-center
                    md:justify-between
                  "
                >

                  {/* LEFT */}

                  <div
                    className="
                      space-y-2
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

                      {doctor.hospital}

                    </p>

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-4
                        pt-1
                        text-sm
                      "
                    >

                      <span>

                        ⭐ Rating:
                        {" "}
                        {doctor.rating}

                      </span>

                      <span>

                        🩺 Experience:
                        {" "}
                        {doctor.experience}
                        {" "}
                        years

                      </span>

                    </div>

                  </div>

                  {/* RIGHT */}

                  <button

                    onClick={() => {

  setOpen(false);

  requestAnimationFrame(() => {

    setSelectedDoctor(
      doctor
    );

    setOpen(true);

  },);

}}

                    className="
                      rounded-2xl
                      bg-black
                      px-6
                      py-4
                      font-semibold
                      text-white
                      transition
                      hover:scale-[1.02]
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

      {/* MODAL */}

      {

        selectedDoctor && (

          <AppointmentModal

  key={
    selectedDoctor?.id
  }

  open={open}

  onClose={() => {

    setOpen(false);

    setSelectedDoctor(null);

  }}

  doctor={selectedDoctor}

/>

        )

      }

    </>

  );

}