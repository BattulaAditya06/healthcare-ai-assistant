export interface DiseasePrediction {

  disease: string;

  confidence: number;

  riskLevel: string;

  department: string;

  emergencyMatch?: boolean;

}

import type {
  Doctor
} from "@/shared/types/doctor";

export interface ChatResponse {
  success: boolean;

  message?: string;

  urgentFollowup?: boolean;

  enteredSymptoms: string[];

  followUpQuestions?: string[];

  analysis?: {
    temporal?: {
      durationDays?: number | null;
      chronic?: boolean;
    };

    severity?: {
      score?: number;
      level?: string;
    };

    emergency?: {
      emergency?: boolean;
      priority?: string;
      matchedSymptoms?: string[];
      matchedKeywords?: string[];
      action?: string;
    };
  };

  possibleDiseases: {
    disease: string;
    confidence: number;
    riskLevel: string;
    department: string;
    emergencyMatch?: boolean;
    recommendations?: string[];
  }[];

  recommendedDoctors: string[];

  emergency?: boolean;
}

export interface StoredMessage {

  id: string;

  role:
    "user" | "assistant";

  type:
    "text" | "diagnosis";

  content:
    string | ChatResponse;

  createdAt?: string;

}

export interface UserMessage {

  id: string;

  role: "user";

  type: "text";

  content: string;

}

export interface AssistantTextMessage {

  id: string;

  role: "assistant";

  type: "text";

  content: string;

}

export interface AssistantDiagnosisMessage {

  id: string;

  role: "assistant";

  type: "diagnosis";

  content: ChatResponse;

}

export type ChatMessageType =

  | UserMessage
  | AssistantTextMessage
  | AssistantDiagnosisMessage;
