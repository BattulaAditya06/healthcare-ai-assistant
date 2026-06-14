"use client";

import {

  useEffect,

  useState

} from "react";
import {

  useAppointmentStore

} from "@/features/appointments/store/appointment-store";

import type { Doctor }
from "@/shared/types/doctor";

type Appointment = {

  appointmentId: string;

  doctorName: string;

  appointmentTime: string;

};

type Props = {

  open: boolean;

  onClose: () => void;

  doctor: Doctor | null;

};

// =========================
// COMPONENT
// =========================

export default function AppointmentModal({


  
  open,

  onClose,

  doctor

}: Props) {

  const slots =
  doctor?.availableSlots || [];

  const {

    addAppointment

  } = useAppointmentStore();

  


  
  const [

    selectedSlot,

    setSelectedSlot

  ] = useState("");

  const [

    patientName,

    setPatientName

  ] = useState("");

  const [

    loading,

    setLoading

  ] = useState(false);

  const [

    success,

    setSuccess

  ] = useState(false);

  const [

    appointment,

    setAppointment

  ] = useState<Appointment | null>(
    null
  );


  // =====================
  // BOOK APPOINTMENT
  // =====================

 const handleBooking = async () => {

  if (
    !patientName ||
    !selectedSlot ||
    !doctor
  ) {

    alert(
      "Please fill all fields"
    );

    return;

  }

  try {

    setLoading(true);

    const response =
      await fetch(

       `${process.env.NEXT_PUBLIC_API_URL}/appointments/book`,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            doctorId:
              doctor.id,

            patientName,

            appointmentDate:
              new Date()
                .toISOString()
                .split("T")[0],

            appointmentTime:
              selectedSlot,

            symptoms: [],

            severity:
              "medium"

          })

        }

      );

    const data =
      await response.json();

    console.log(
      "BOOKING SUCCESS:",
      data
    );

    if (data.success) {

  const appointmentData = {

    id:
      data.appointment.appointmentId,

    doctorName:
      data.appointment.doctorName,

    department:
      data.appointment.department,

    date:
      data.appointment.appointmentDate,

    time:
      data.appointment.appointmentTime,

    status:
      "upcoming" as const

  };

  console.log(
    "ADDING:",
    appointmentData
  );

  addAppointment(
    appointmentData
  );

  console.log(
    "STORE AFTER ADD:",
    useAppointmentStore
      .getState()
      .appointments
  );

  setAppointment({

    appointmentId:
      data.appointment.appointmentId,

    doctorName:
      data.appointment.doctorName,

    appointmentTime:
      data.appointment.appointmentTime

  });

  setSuccess(true);

  setSelectedSlot("");

}
  } catch (error) {

    console.log(
      "BOOKING ERROR:",
      error
    );

  } finally {

    setLoading(false);

  }

};

const resetModal = () => {

  setSelectedSlot("");

  setPatientName("");

  setLoading(false);

  setSuccess(false);

  setAppointment(null);

};

  // =====================
  // CLOSE
  // =====================

  if (!open) {

    return null;

  }

  // =====================
  // SUCCESS
  // =====================

  if (

    success &&

    appointment

  ) {

    return (

      <div
  className="
    fixed
    inset-0
    z-[9999]
    flex
    items-center
    justify-center
    bg-black/40
  "
>

        <div
          className="
            w-[420px]
            rounded-2xl
            bg-white
            p-8
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-green-600
            "
          >

            Appointment Confirmed

          </h2>

          <div
            className="
              mt-5
              space-y-2
            "
          >

            <p>

              Appointment ID:
              {" "}
              {appointment.appointmentId}

            </p>

            <p>

              Doctor:
              {" "}
              {appointment.doctorName}

            </p>

            <p>

              Time:
              {" "}
              {appointment.appointmentTime}

            </p>

          </div>

          <button

            onClick={() => {

setSuccess(false);

setAppointment(null);

setSelectedSlot("");

setPatientName("");

onClose();
}}

            className="
              mt-6
              w-full
              rounded-xl
              bg-black
              py-3
              text-white
            "

          >

            Close

          </button>

        </div>

      </div>

    );

  }

  // =====================
  // MODAL
  // =====================

  return (

    <div
      className="
        fixed inset-0 overflow-y-auto
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/40
      "
    >

      <div
        className="
          w-[500px]
          rounded-2xl
          bg-white
          p-8
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-bold
              "
            >

              Book Appointment

            </h2>

            <p
              className="
                mt-1
                text-gray-500
              "
            >

              {doctor?.name}

            </p>

          </div>

          <button
            onClick={() => {

  resetModal();

  onClose();

}}
          >
            ✕
          </button>

        </div>

        <div className="mt-6">

          <label
            className="
              text-sm
              font-medium
            "
          >

            Patient Name

          </label>

          <input

            type="text"

            value={patientName}

            onChange={(e) =>
              setPatientName(
                e.target.value
              )
            }

            placeholder="Enter patient name"

            className="
              mt-2
              w-full
              rounded-xl
              border
              p-3
            "

          />

        </div>

        <div className="mt-6">

          <h3
            className="
              mb-3
              font-semibold
            "
          >

            Select Time Slot

          </h3>

          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >

            {slots.length === 0 ? (

  <p className="text-gray-500">
    No slots available
  </p>

) : (

  slots.map((slot) => (

    <button
      key={slot}
      onClick={() =>
        setSelectedSlot(slot)
      }
      className={`
        rounded-xl
        border
        py-3
        ${
          selectedSlot === slot
            ? "bg-black text-white"
            : "bg-white"
        }
      `}
    >
      {slot}
    </button>

  ))

)}

          </div>

        </div>

        <div
          className="
            mt-8
            flex
            gap-3
          "
        >

          <button

            onClick={() => {

  resetModal();

  onClose();

}}

            className="
              flex-1
              rounded-xl
              border
              py-3
            "

          >

            Cancel

          </button>

          <button

            onClick={handleBooking}

            disabled={loading}

            className="
              flex-1
              rounded-xl
              bg-black
              py-3
              text-white
            "

          >

            {

              loading

                ? "Booking..."

                : "Confirm Booking"

            }

          </button>

        </div>

      </div>

    </div>

  );

}