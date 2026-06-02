import { create }
from "zustand";

import {
  ChatMessageType
} from "../types/chat";

interface ChatStore {

  messages:
    ChatMessageType[];

  currentSymptoms:
    string[];

  lastFollowUpSymptom:
    string;

  addMessage:
    (
      message:
        ChatMessageType
    ) => void;

  setMessages:
    (
      messages:
        ChatMessageType[]
    ) => void;

  setCurrentSymptoms:
    (
      symptoms:
        string[]
    ) => void;

  setLastFollowUpSymptom:
    (
      symptom: string
    ) => void;

}

export const useChatStore =
create<ChatStore>(
  (set) => ({

    messages: [],

    currentSymptoms:
      [],

    lastFollowUpSymptom:
      "",

    addMessage:
      (message) =>

        set((state) => ({

          messages: [

            ...state.messages,

            message

          ]

        })),

    setMessages:
      (messages) =>

        set({

          messages

        }),

    setCurrentSymptoms:
      (symptoms) =>

        set({

          currentSymptoms:
            symptoms

        }),

    setLastFollowUpSymptom:
      (symptom) =>

        set({

          lastFollowUpSymptom:
            symptom

        })

  })
);
