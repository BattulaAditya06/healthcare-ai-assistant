
"use client";

import {
  motion
} from "framer-motion";

import {
  useDiagnosticStore
} from "@/shared/store/diagnostic-store";

const bodyParts = [

  {
    id: "headache",
    label: "Head",
    top: "8%",
    left: "42%"
  },

  {
    id: "chest pain",
    label: "Chest",
    top: "30%",
    left: "40%"
  },

  {
    id: "abdominal pain",
    label: "Abdomen",
    top: "45%",
    left: "41%"
  },

  {
    id: "joint pain",
    label: "Knees",
    top: "72%",
    left: "41%"
  }

];

export function BodySymptomMap() {

  const {

    symptoms,

    addSymptom,

    removeSymptom

  } = useDiagnosticStore();

 const toggleSymptom =
  (symptom: string) => {

    if (

      symptoms.includes(
        symptom
      )

    ) {

      removeSymptom(
        symptom
      );

    } else {

      addSymptom(
        symptom
      );

    }

  };

  return (

    <div
      className="
        rounded-3xl
        border
        bg-card
        p-8
        shadow-xl
      "
    >

      <div
        className="
          mb-6
        "
      >

        <h2
          className="
            text-2xl
            font-bold
          "
        >

          Symptom Localization

        </h2>

        <p
          className="
            mt-2
            text-sm
            text-muted-foreground
          "
        >

          Select affected body regions

        </p>

      </div>

      <div
        className="
          relative
          mx-auto
          h-[700px]
          w-[320px]
          rounded-[160px]
          bg-gradient-to-b
          from-slate-200
          to-slate-300
        "
      >

        {bodyParts.map(
          (part) => {

            const active =
              symptoms.includes(
                part.id
              );

            return (

              <motion.button

                key={part.id}

                whileHover={{
                  scale: 1.1
                }}

                whileTap={{
                  scale: 0.95
                }}

                onClick={() =>
                  toggleSymptom(
                    part.id
                  )
                }

                className={`
                  absolute
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-medium
                  shadow-lg
                  transition-all

                  ${
                    active

                      ? "bg-red-500 text-white"

                      : "bg-white"
                  }
                `}

                style={{

                  top: part.top,

                  left: part.left

                }}

              >

                {part.label}

              </motion.button>

            );

          }
        )}

      </div>

    </div>

  );

}