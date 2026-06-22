"use client";

import {
  useChatStore
} from "@/features/chatbot/store/chat-store";

import {

  motion

} from "framer-motion";

import {

  Card,

  CardContent,

  CardHeader,

  CardTitle

} from "@/components/ui/card";

import {

  Badge

} from "@/components/ui/badge";

import {

  Progress

} from "@/components/ui/progress";

import {

  AlertTriangle,

  Brain,

  Activity,

  ShieldAlert,

  Stethoscope,

  Sparkles

} from "lucide-react";

import {

  useDiagnosticStore

} from "@/shared/store/diagnostic-store";

// =========================
// COMPONENT
// =========================

export function AIHealthPanel() {

  const {

    symptoms = [],

    predictions = [],

    riskLevel = "Low",

    department = "General Medicine",

    reasoning = [],

    emergency = false

  } = useDiagnosticStore();

const {

  activeFollowUpQuestions

} = useChatStore();

  // =========================
  // TOP PREDICTION
  // =========================

  const topPrediction =
    predictions?.[0];

  // =========================
  // RISK UI
  // =========================

  const getRiskBadgeVariant = () => {

    const risk =
      riskLevel
        ?.toLowerCase();

    if (
      risk === "high"
    ) {

      return "destructive";

    }

    return "secondary";

  };

  // =========================
  // CONFIDENCE COLOR
  // =========================

  const getConfidenceColor = (
    confidence: number
  ) => {

    if (confidence >= 70) {

      return "text-red-500";

    }

    if (confidence >= 40) {

      return "text-yellow-500";

    }

    return "text-emerald-500";

  };

  // =========================
  // RENDER
  // =========================

  return (

    <aside
      className="
        hidden
        xl:block
        w-80
        border-l
        bg-background/80
        backdrop-blur-xl
        p-6
      "
    >

      <div
        className="
          space-y-6
        "
      >

        {/* =====================
            HEADER
        ====================== */}

        <motion.div

          initial={{
            opacity: 0,
            y: 15
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                rounded-2xl
                bg-primary/10
                p-3
              "
            >

              <Sparkles
                className="
                  h-6
                  w-6
                  text-primary
                "
              />

            </div>

            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >

                AI Health State

              </h2>

              <p
                className="
                  text-sm
                  text-muted-foreground
                  mt-1
                "
              >

                Real-time diagnostic intelligence

              </p>

            </div>

          </div>

        </motion.div>

        {/* =====================
            EMERGENCY ALERT
        ====================== */}

        {emergency && (

          <motion.div

            initial={{
              opacity: 0,
              scale: 0.95
            }}

            animate={{
              opacity: 1,
              scale: 1
            }}

          >

            <Card
              className="
                border-red-500
                bg-red-500/10
                shadow-lg
              "
            >

              <CardContent
                className="
                  flex
                  items-start
                  gap-4
                  p-5
                "
              >

                <div
                  className="
                    rounded-xl
                    bg-red-500/20
                    p-2
                  "
                >

                  <ShieldAlert
                    className="
                      h-5
                      w-5
                      text-red-500
                    "
                  />

                </div>

                <div>

                  <h3
                    className="
                      font-semibold
                      text-red-500
                    "
                  >

                    Emergency Risk Detected

                  </h3>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-muted-foreground
                    "
                  >

                    Immediate medical consultation is strongly recommended.

                  </p>

                </div>

              </CardContent>

            </Card>

          </motion.div>

        )}

        {/* =====================
            CURRENT STATUS
        ====================== */}

        <motion.div

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            delay: 0.1
          }}

        >

          <Card
            className="
              shadow-sm
            "
          >

            <CardHeader>

              <CardTitle
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <Activity
                  className="
                    h-5
                    w-5
                  "
                />

                Current Status

              </CardTitle>

            </CardHeader>

            <CardContent
              className="
                space-y-5
              "
            >

              {/* RISK */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span
                  className="
                    text-sm
                  "
                >

                  Risk Level

                </span>

                <Badge
                  variant={
                    getRiskBadgeVariant()
                  }
                >

                  {riskLevel}

                </Badge>

              </div>

              {/* DEPARTMENT */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span
                  className="
                    text-sm
                  "
                >

                  Department

                </span>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-muted-foreground
                  "
                >

                  <Stethoscope
                    className="
                      h-4
                      w-4
                    "
                  />

                  {department}

                </div>

              </div>

            </CardContent>

          </Card>

        </motion.div>

        {/* =====================
            TOP PREDICTION
        ====================== */}

        <motion.div

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            delay: 0.2
          }}

        >

          <Card
            className="
              shadow-sm
            "
          >

            <CardHeader>

              <CardTitle
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <Brain
                  className="
                    h-5
                    w-5
                  "
                />

                {

                  topPrediction?.confidence >= 25

                    ? "Top Prediction"

                    : "Possible Conditions"

                }

              </CardTitle>

            </CardHeader>

            <CardContent
              className="
                space-y-5
              "
            >

              {topPrediction ? (

                <>

                  <div>

                    <h3
                      className={`
                        text-2xl
                        font-bold

                        ${getConfidenceColor(
                          topPrediction.confidence
                        )}

                      `}
                    >

                      {
                        topPrediction.disease
                      }

                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-muted-foreground
                      "
                    >

                      AI diagnostic confidence

                    </p>

                  </div>

                  {/* PROGRESS */}

                  <div>

                    <Progress
                      value={
                        topPrediction.confidence
                      }
                    />

                    <div
                      className="
                        mt-2
                        text-right
                        text-sm
                        font-medium
                      "
                    >

                      {
                        topPrediction.confidence
                      }%

                    </div>

                  </div>

                </>

              ) : (

                <div
                  className="
                    rounded-xl
                    border
                    border-dashed
                    p-5
                    text-center
                  "
                >

                  <p
                    className="
                      text-sm
                      text-muted-foreground
                    "
                  >

                    Waiting for symptom analysis...

                  </p>

                </div>

              )}

            </CardContent>

          </Card>

        </motion.div>

        {/* =====================
            ACTIVE SYMPTOMS
        ====================== */}

        <motion.div

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            delay: 0.3
          }}

        >

          <Card
            className="
              shadow-sm
            "
          >

            <CardHeader>

              <CardTitle>

                Active Symptoms

              </CardTitle>

            </CardHeader>

           <CardContent>

  <div
    className="
      flex
      flex-wrap
      gap-2
    "
  >

    {symptoms.length > 0 ? (

      symptoms.map(
        (symptom) => (

          <Badge
            key={symptom}
            variant="secondary"
          >
            {symptom}
          </Badge>

        )
      )

    ) : (

      <p
        className="
          text-sm
          text-muted-foreground
        "
      >
        No active symptoms
      </p>

    )}

  </div>

  {activeFollowUpQuestions.length > 0 && (

    <div className="mt-5">

      <h4
        className="
          mb-3
          font-semibold
        "
      >
        Follow-up Questions
      </h4>

      <div
        className="
          mb-3
          rounded-lg
          bg-blue-50
          p-3
          text-sm
        "
      >
        Reply in the chat input below.
        Example: yes nausea
      </div>

      {activeFollowUpQuestions.map(

        (
          question,
          index
        ) => (

          <div
            key={index}
            className="
              mb-2
              rounded-lg
              border
              p-3
              text-sm
            "
          >
            {question}
          </div>

        )

      )}

    </div>

  )}

</CardContent>
          </Card>

        </motion.div>

        {/* =====================
            AI REASONING
        ====================== */}

        <motion.div

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            delay: 0.4
          }}

        >

          <Card
            className="
              shadow-sm
            "
          >

            <CardHeader>

              <CardTitle>

                AI Reasoning

              </CardTitle>

            </CardHeader>

            <CardContent
              className="
                space-y-3
                text-sm
              "
            >

              {reasoning.length > 0 ? (

                reasoning.map(
                  (
                    item,
                    index
                  ) => (

                    <motion.div

                      key={index}

                      initial={{
                        opacity: 0,
                        x: -10
                      }}

                      animate={{
                        opacity: 1,
                        x: 0
                      }}

                      className="
                        rounded-xl
                        border
                        bg-muted/30
                        p-3
                      "

                    >

                      ✓ {item}

                    </motion.div>

                  )
                )

              ) : (

                <div
                  className="
                    rounded-xl
                    border
                    border-dashed
                    p-5
                    text-center
                  "
                >

                  <p
                    className="
                      text-sm
                      text-muted-foreground
                    "
                  >

                    AI reasoning events will appear here

                  </p>

                </div>

              )}

            </CardContent>

          </Card>

        </motion.div>

      </div>

    </aside>

  );

}