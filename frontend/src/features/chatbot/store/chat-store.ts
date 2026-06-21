import { create } from "zustand";

import {
  ChatMessageType
} from "../types/chat";

interface ChatStore {

  messages:
    ChatMessageType[];

  currentSymptoms:
    string[];

  activeFollowUpQuestions:
    string[];

  lastFollowUpSymptom:
    string;

  addMessage: (
    message: ChatMessageType
  ) => void;

  setMessages: (
    messages: ChatMessageType[]
  ) => void;

  setCurrentSymptoms: (
    symptoms: string[]
  ) => void;

  setActiveFollowUpQuestions: (
    questions: string[]
  ) => void;

  setLastFollowUpSymptom: (
    symptom: string
  ) => void;

}

export const useChatStore =
create<ChatStore>((set) => ({

  messages: [],

  currentSymptoms: [],

  activeFollowUpQuestions: [],

  lastFollowUpSymptom: "",

  addMessage: (
    message
  ) =>

    set((state) => ({

      messages: [

        ...state.messages,

        message

      ]

    })),

  setMessages: (
    messages
  ) =>

    set({

      messages

    }),

  setCurrentSymptoms: (
    symptoms
  ) =>

    set({

      currentSymptoms:
        symptoms

    }),

  setActiveFollowUpQuestions: (
    questions
  ) =>

    set({

      activeFollowUpQuestions:
        questions

    }),

  setLastFollowUpSymptom: (
    symptom
  ) =>

    set({

      lastFollowUpSymptom:
        symptom

    })

}));