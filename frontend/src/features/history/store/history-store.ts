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

export type DiagnosisHistory = {

  id: string;

  disease: string;

  symptoms: string[];

  confidence: number;

  riskLevel: string;

  date: string;

};

// =========================
// STORE TYPE
// =========================

type HistoryStore = {

  history:
    DiagnosisHistory[];

  addHistory: (
    diagnosis: DiagnosisHistory
  ) => void;

};

// =========================
// STORE
// =========================

export const useHistoryStore =
  create<HistoryStore>()(

    persist(

      (set) => ({

        history: [],

        addHistory: (
          diagnosis
        ) => {

          set((state) => ({

            history: [

              diagnosis,

              ...state.history

            ]

          }));

        }

      }),

      {

        name:
          "history-storage"

      }

    )

  );