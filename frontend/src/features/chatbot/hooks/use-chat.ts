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

  setMessages,

  currentSymptoms,

  setCurrentSymptoms,

  activeFollowUpQuestions,

  setActiveFollowUpQuestions,

  isFollowUpMode,

  setFollowUpMode

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


        addReasoning(
          "Checking disease patterns..."
        );


        addReasoning(
          "Evaluating emergency indicators..."
        );

        

        addReasoning(
          "Generating AI predictions..."
        );

        // =====================
        // API CALL
        // =====================
const symptomKeywords = [

  "headache",
  "fever",
  "cold",
  "cough",
  "stomach pain",
  "abdominal pain",
  "vomiting",
  "dizziness",
  "fatigue",
  "chest pain"

];

const isNewConversation =

  symptomKeywords.some(

    symptom =>

      message
        .toLowerCase()
        .includes(
          symptom
        )

  );

if (
  isNewConversation
) {

  setFollowUpMode(
    false
  );

  setCurrentSymptoms(
    []
  );

  setActiveFollowUpQuestions(
    []
  );

}
      let finalMessage =
  message;

if (

  isFollowUpMode &&

  currentSymptoms.length > 0

) {

  const previousSymptoms =

    currentSymptoms.join(
      " "
    );

  finalMessage =

    `${previousSymptoms} ${message}`;

}

const response =
  await sendChatMessage({

    message:
      finalMessage

  });

        console.log(
          "API RESPONSE:",
          response
        );

        const apiData =
          response;
          if (
  apiData.followUpQuestions?.length
) {

  setFollowUpMode(
    true
  );

  setActiveFollowUpQuestions(
    apiData.followUpQuestions
  );

}
        console.log(
  "FOLLOWUPS FROM API:",
  apiData.followUpQuestions
);
          if (
  apiData.enteredSymptoms
) {

  setCurrentSymptoms(
    apiData.enteredSymptoms
  );

}

          console.log(
  "API DATA:",
  apiData
);

        // =====================
        // SAVE TO HISTORY
        // =====================

       if (

  apiData
    .possibleDiseases
    ?.length > 0

) {

  setFollowUpMode(
    false
  );

  setCurrentSymptoms(
    []
  );

  setActiveFollowUpQuestions(
    []
  );

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
console.log(
  "ADDING DIAGNOSIS MESSAGE",
  apiData
);
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
console.log(
  "MESSAGE ADDED:",
  apiData
);
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

  setEmergencyData({

    ...apiData.analysis.emergency,

    department:
      apiData.emergencyDepartment

  });

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