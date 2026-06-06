
"use client";

import { useState }
from "react";

import {

  createAppointment

} from "@/services/appointment-service";

interface Props {

  open: boolean;

  onClose: () => void;

  department: string;

}

export function AppointmentModal({

  open,

  onClose,

  department

}: Props) {

  const [

    doctorName,

    setDoctorName

  ] = useState("");

  const [

    appointmentDate,

    setAppointmentDate

  ] = useState("");

  const [

    timeSlot,

    setTimeSlot

  ] = useState("");

  const [

    loading,

    setLoading

  ] = useState(false);

  if (!open) {

    return null;

  }

  const handleBook =
    async () => {

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          return;

        }

        await createAppointment(

          token,

          {

            doctorName,

            department,

            appointmentDate,

            timeSlot

          }

        );

        onClose();

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-background
          p-6
          shadow-2xl
        "
      >

        <h2
          className="
            mb-6
            text-2xl
            font-bold
          "
        >

          Book Appointment

        </h2>

        <div
          className="
            space-y-4
          "
        >

          <input
            type="text"
            placeholder="Doctor Name"
            value={doctorName}
            onChange={(e) =>
              setDoctorName(
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              p-3
            "
          />

          <input
            type="date"
            value={appointmentDate}
            onChange={(e) =>
              setAppointmentDate(
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              p-3
            "
          />

          <input
            type="text"
            placeholder="Time Slot"
            value={timeSlot}
            onChange={(e) =>
              setTimeSlot(
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              p-3
            "
          />

          <button
            onClick={
              handleBook
            }
            disabled={loading}
            className="
              w-full
              rounded-lg
              bg-black
              p-3
              text-white
            "
          >

            {

              loading

                ? "Booking..."

                : "Confirm Appointment"

            }

          </button>

        </div>

      </div>

    </div>

  );

}
