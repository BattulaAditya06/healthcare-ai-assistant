
"use client";

import {

  useEffect,

  useState

} from "react";

import {

  getAppointments

} from "@/services/appointment-service";

import {

  AppointmentCard

} from "@/components/appointments/appointment-card";

interface Appointment {

  id: string;

  doctorName: string;

  department: string;

  appointmentDate: string;

  timeSlot: string;

  status: string;

}

export default function AppointmentsPage() {

  const [

    appointments,

    setAppointments

  ] = useState<
    Appointment[]
  >([]);

  const [

    loading,

    setLoading

  ] = useState(true);

  useEffect(() => {

    const fetchAppointments =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) {

            return;

          }

          const data =
            await getAppointments(
              token
            );

          setAppointments(

            data.appointments || []

          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchAppointments();

  }, []);

  return (

    <div
      className="
        min-h-screen
        bg-muted/30
        p-8
      "
    >

      {/* HEADER */}

      <div
        className="
          mb-10
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h1
            className="
              text-4xl
              font-bold
              tracking-tight
            "
          >

            Appointments

          </h1>

          <p
            className="
              mt-2
              text-muted-foreground
            "
          >

            Manage your healthcare consultations

          </p>

        </div>

        <div
          className="
            rounded-2xl
            border
            bg-background
            px-6
            py-4
            shadow-sm
          "
        >

          <p
            className="
              text-sm
              text-muted-foreground
            "
          >

            Total Appointments

          </p>

          <h2
            className="
              mt-1
              text-3xl
              font-bold
            "
          >

            {appointments.length}

          </h2>

        </div>

      </div>

      {/* CONTENT */}

      {

        loading ? (

          <div
            className="
              flex
              h-[300px]
              items-center
              justify-center
            "
          >

            Loading appointments...

          </div>

        ) : appointments.length === 0 ? (

          <div
            className="
              rounded-3xl
              border
              border-dashed
              bg-background
              p-20
              text-center
              shadow-sm
            "
          >

            <h2
              className="
                text-2xl
                font-semibold
              "
            >

              No Appointments Yet

            </h2>

            <p
              className="
                mt-3
                text-muted-foreground
              "
            >

              Book consultations directly
              from AI diagnosis results.

            </p>

          </div>

        ) : (

          <div
            className="
              grid
              gap-6
              lg:grid-cols-2
            "
          >

            {

              appointments.map(

                (
                  appointment
                ) => (

                  <AppointmentCard

                    key={
                      appointment.id
                    }

                    doctorName={
                      appointment.doctorName
                    }

                    department={
                      appointment.department
                    }

                    appointmentDate={
                      appointment.appointmentDate
                    }

                    timeSlot={
                      appointment.timeSlot
                    }

                    status={
                      appointment.status
                    }

                  />

                )

              )

            }

          </div>

        )

      }

    </div>

  );

}
