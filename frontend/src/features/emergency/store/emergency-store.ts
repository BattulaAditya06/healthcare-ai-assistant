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

  department?: string;

};

type EmergencyStore = {

  emergency: boolean;

  priority: string;

  matchedSymptoms: string[];

  matchedKeywords: string[];

  action: string;

  department: string;

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

    department: "",

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
            data.action || "",

          department:
            data.department || ""

        }),

    clearEmergency: () =>

      set({

        emergency: false,

        priority: "normal",

        matchedSymptoms: [],

        matchedKeywords: [],

        action: "",

        department: ""

      })

  })
);