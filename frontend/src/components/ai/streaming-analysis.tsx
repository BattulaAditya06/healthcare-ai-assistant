"use client";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import {
  Loader2
} from "lucide-react";

import {
  useDiagnosticStore
} from "@/shared/store/diagnostic-store";

export function StreamingAnalysis() {

  const {

    analysisSteps,

    isAnalyzing

  } = useDiagnosticStore();

  if (!isAnalyzing) {

    return null;

  }

  return (

    <div
      className="
        rounded-2xl
        border
        bg-card
        p-6
        shadow-lg
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <Loader2
          className="
            h-5
            w-5
            animate-spin
          "
        />

        <h3
          className="
            text-lg
            font-semibold
          "
        >

          AI Analysis In Progress

        </h3>

      </div>

      <div
        className="
          mt-6
          space-y-3
        "
      >

        <AnimatePresence>

          {analysisSteps.map(
            (
              step,
              index
            ) => (

              <motion.div

                key={`${step}-${index}`}

                initial={{
                  opacity: 0,
                  y: 10
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

                className="
                  rounded-xl
                  bg-muted/50
                  p-4
                  text-sm
                "
              >

                ✓ {step}

              </motion.div>

            )
          )}

        </AnimatePresence>

      </div>

    </div>

  );

}
