import {

  create

} from "zustand";

// =========================
// TYPES
// =========================

type Prediction = {

  disease: string;

  confidence: number;

  riskLevel: string;

  department: string;

  emergencyMatch?: boolean;

  recommendations?: string[];

  scoreBreakdown?: {

    primaryMatches: number;

    secondaryMatches: number;

    signatureMatches: number;

    emergencyMatches: number;

    coverageRatio?: number;

    reliability?: number;

  };

};

import type {
  Doctor
} from "@/shared/types/doctor";

type AnalysisResult = {

  enteredSymptoms: string[];

  possibleDiseases: Prediction[];

  recommendedDoctors: Doctor[];

  emergency?: {

    isEmergency: boolean;

  };

};

type DiagnosticStore = {

  // =====================
  // STATE
  // =====================

  symptoms: string[];

  predictions: Prediction[];

  recommendedDoctors: Doctor[];

  reasoning: string[];

  analysisSteps: string[];

  riskLevel: string;

  department: string;

  emergency: boolean;

  loading: boolean;

  isAnalyzing: boolean;

  // =====================
  // ACTIONS
  // =====================

  setLoading: (
    loading: boolean
  ) => void;

  setIsAnalyzing: (
    value: boolean
  ) => void;

  setAnalysisSteps: (
    steps: string[]
  ) => void;

  setSymptoms: (
    symptoms: string[]
  ) => void;

  addSymptom: (
    symptom: string
  ) => void;

  removeSymptom: (
    symptom: string
  ) => void;

  clearSymptoms: () => void;

  setPredictions: (
    predictions: Prediction[]
  ) => void;

  setRiskLevel: (
    level: string
  ) => void;

  setDepartment: (
    department: string
  ) => void;

  setEmergency: (
    emergency: boolean
  ) => void;

  addReasoning: (
    text: string
  ) => void;

  clearReasoning: () => void;

  clearAnalysis: () => void;

  setAnalysisResult: (
    data: AnalysisResult
  ) => void;

};

// =========================
// STORE
// =========================

export const useDiagnosticStore =

  create<DiagnosticStore>(
    (set) => ({

      // =====================
      // INITIAL STATE
      // =====================

      symptoms: [],

      predictions: [],

      recommendedDoctors: [],

      reasoning: [],

      analysisSteps: [],

      riskLevel: "Low",

      department:
        "General Medicine",

      emergency: false,

      loading: false,

      isAnalyzing: false,

      // =====================
      // BASIC SETTERS
      // =====================

      setLoading: (
        loading
      ) =>

        set({
          loading
        }),

      setIsAnalyzing: (
        value
      ) =>

        set({
          isAnalyzing: value
        }),

      setAnalysisSteps: (
        steps
      ) =>

        set({
          analysisSteps: steps
        }),

      // =====================
      // SYMPTOMS
      // =====================

      setSymptoms: (
        symptoms
      ) =>

        set({
          symptoms
        }),

      addSymptom: (
        symptom
      ) =>

        set((state) => ({

          symptoms:
            state.symptoms.includes(
              symptom
            )

              ? state.symptoms

              : [

                  ...state.symptoms,

                  symptom

                ]

        })),

      removeSymptom: (
        symptom
      ) =>

        set((state) => ({

          symptoms:
            state.symptoms.filter(

              (item) =>

                item !== symptom

            )

        })),

      clearSymptoms: () =>

        set({

          symptoms: []

        }),

      // =====================
      // PREDICTIONS
      // =====================

      setPredictions: (
        predictions
      ) =>

        set({
          predictions
        }),

      setRiskLevel: (
        riskLevel
      ) =>

        set({
          riskLevel
        }),

      setDepartment: (
        department
      ) =>

        set({
          department
        }),

      setEmergency: (
        emergency
      ) =>

        set({
          emergency
        }),

      // =====================
      // REASONING
      // =====================

      addReasoning: (
        text
      ) =>

        set((state) => ({

          reasoning: [

            ...state.reasoning,

            text

          ]

        })),

      clearReasoning: () =>

        set({

          reasoning: []

        }),

      // =====================
      // CLEAR ANALYSIS
      // =====================

      clearAnalysis: () =>

        set({

          symptoms: [],

          predictions: [],

          recommendedDoctors: [],

          reasoning: [],

          analysisSteps: [],

          riskLevel: "Low",

          department:
            "General Medicine",

          emergency: false,

          isAnalyzing: false

        }),

      // =====================
      // SET FULL RESULT
      // =====================

      setAnalysisResult: (
        data
      ) =>

        set({

          symptoms:
            data.enteredSymptoms || [],

          predictions:
            data.possibleDiseases || [],

          recommendedDoctors:
            data.recommendedDoctors || [],

          riskLevel:

            data
              .possibleDiseases?.[0]
              ?.riskLevel ||

            "Low",

          department:

            data
              .possibleDiseases?.[0]
              ?.department ||

            "General Medicine",

          emergency:

            data
              .emergency
              ?.isEmergency ||

            false

        })

    })

  );