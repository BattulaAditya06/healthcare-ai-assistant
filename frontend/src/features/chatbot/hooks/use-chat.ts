"use client";

import {
  useRouter
} from "next/navigation";

import {
  useEffect,
  useState
} from "react";

import {
  useDiagnosticStore
} from "@/shared/store/diagnostic-store";

import {
  useEmergencyStore
} from "@/features/emergency/store/emergency-store";

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

import {
  useHistoryStore
} from "@/features/history/store/history-store";

// =========================
// HOOK
// =========================

export function useChat() {

  // =====================
  // ROUTER
  // =====================

  const router =
    useRouter();

  // =====================
  // LOCAL STATE
  // =====================

  const [

    loading,

    setLoading

  ] = useState(false);

  // =====================
  // CHAT STORE
  // =====================

  const {

    addMessage,

    messages,

    setMessages

  } = useChatStore();

  // =====================
  // EMERGENCY STORE
  // =====================

  const {

    setEmergencyData

  } = useEmergencyStore();

  // =====================
  // DIAGNOSTIC STORE
  // =====================

  const {

    setAnalysisResult,

    addReasoning,

    clearReasoning

  } = useDiagnosticStore();

  // =====================
  // HISTORY STORE
  // =====================

  const addHistory =

    useHistoryStore(

      (state) =>

        state.addHistory

    );

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

          console.log(error);

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

        // =====================
        // RESET AI REASONING
        // =====================

        clearReasoning();

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
        // AI REASONING
        // =====================

        addReasoning(
          "Analyzing symptoms..."
        );

        await new Promise(

          (resolve) =>

            setTimeout(
              resolve,
              500
            )

        );

        addReasoning(
          "Checking disease patterns..."
        );

        await new Promise(

          (resolve) =>

            setTimeout(
              resolve,
              500
            )

        );

        addReasoning(
          "Evaluating emergency indicators..."
        );

        await new Promise(

          (resolve) =>

            setTimeout(
              resolve,
              500
            )

        );

        addReasoning(
          "Generating AI predictions..."
        );

        // =====================
        // API CALL
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
        // SAVE TO HISTORY
        // =====================

        if (

          apiData
            .possibleDiseases
            ?.length > 0

        ) {

          const topDisease =

            apiData
              .possibleDiseases[0];

          addHistory({

            id:
              crypto.randomUUID(),

            disease:
              topDisease.disease,

            symptoms:
              apiData.enteredSymptoms,

            confidence:
              topDisease.confidence,

            riskLevel:
              topDisease.riskLevel,

            date:
              new Date()
                .toLocaleDateString()

          });

        }

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
        // UPDATE ANALYSIS STORE
        // =====================

        setAnalysisResult(
          apiData
        );

        // =====================
        // UPDATE EMERGENCY STORE
        // =====================

    if (
  apiData.analysis?.emergency
) {

  setEmergencyData(
    apiData.analysis.emergency
  );

}

        // =====================
        // AUTO REDIRECT
        // =====================
if (

  apiData.analysis
    ?.emergency
    ?.emergency

) {

  setTimeout(() => {

    router.push(
      "/emergency"
    );

  }, 5000);

}

        // =====================
        // FINAL REASONING
        // =====================

        addReasoning(
          "Disease confidence recalculated"
        );

        addReasoning(
          "Risk evaluation completed"
        );

        addReasoning(
          "Doctor recommendations generated"
        );

      } catch (error) {

        console.error(error);

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

      }

    };

  // =====================
  // RETURN
  // =====================

  return {

    sendMessage,

    loading,

    messages

  };

}