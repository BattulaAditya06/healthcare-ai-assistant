"use client";



import Link from "next/link";

import {

  CalendarDays,

  Clock3,

  CheckCircle2,

  Activity,

  ArrowRight,

  Stethoscope

} from "lucide-react";

import {

  motion

} from "framer-motion";

import {

  useAppointmentStore

} from "@/features/appointments/store/appointment-store";

export default function AppointmentsPage() {

 const appointments =
  useAppointmentStore(
    (state) =>
      state.appointments
  );
  const totalAppointments =
    appointments.length;

  const upcomingAppointments =
    appointments.filter(

      (appointment) =>

        appointment.status ===
        "upcoming"

    ).length;

  const completedAppointments =
    appointments.filter(

      (appointment) =>

        appointment.status ===
        "completed"

    ).length;

  const pendingAppointments =
    appointments.filter(

      (appointment) =>

        appointment.status ===
        "pending"

    ).length;

  return (

    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50
        via-white
        to-slate-100
        p-8
      "
    >

      <motion.div

        initial={{
          opacity: 0,
          y: 20
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        className="
          mb-10
          flex
          flex-col
          justify-between
          gap-6
          lg:flex-row
          lg:items-center
        "
      >

        <div>

          <h1
            className="
              text-5xl
              font-black
            "
          >

            Appointments

          </h1>

        </div>

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            bg-white
            px-5
            py-4
            shadow-sm
          "
        >

          <div
            className="
              rounded-xl
              bg-black
              p-3
              text-white
            "
          >

            <Activity
              className="
                h-5
                w-5
              "
            />

          </div>

          <div>

            <p
              className="
                text-sm
                text-slate-500
              "
            >

              Total Appointments

            </p>

            <h3
              className="
                text-3xl
                font-bold
              "
            >

              {totalAppointments}

            </h3>

          </div>

        </div>

      </motion.div>

      <div
        className="
          grid
          gap-5
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {[
          {
            label: "Upcoming",
            value: upcomingAppointments,
            icon: Clock3
          },

          {
            label: "Completed",
            value: completedAppointments,
            icon: CheckCircle2
          },

          {
            label: "Pending",
            value: pendingAppointments,
            icon: CalendarDays
          },

          {
            label: "AI Assisted",
            value: totalAppointments,
            icon: Stethoscope
          }

        ].map(

          (item) => (

            <motion.div

              key={item.label}

              whileHover={{
                y: -4
              }}

              className="
                rounded-3xl
                border
                bg-white
                p-6
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

                <div>

                  <p
                    className="
                      text-sm
                      text-slate-500
                    "
                  >

                    {item.label}

                  </p>

                  <h2
                    className="
                      mt-2
                      text-4xl
                      font-black
                    "
                  >

                    {item.value}

                  </h2>

                </div>

                <div
                  className="
                    rounded-2xl
                    bg-slate-100
                    p-4
                  "
                >

                  <item.icon
                    className="
                      h-6
                      w-6
                      text-slate-700
                    "
                  />

                </div>

              </div>

            </motion.div>

          )

        )}

      </div>

      {

        appointments.length === 0 ? (

          <motion.div

            initial={{
              opacity: 0,
              y: 30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            className="
              mt-10
            "
          >

            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                rounded-[32px]
                border
                border-dashed
                bg-white
                px-8
                py-28
                text-center
              "
            >

              <h2
                className="
                  text-4xl
                  font-black
                "
              >

                No Appointments Yet

              </h2>

              <Link href="/chat">

                <button
                  className="
                    mt-8
                    rounded-2xl
                    bg-black
                    px-8
                    py-4
                    text-white
                  "
                >

                  Start AI Diagnosis

                </button>

              </Link>

            </div>

          </motion.div>

        ) : (

          <div
            className="
              mt-10
              grid
              gap-6
            "
          >

            {appointments.map(

              (appointment) => (

                <motion.div

                  key={appointment.id}

                  initial={{
                    opacity: 0,
                    y: 20
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  className="
                    rounded-3xl
                    border
                    bg-white
                    p-6
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

                    <div>

                      <h2
                        className="
                          text-2xl
                          font-bold
                        "
                      >

                        {appointment.doctorName}

                      </h2>

                      <p
                        className="
                          mt-1
                          text-slate-500
                        "
                      >

                        {appointment.department}

                      </p>

                    </div>

                    <div
                      className="
                        rounded-xl
                        bg-green-100
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-green-700
                      "
                    >

                      {appointment.status}

                    </div>

                  </div>

                  <div
                    className="
                      mt-6
                      flex
                      gap-8
                      text-sm
                      text-slate-600
                    "
                  >

                    <div>

                      Date:
                      {" "}
                      {appointment.date}

                    </div>

                    <div>

                      Time:
                      {" "}
                      {appointment.time}

                    </div>

                  </div>

                </motion.div>

              )

            )}

          </div>

        )

      }

    </main>

  );

}