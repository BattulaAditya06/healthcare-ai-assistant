"use client";

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
  Activity
} from "lucide-react";

import {
  motion
} from "framer-motion";

import {
  useDiagnosticStore
} from "@/shared/store/diagnostic-store";

export function AIHealthPanel() {

  const {

    symptoms,

    predictions,

    riskLevel,

    department,

    reasoning,

    emergency

  } = useDiagnosticStore();

  const topPrediction =
    predictions[0];

  return (

    <aside
      className="
        hidden
        w-80
        border-l
        bg-background/80
        p-6
        backdrop-blur-xl
        xl:block
      "
    >

      <div
        className="
          space-y-6
        "
      >

        {/* HEADER */}

        <motion.div

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

        >

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
              mt-1
              text-sm
              text-muted-foreground
            "
          >

            Live diagnostic intelligence

          </p>

        </motion.div>

        {/* EMERGENCY ALERT */}

        {emergency && (

          <motion.div

            initial={{
              opacity: 0,
              scale: 0.9
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
              "
            >

              <CardContent
                className="
                  flex
                  items-center
                  gap-3
                  p-4
                "
              >

                <AlertTriangle
                  className="
                    text-red-500
                  "
                />

                <div>

                  <h3
                    className="
                      font-semibold
                      text-red-500
                    "
                  >

                    Emergency Risk

                  </h3>

                  <p
                    className="
                      text-sm
                      text-muted-foreground
                    "
                  >

                    Immediate medical attention recommended

                  </p>

                </div>

              </CardContent>

            </Card>

          </motion.div>

        )}

        {/* CURRENT STATUS */}

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

          <Card>

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
                space-y-4
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span>
                  Risk Level
                </span>

                <Badge

                  variant={
                  topPrediction?.confidence>=35&&
                    riskLevel.toLowerCase() === "high"

                      ? "destructive"

                      : "secondary"

                  }

                >

                  {riskLevel}

                </Badge>

              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span>
                  Department
                </span>

                <span
                  className="
                    text-sm
                    text-muted-foreground
                  "
                >

                  {department}

                </span>

              </div>

            </CardContent>

          </Card>

        </motion.div>

        {/* TOP PREDICTION */}

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

          <Card>

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

                {topPrediction?.confidence>=25?"Top Prediction":"Possible Conditions"}

              </CardTitle>

            </CardHeader>

            <CardContent
              className="
                space-y-4
              "
            >

              {topPrediction ? (

                <>

                  <div>

                    <h3
                      className="
                        text-xl
                        font-semibold
                      "
                    >

                      {
                        topPrediction.disease
                      }

                    </h3>

                    <p
                      className="
                        text-sm
                        text-muted-foreground
                      "
                    >

                      Confidence score

                    </p>

                  </div>

                  <Progress
                    value={
                      topPrediction.confidence
                    }
                  />

                  <div
                    className="
                      text-right
                      text-sm
                      font-medium
                    "
                  >

                    {
                      topPrediction.confidence
                    }%

                  </div>

                </>

              ) : (

                <p
                  className="
                    text-sm
                    text-muted-foreground
                  "
                >

                  Waiting for symptom analysis...

                </p>

              )}

            </CardContent>

          </Card>

        </motion.div>

        {/* ACTIVE SYMPTOMS */}

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

          <Card>

            <CardHeader>

              <CardTitle>

                Active Symptoms

              </CardTitle>

            </CardHeader>

            <CardContent
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

                  No symptoms added

                </p>

              )}

            </CardContent>

          </Card>

        </motion.div>

        {/* AI REASONING */}

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

          <Card>

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

                    >

                      ✓ {item}

                    </motion.div>

                  )
                )

              ) : (

                <p
                  className="
                    text-muted-foreground
                  "
                >

                  AI reasoning will appear here

                </p>

              )}

            </CardContent>

          </Card>

        </motion.div>

      </div>

    </aside>

  );

}
