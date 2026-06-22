import { create } from "zustand";

import {
  ChatMessageType
} from "../types/chat";

interface ChatStore {

  messages: ChatMessageType[];

  currentSymptoms: string[];

  activeFollowUpQuestions: string[];

  lastFollowUpSymptom: string;

  isFollowUpMode: boolean;

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

  setFollowUpMode: (
    value: boolean
  ) => void;

}

export const useChatStore =
create<ChatStore>((set) => ({

  messages: [],

  currentSymptoms: [],

  activeFollowUpQuestions: [],

  lastFollowUpSymptom: "",

  isFollowUpMode: false,

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

    }),

  setFollowUpMode: (
  value: boolean
) =>
    set({

      isFollowUpMode:
        value

    })

}));