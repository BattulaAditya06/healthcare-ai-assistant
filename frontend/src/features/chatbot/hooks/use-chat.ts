"use client";

import {

  useEffect,

  useState

} from "react";

import {

  useDiagnosticStore

} from "@/shared/store/diagnostic-store";

import {

  sendChatMessage,

  getChatMessages

} from "@/shared/services/chatbot-service";

import {

  useChatStore

} from "../store/chat-store";

import {

  ChatResponse

} from "../types/chat";

export function useChat() {

  const [loading, setLoading] =
    useState(false);

  // =====================
  // CHAT STORE
  // =====================

  const {

    addMessage,

    messages,

    setMessages

  } = useChatStore();

  // =====================
  // DIAGNOSTIC STORE
  // =====================

  const {

    setSymptoms,

    setPredictions,

    setRiskLevel,

    setDepartment,

    addReasoning,

    setEmergency,

    setAnalysisSteps,

    setIsAnalyzing

  } = useDiagnosticStore();

  // =====================
  // LOAD CHAT HISTORY
  // =====================

  useEffect(() => {

    const loadMessages =
      async () => {

        try {

          const response =
            await getChatMessages();

          const formattedMessages =
            response.map(

              (
                message: {

                  content: string;

                  [key: string]:
                    unknown;

                }

              ) => {

                let parsedContent:
                  unknown =
                    message.content;

                try {

                  parsedContent =
                    JSON.parse(
                      message.content
                    );

                } catch {

                  parsedContent =
                    message.content;

                }

                return {

                  ...message,

                  content:
                    parsedContent

                };

              }

            );

          setMessages(
            formattedMessages
          );

        } catch (error) {

          console.log(
            error
          );

        }

      };

    loadMessages();

  }, [setMessages]);

  // =====================
  // SEND MESSAGE
  // =====================

  const sendMessage =
    async (
      message: string
    ) => {

      try {

        setLoading(true);

        setIsAnalyzing(true);

        setAnalysisSteps([]);

        // =====================
        // USER MESSAGE
        // =====================

        addMessage({

          id:
            crypto.randomUUID(),

          role:
            "user",

          type:
            "text",

          content:
            message

        });

        // =====================
        // STREAMING STEPS
        // =====================

        const steps = [

          "Analyzing symptoms...",

          "Checking disease patterns...",

          "Evaluating emergency indicators...",

          "Calculating diagnostic confidence...",

          "Generating predictions..."

        ];

        for (
          const step of steps
        ) {

          setAnalysisSteps([

            ...useDiagnosticStore
              .getState()
              .analysisSteps,

            step

          ]);

          await new Promise(

            (resolve) =>

              setTimeout(
                resolve,
                700
              )

          );

        }

        // =====================
        // API RESPONSE
        // =====================

        const response:
          ChatResponse =

          await sendChatMessage({

            message

          });

        console.log(
          "API RESPONSE:",
          response
        );

        const apiData =
          response;

        // =====================
        // FULL RESET
        // =====================

        useDiagnosticStore.setState({

          symptoms: [],

          predictions: [],

          riskLevel: "Low",

          department:
            "General Medicine",

          reasoning: [],

          emergency: false,

          analysisSteps: [],

          isAnalyzing: false

        });

        // =====================
        // ASSISTANT MESSAGE
        // =====================

        addMessage({

          id:
            crypto.randomUUID(),

          role:
            "assistant",

          type:
            "diagnosis",

          content:
            apiData

        });

        // =====================
        // SYMPTOMS
        // =====================

        setSymptoms(

          apiData.enteredSymptoms || []

        );

        // =====================
        // PREDICTIONS
        // =====================

        setPredictions(

          (
            apiData
              .possibleDiseases || []

          ).map(

            (
              disease: {

                disease: string;

                confidence: number;

                riskLevel: string;

                department: string;

              }

            ) => ({

              disease:
                disease.disease,

              confidence:
                disease.confidence,

              riskLevel:
                disease.riskLevel,

              department:
                disease.department

            })

          )

        );

        // =====================
        // TOP PREDICTION
        // =====================

        const topPrediction =

          apiData
            ?.possibleDiseases?.[0];

        if (topPrediction) {

          // ===================
          // SMART RISK
          // ===================

          const calculatedRisk =

            topPrediction.confidence >= 35

              ? topPrediction.riskLevel

              : "Low";

          setRiskLevel(
            calculatedRisk
          );

          setDepartment(

            topPrediction.department ||

            "General Medicine"

          );

        }

        // =====================
        // AI REASONING
        // =====================

        addReasoning(
          "Symptoms analyzed"
        );

        addReasoning(
          "Disease confidence recalculated"
        );

        addReasoning(
          "Risk evaluation completed"
        );

        // =====================
        // SMART EMERGENCY
        // =====================

        const emergencyDetected =

          apiData
            ?.possibleDiseases
            ?.some(

              (
                disease: {

                  riskLevel: string;

                  confidence: number;

                  emergencyMatch?: boolean;

                }

              ) =>

                (

                  disease
                    .riskLevel
                    ?.toLowerCase() ===
                  "high"

                ) &&

                disease.confidence >= 35 &&

                disease.emergencyMatch

            );

        setEmergency(
          emergencyDetected || false
        );

      } catch (error) {

        console.error(
          error
        );

        addMessage({

          id:
            crypto.randomUUID(),

          role:
            "assistant",

          type:
            "text",

          content:
            "Something went wrong. Please try again."

        });

      } finally {

        setLoading(false);

        setIsAnalyzing(false);

      }

    };

  return {

    sendMessage,

    loading,

    messages

  };

}