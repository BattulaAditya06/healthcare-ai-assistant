export interface DiseasePrediction {

  disease: string;

  confidence: number;

  riskLevel: string;

  department: string;

  emergencyMatch?: boolean;

}

export interface ChatResponse {

  message: string;

  enteredSymptoms: string[];

  possibleDiseases:
    DiseasePrediction[];

  followUpQuestions:
    string[];

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
