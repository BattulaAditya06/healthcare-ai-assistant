
import { DiseaseCard } from "./disease-card";

import { FollowUpActions } from "./follow-up-actions";

import {

  ChatMessageType,

  DiseasePrediction,

  ChatResponse

} from "../types/chat";

interface ChatMessageProps {

  message: ChatMessageType;

  sendMessage: (
    message: string
  ) => Promise<void>;

}

export function ChatMessage({

  message,

  sendMessage

}: ChatMessageProps) {

  const isUser =
    message.role === "user";

  // =========================
  // USER MESSAGE
  // =========================

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

              : (
                  message.content as ChatResponse
                ).message

          }

        </div>

      </div>

    );

  }

  // =========================
  // ASSISTANT TEXT MESSAGE
  // =========================

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

          {

            typeof message.content ===
            "string"

              ? message.content

              : JSON.stringify(
                  message.content
                )

          }

        </div>

      </div>

    );

  }

  // =========================
  // DIAGNOSIS MESSAGE
  // =========================

  const data =
    message.content as ChatResponse;
console.log("CHAT MESSAGE DATA:", data);

console.log(
  "FOLLOWUP QUESTIONS:",
  data.followUpQuestions
);

console.log(
  "FOLLOWUP LENGTH:",
  data.followUpQuestions?.length
);
    console.log(
  "CHAT MESSAGE DATA:",
  data
);

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

{/* EMERGENCY ALERT */}

{data.emergency && (

  <div
    className="
      mt-4
      rounded-xl
      border
      border-red-500
      bg-red-50
      p-4
    "
  >

    <div
      className="
        font-semibold
        text-red-700
      "
    >
      🚨 Medical Emergency
    </div>

    <p
      className="
        mt-1
        text-sm
        text-red-600
      "
    >
      Immediate medical attention is recommended.
      Contact emergency services or visit the nearest hospital.
    </p>

  </div>

)}
{/* SEVERITY ALERT */}

{data.analysis?.severity?.level === "high" && (

  <div
    className="
      mt-4
      rounded-xl
      border
      border-orange-500
      bg-orange-50
      p-4
    "
  >

    <div
      className="
        font-semibold
        text-orange-700
      "
    >
      ⚠️ High Severity Symptoms
    </div>

    <p
      className="
        mt-1
        text-sm
        text-orange-600
      "
    >
      Symptoms appear severe.
      Prompt medical consultation is recommended.
    </p>

  </div>

)}

{/* TEMPORAL ALERT */}

{data.analysis?.temporal?.durationDays &&
 data.analysis.temporal.durationDays >= 3 && (

  <div
    className="
      mt-4
      rounded-xl
      border
      border-yellow-500
      bg-yellow-50
      p-4
    "
  >

    <div
      className="
        font-semibold
        text-yellow-700
      "
    >
      ⏳ Persistent Symptoms
    </div>

    <p
      className="
        mt-1
        text-sm
        text-yellow-600
      "
    >
      Symptoms have persisted for
      {` ${data.analysis.temporal.durationDays} `}
      days. Medical consultation is advised.
    </p>

  </div>

)}

{/* URGENT FOLLOWUP ALERT */}

{data.urgentFollowup && (

  <div
    className="
      mt-4
      rounded-xl
      border
      border-yellow-500
      bg-yellow-50
      p-4
    "
  >

    <div
      className="
        font-semibold
        text-yellow-700
      "
    >
      ⚠️ Persistent or Severe Symptom
    </div>

    <p
      className="
        mt-1
        text-sm
        text-yellow-600
      "
    >
      This symptom has persisted for several days
      or appears severe. Medical consultation is recommended.
    </p>

  </div>

)}

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

        {(data.followUpQuestions?.length ?? 0) > 0 && (

          <div
            className="
              rounded-2xl
              border
              bg-card
              p-5
            "
          >
<div
  className="
    mb-4
    rounded-lg
    bg-blue-50
    p-3
    text-sm
  "
>
  Reply in the chat box.
  Example: <b>yes nausea</b>
</div>
           <div className="mb-3">

  <p
    className="
      font-medium
    "
  >
    Follow-up Questions
  </p>

  <p
    className="
      mt-1
      text-xs
      text-muted-foreground
    "
  >
    Reply in the chat box with your answer.
    Example: yes nausea
  </p>

</div>

            <div className="flex flex-col gap-2">

             {data.followUpQuestions?.map(

  (
    question: string,
    index: number
  ) => (

    <div
      key={index}
      className="
        rounded-lg
        border
        p-3
      "
    >
      {question}
    </div>

  )

)}

            </div>

          </div>

        )}

      </div>

    </div>

  );

}
