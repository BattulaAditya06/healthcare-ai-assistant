import { DiseaseCard }
from "./disease-card";

import {
  FollowUpActions
} from "./follow-up-actions";

import {

  ChatMessageType,

  DiseasePrediction,

  ChatResponse

} from "../types/chat";

interface ChatMessageProps {

  message:
    ChatMessageType;

  sendMessage:
    (
      message: string
    ) => Promise<void>;

}

export function ChatMessage({

  message,

  sendMessage

}: ChatMessageProps) {

  const isUser =
    message.role === "user";

  // USER MESSAGE
  if (isUser) {

    return (

      <div className="flex justify-end">

        <div
          className="
            max-w-md
            rounded-2xl
            bg-primary
            px-5
            py-3
            text-primary-foreground
            shadow-sm
          "
        >

          {

            typeof message.content ===
            "string"

              ? message.content

              : message.content.message

          }

        </div>

      </div>

    );

  }

  // ASSISTANT TEXT MESSAGE
  if (
    message.type === "text"
  ) {

    return (

      <div className="flex justify-start">

        <div
          className="
            rounded-2xl
            border
            bg-card
            px-5
            py-3
            shadow-sm
          "
        >

          {message.content}

        </div>

      </div>

    );

  }

  // ASSISTANT DIAGNOSIS MESSAGE
  const data =
    message.content as ChatResponse;

  return (

    <div className="flex justify-start">

      <div
        className="
          flex
          w-full
          max-w-3xl
          flex-col
          gap-4
        "
      >

        {/* MAIN MESSAGE */}
        <div
          className="
            rounded-2xl
            border
            bg-card
            px-5
            py-4
          "
        >

          <p className="font-medium">

            {data.message}

          </p>

          {data.enteredSymptoms
            ?.length > 0 && (

            <div className="mt-3">

              <p
                className="
                  mb-2
                  text-sm
                  font-medium
                "
              >

                Symptoms

              </p>

              <div className="flex flex-wrap gap-2">

                {data.enteredSymptoms.map(
                  (
                    symptom: string,
                    index: number
                  ) => (

                    <span

                      key={`${symptom}-${index}`}

                      className="
                        rounded-full
                        border
                        px-3
                        py-1
                        text-sm
                      "
                    >

                      {symptom}

                    </span>

                  )
                )}

              </div>

            </div>

          )}

        </div>

        {/* DISEASE CARDS */}
        {data.possibleDiseases
          ?.length > 0 && (

          <div
            className="
              grid
              gap-4
            "
          >

            {data.possibleDiseases.map(
              (
                disease:
                  DiseasePrediction,

                index: number
              ) => (

                <DiseaseCard

                  key={`${disease.disease}-${index}`}

                  disease={
                    disease.disease
                  }

                  confidence={
                    disease.confidence
                  }

                  riskLevel={
                    disease.riskLevel
                  }

                  department={
                    disease.department
                  }

                  emergencyMatch={
                    disease.emergencyMatch
                  }

                />

              )
            )}

          </div>

        )}

        {/* FOLLOW-UP QUESTIONS */}
        {data.followUpQuestions
          ?.length > 0 && (

          <div
            className="
              rounded-2xl
              border
              bg-card
              p-5
            "
          >

            <p
              className="
                mb-3
                font-medium
              "
            >

              Follow-up Questions

            </p>

            <div className="flex flex-col gap-2">

              {data.followUpQuestions.map(
                (
                  question: string,
                  index: number
                ) => (

                  <FollowUpActions

                    key={`${question}-${index}`}

                    question={question}

                    sendMessage={
                      sendMessage
                    }

                  />

                )
              )}

            </div>

          </div>

        )}

      </div>

    </div>

  );

}