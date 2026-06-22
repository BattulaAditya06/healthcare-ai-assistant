"use client";

import type {
  Doctor
} from "@/shared/types/doctor";

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

type AppointmentStore = {

  appointments:
    Appointment[];

  selectedDoctor:
    Doctor | null;

  addAppointment: (
    appointment: Appointment
  ) => void;

  setSelectedDoctor: (
    doctor: Doctor
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

        selectedDoctor:
          null,

        addAppointment: (
          appointment
        ) =>

          set((state) => ({

            appointments: [

              ...state.appointments,

              appointment

            ]

          })),

        setSelectedDoctor: (
          doctor
        ) =>

          set({

            selectedDoctor:
              doctor

          })

      }),

      {

        name:
          "appointment-storage"

      }

    )

  );