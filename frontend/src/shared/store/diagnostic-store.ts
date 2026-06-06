
import { create } from "zustand";

// =========================
// DISEASE PREDICTION
// =========================

interface DiseasePrediction {

  disease: string;

  confidence: number;

  riskLevel: string;

  department: string;

}

// =========================
// RECOMMENDED DOCTOR
// =========================

interface RecommendedDoctor {

  id: number;

  name: string;

  department: string;

  experience: string;

}

// =========================
// STORE STATE
// =========================

interface DiagnosticState {

  symptoms: string[];

  predictions: DiseasePrediction[];

  recommendedDoctors:
    RecommendedDoctor[];

  riskLevel: string;

  department: string;

  reasoning: string[];

  emergency: boolean;

  analysisSteps: string[];

  isAnalyzing: boolean;

  // =====================
  // ACTIONS
  // =====================

  setSymptoms: (
    symptoms: string[]
  ) => void;

  addSymptom: (
    symptom: string
  ) => void;

  removeSymptom: (
    symptom: string
  ) => void;

  setPredictions: (
    predictions:
      DiseasePrediction[]
  ) => void;

  setRecommendedDoctors: (
    doctors:
      RecommendedDoctor[]
  ) => void;

  setRiskLevel: (
    riskLevel: string
  ) => void;

  setDepartment: (
    department: string
  ) => void;

  addReasoning: (
    reasoning: string
  ) => void;

  setEmergency: (
    emergency: boolean
  ) => void;

  setAnalysisSteps: (
    steps: string[]
  ) => void;

  setIsAnalyzing: (
    value: boolean
  ) => void;

  reset: () => void;

}

// =========================
// STORE
// =========================

export const useDiagnosticStore =
create<DiagnosticState>(

  (set) => ({

    symptoms: [],

    predictions: [],

    recommendedDoctors: [],

    riskLevel: "Low",

    department:
      "General Medicine",

    reasoning: [],

    emergency: false,

    analysisSteps: [],

    isAnalyzing: false,

    // =====================
    // SYMPTOMS
    // =====================

    setSymptoms:
      (symptoms) =>

        set({
          symptoms
        }),

    addSymptom:
      (symptom) =>

        set((state) => ({

          symptoms: [

            ...new Set([

              ...state.symptoms,

              symptom

            ])

          ]

        })),

    removeSymptom:
      (symptom) =>

        set((state) => ({

          symptoms:

            state.symptoms.filter(
              (s) =>
                s !== symptom
            )

        })),

    // =====================
    // PREDICTIONS
    // =====================

    setPredictions:
      (predictions) =>

        set({
          predictions
        }),

    // =====================
    // RECOMMENDED DOCTORS
    // =====================

    setRecommendedDoctors:
      (recommendedDoctors) =>

        set({
          recommendedDoctors
        }),

    // =====================
    // RISK LEVEL
    // =====================

    setRiskLevel:
      (riskLevel) =>

        set({
          riskLevel
        }),

    // =====================
    // DEPARTMENT
    // =====================

    setDepartment:
      (department) =>

        set({
          department
        }),

    // =====================
    // AI REASONING
    // =====================

    addReasoning:
      (reasoning) =>

        set((state) => ({

          reasoning: [

            ...state.reasoning,

            reasoning

          ].slice(-8)

        })),

    // =====================
    // EMERGENCY
    // =====================

    setEmergency:
      (emergency) =>

        set({
          emergency
        }),

    // =====================
    // ANALYSIS STEPS
    // =====================

    setAnalysisSteps:
      (analysisSteps) =>

        set({
          analysisSteps
        }),

    // =====================
    // ANALYZING STATE
    // =====================

    setIsAnalyzing:
      (isAnalyzing) =>

        set({
          isAnalyzing
        }),

    // =====================
    // RESET
    // =====================

    reset: () =>

      set({

        symptoms: [],

        predictions: [],

        recommendedDoctors: [],

        riskLevel: "Low",

        department:
          "General Medicine",

        reasoning: [],

        emergency: false,

        analysisSteps: [],

        isAnalyzing: false

      })

  })

);