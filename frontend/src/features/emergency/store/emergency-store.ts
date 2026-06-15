"use client";

import { create } from "zustand";

// =========================
// TYPES
// =========================

type EmergencyData = {

  emergency?: boolean;

  priority?: string;

  matchedSymptoms?: string[];

  matchedKeywords?: string[];

  action?: string;

};

type EmergencyStore = {

  emergency: boolean;

  priority: string;

  matchedSymptoms: string[];

  matchedKeywords: string[];

  action: string;

  setEmergencyData: (
    data: EmergencyData
  ) => void;

  clearEmergency: () => void;

};

// =========================
// STORE
// =========================

export const useEmergencyStore =

  create<EmergencyStore>(
    (set) => ({

      emergency: false,

      priority: "normal",

      matchedSymptoms: [],

      matchedKeywords: [],

      action: "",

      setEmergencyData:
        (data) =>

          set({

            emergency:
              data.emergency || false,

            priority:
              data.priority || "normal",

            matchedSymptoms:
              data.matchedSymptoms || [],

            matchedKeywords:
              data.matchedKeywords || [],

            action:
              data.action || ""

          }),

      clearEmergency: () =>

        set({

          emergency: false,

          priority: "normal",

          matchedSymptoms: [],

          matchedKeywords: [],

          action: ""

        })

    })
  );