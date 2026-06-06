
"use client";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import {
  BrainCircuit
} from "lucide-react";

import {
  useDiagnosticStore
} from "@/shared/store/diagnostic-store";

export function DiagnosticEventFeed() {

  const {
    reasoning
  } = useDiagnosticStore();

  return (

    <Card
      className="
        border-0
        shadow-lg
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

          <BrainCircuit
            className="
              h-5
              w-5
            "
          />

          Live AI Reasoning

        </CardTitle>

      </CardHeader>

      <CardContent>

        <div
          className="
            space-y-3
          "
        >

          <AnimatePresence>

            {reasoning.length > 0 ? (

              reasoning.map(
                (
                  item,
                  index
                ) => (

                  <motion.div

                    key={`${item}-${index}`}

                    initial={{
                      opacity: 0,
                      x: -20,
                      scale: 0.95
                    }}

                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1
                    }}

                    exit={{
                      opacity: 0,
                      x: 20
                    }}

                    transition={{
                      duration: 0.3
                    }}

                    className="
                      rounded-xl
                      border
                      bg-muted/40
                      p-4
                      text-sm
                      backdrop-blur-sm
                    "
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
                          h-2
                          w-2
                          rounded-full
                          bg-emerald-500
                        "
                      />

                      <span>

                        {item}

                      </span>

                    </div>

                  </motion.div>

                )
              )

            ) : (

              <motion.div

                initial={{
                  opacity: 0
                }}

                animate={{
                  opacity: 1
                }}

                className="
                  rounded-xl
                  border
                  border-dashed
                  p-6
                  text-center
                  text-sm
                  text-muted-foreground
                "
              >

                AI reasoning events will appear here

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </CardContent>

    </Card>

  );

}
