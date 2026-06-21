import { create }
from "zustand";

import {
  ChatMessageType
} from "../types/chat";

interface ChatStore {

  messages:
    ChatMessageType[];

 

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
 currentSymptoms:
    string[];
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
currentSymptoms:
      [],

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
