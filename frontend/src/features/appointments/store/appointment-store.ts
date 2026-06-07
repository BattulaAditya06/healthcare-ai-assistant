"use client";

import {
  create
} from "zustand";

import {
  persist
} from "zustand/middleware";

// =========================
// TYPES
// =========================

export type Appointment = {

  id: string;

  doctorName: string;

  department: string;

  date: string;

  time: string;

  status:
    | "upcoming"
    | "completed"
    | "pending";

};

// =========================
// STORE TYPE
// =========================

type AppointmentStore = {

  appointments:
    Appointment[];

  addAppointment: (
    appointment: Appointment
  ) => void;

};

// =========================
// STORE
// =========================

export const useAppointmentStore =
  create<AppointmentStore>()(

    persist(

      (set) => ({

        appointments: [],

        addAppointment: (
          appointment
        ) => {

          console.log(
            "ADDING APPOINTMENT:",
            appointment
          );

          set((state) => ({

            appointments: [

              ...state.appointments,

              appointment

            ]

          }));

        }

      }),

      {

        name:
          "appointment-storage"

      }

    )

  );