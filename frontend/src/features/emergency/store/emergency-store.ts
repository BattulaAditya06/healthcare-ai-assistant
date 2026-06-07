"use client";

import {
  create
} from "zustand";

// =========================
// TYPES
// =========================

type EmergencyStore = {

  isEmergency: boolean;

  severity: string;

  matchedSymptoms: string[];

  setEmergencyData: (
    data: {

      isEmergency: boolean;

      severity: string;

      matchedSymptoms: string[];

    }
  ) => void;

  clearEmergency: () => void;

};

// =========================
// STORE
// =========================

export const useEmergencyStore =

  create<EmergencyStore>(
    (set) => ({

      isEmergency: false,

      severity: "low",

      matchedSymptoms: [],

      setEmergencyData:
        (data) =>

          set({

            isEmergency:
              data.isEmergency,

            severity:
              data.severity,

            matchedSymptoms:
              data.matchedSymptoms

          }),

      clearEmergency: () =>

        set({

          isEmergency: false,

          severity: "low",

          matchedSymptoms: []

        })

    })
  );