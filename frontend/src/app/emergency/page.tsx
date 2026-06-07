"use client";

import {

  AlertTriangle,

  Phone,

  Activity,

  ShieldAlert

} from "lucide-react";

import {

  useEmergencyStore

} from "@/features/emergency/store/emergency-store";

export default function EmergencyPage() {

  const {

    isEmergency,

    severity,

    matchedSymptoms

  } = useEmergencyStore();

  return (

    <main
      className="
        min-h-screen
        bg-red-50
        p-8
      "
    >

      {/* HEADER */}

      <div
        className="
          rounded-3xl
          border
          border-red-200
          bg-white
          p-8
          shadow-sm
        "
      >

        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          <div
            className="
              rounded-2xl
              bg-red-600
              p-4
              text-white
            "
          >

            <ShieldAlert
              className="
                h-8
                w-8
              "
            />

          </div>

          <div>

            <h1
              className="
                text-4xl
                font-black
                text-red-700
              "
            >

              Emergency Alert

            </h1>

            <p
              className="
                mt-2
                text-gray-600
              "
            >

              Critical symptoms detected by AI analysis.

            </p>

          </div>

        </div>

      </div>

      {/* STATUS */}

      <div
        className="
          mt-8
          grid
          gap-5
          md:grid-cols-3
        "
      >

        <div
          className="
            rounded-3xl
            bg-white
            p-6
            shadow-sm
          "
        >

          <p
            className="
              text-sm
              text-gray-500
            "
          >

            Emergency Status

          </p>

          <h2
            className="
              mt-2
              text-3xl
              font-black
              text-red-600
            "
          >

            {

              isEmergency

                ? "ACTIVE"

                : "SAFE"

            }

          </h2>

        </div>

        <div
          className="
            rounded-3xl
            bg-white
            p-6
            shadow-sm
          "
        >

          <p
            className="
              text-sm
              text-gray-500
            "
          >

            Severity

          </p>

          <h2
            className="
              mt-2
              text-3xl
              font-black
            "
          >

            {severity}

          </h2>

        </div>

        <div
          className="
            rounded-3xl
            bg-white
            p-6
            shadow-sm
          "
        >

          <p
            className="
              text-sm
              text-gray-500
            "
          >

            Matched Symptoms

          </p>

          <h2
            className="
              mt-2
              text-3xl
              font-black
            "
          >

            {

              matchedSymptoms.length

            }

          </h2>

        </div>

      </div>

      {/* SYMPTOMS */}

      <div
        className="
          mt-8
          rounded-3xl
          bg-white
          p-8
          shadow-sm
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <AlertTriangle
            className="
              h-6
              w-6
              text-red-600
            "
          />

          <h2
            className="
              text-2xl
              font-bold
            "
          >

            Critical Symptoms

          </h2>

        </div>

        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-3
          "
        >

          {

            matchedSymptoms.map(
              (symptom) => (

                <div

                  key={symptom}

                  className="
                    rounded-full
                    bg-red-100
                    px-5
                    py-3
                    font-medium
                    text-red-700
                  "
                >

                  {symptom}

                </div>

              )
            )

          }

        </div>

      </div>

      {/* ACTIONS */}

      <div
        className="
          mt-8
          grid
          gap-5
          md:grid-cols-2
        "
      >

        <button
          className="
            flex
            items-center
            justify-center
            gap-3
            rounded-3xl
            bg-red-600
            p-6
            text-lg
            font-bold
            text-white
          "
        >

          <Phone
            className="
              h-6
              w-6
            "
          />

          Call Emergency Services

        </button>

        <button
          className="
            flex
            items-center
            justify-center
            gap-3
            rounded-3xl
            bg-black
            p-6
            text-lg
            font-bold
            text-white
          "
        >

          <Activity
            className="
              h-6
              w-6
            "
          />

          Find Emergency Doctor

        </button>

      </div>

    </main>

  );

}