
"use client";
import {
  BodySymptomMap
} from "@/components/medical/body-symptom-map";

import {

  RecommendedDoctors

} from "@/components/doctors/recommended-doctors";

import {
  AnimatePresence,
  motion
} from "framer-motion";

import {
  StreamingAnalysis
} from "@/components/ai/streaming-analysis";


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
  useDiagnosticStore
} from "@/shared/store/diagnostic-store";

import {
  DiagnosticEventFeed
} from "@/components/ai/diagnostic-event-feed";

import {
  DiseasePredictionCard
} from "@/components/medical/disease-prediction-card";

export function DiagnosticWorkspace() {

const {

  symptoms,

  predictions,

  recommendedDoctors

} = useDiagnosticStore();


  return (

    <div
      className="
        space-y-6
      "
    >

      {/* HERO SECTION */}

      <Card
        className="
          overflow-hidden
          border-0
          bg-gradient-to-br
          from-slate-900
          via-slate-800
          to-slate-900
          text-white
          shadow-2xl
        "
      >

        <CardContent
          className="
            p-8
          "
        >

          <div
            className="
              flex
              flex-col
              gap-4
            "
          >

            <h1
              className="
                text-4xl
                font-bold
                tracking-tight
              "
            >

              AI Diagnostic Workspace

            </h1>

            <p
              className="
                max-w-2xl
                text-slate-300
              "
            >

              Real-time intelligent healthcare analysis
              powered by adaptive diagnostic reasoning.

            </p>

          </div>

        </CardContent>

      </Card>

<RecommendedDoctors

  doctors={
    recommendedDoctors
  }

/>


<StreamingAnalysis />
<BodySymptomMap />

      {/* ACTIVE SYMPTOMS */}

      <Card
        className="
          border-0
          shadow-lg
        "
      >

        <CardHeader>

          <CardTitle>

            Active Symptoms

          </CardTitle>

        </CardHeader>

        <CardContent
          className="
            flex
            flex-wrap
            gap-3
          "
        >

          {symptoms.length > 0 ? (

            symptoms.map(
              (symptom) => (

                <Badge

                  key={symptom}

                  variant="secondary"

                  className="
                    rounded-full
                    px-4
                    py-2
                    text-sm
                  "
                >

                  {symptom}

                </Badge>

              )
            )

          ) : (

            <div
              className="
                rounded-xl
                border
                border-dashed
                p-6
                text-sm
                text-muted-foreground
              "
            >

              No active symptoms detected yet

            </div>

          )}

        </CardContent>

      </Card>

      {/* LIVE AI EVENT FEED */}

      <DiagnosticEventFeed />

      {/* DISEASE PREDICTIONS */}

      <Card
        className="
          border-0
          shadow-lg
        "
      >

        <CardHeader>

          <CardTitle>

            Top Predictions

          </CardTitle>

        </CardHeader>

        <CardContent
          className="
            space-y-4
          "
        >

{predictions.length > 0 ? (

  <AnimatePresence>

    {[...predictions]

      .sort(
        (a, b) =>

          b.confidence -
          a.confidence
      )

      .map(
        (prediction) => (

          <motion.div

            key={
              prediction.disease
            }

            layout

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            exit={{
              opacity: 0
            }}

            transition={{
              duration: 0.3
            }}

          >

            <DiseasePredictionCard

              disease={
                prediction.disease
              }

              confidence={
                prediction.confidence
              }

              riskLevel={
                prediction.riskLevel
              }

              department={
                prediction.department
              }

            />

          </motion.div>

        )
      )}

  </AnimatePresence>

) : (

  <div
    className="
      rounded-xl
      border
      border-dashed
      p-8
      text-center
      text-muted-foreground
    "
  >

    No predictions available yet

  </div>

)}


        </CardContent>

      </Card>

    </div>

  );

}
