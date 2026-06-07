export interface DiseasePrediction {

  disease: string;

  confidence: number;

  riskLevel: string;

  department: string;

  emergencyMatch?: boolean;

}

export interface Doctor {

  id: number;

  name: string;

  department: string;

  rating: number;

  experience: number;

  hospital: string;

}

export interface ChatResponse {

  success: boolean;

  message?: string;

  enteredSymptoms: string[];

  followUpQuestions: string[];

  possibleDiseases: {

    disease: string;

    confidence: number;

    riskLevel: string;

    department: string;

    emergencyMatch?: boolean;

    recommendations?: string[];

  }[];

  recommendedDoctors: {

    id: number;

    name: string;

    department: string;

    rating: number;

    experience: number;

    hospital: string;

  }[];

  emergency?: {

  isEmergency: boolean;

  severity: string;

  matchedSymptoms: string[];

};

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
