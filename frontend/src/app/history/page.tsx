"use client";

import {

  Activity,
  CalendarDays,
  Clock3,
  Stethoscope

} from "lucide-react";

import {
  useHistoryStore
} from "@/features/history/store/history-store";

import {

  motion

} from "framer-motion";



export default function HistoryPage() {

const history =
  useHistoryStore(
    (state) =>
      state.history
  );

  return (

    <main
      className="
        min-h-screen
        bg-slate-50
        p-8
      "
    >

      {/* HEADER */}

      <div
        className="
          mb-10
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h1
            className="
              text-5xl
              font-black
              text-slate-900
            "
          >

            Diagnosis History

          </h1>

          <p
            className="
              mt-3
              text-lg
              text-slate-600
            "
          >

            Track previous AI health analyses.

          </p>

        </div>

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            bg-white
            px-5
            py-4
            shadow-sm
          "
        >

          <div
            className="
              rounded-xl
              bg-black
              p-3
              text-white
            "
          >

            <Activity
              className="
                h-5
                w-5
              "
            />

          </div>

          <div>

            <p
              className="
                text-sm
                text-slate-500
              "
            >

              Total Diagnoses

            </p>

            <h3
              className="
                text-3xl
                font-bold
              "
            >

              {history.length}

            </h3>

          </div>

        </div>

      </div>

      {/* HISTORY LIST */}

      <div
        className="
          grid
          gap-6
        "
      >

        {

          history.map(
            (item) => (

              <motion.div

                key={item.id}

                whileHover={{
                  y: -4
                }}

                className="
                  rounded-3xl
                  border
                  bg-white
                  p-6
                  shadow-sm
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    gap-5
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                  "
                >

                  <div>

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
                          bg-black
                          p-3
                          text-white
                        "
                      >

                        <Stethoscope
                          className="
                            h-5
                            w-5
                          "
                        />

                      </div>

                      <div>

                        <h2
                          className="
                            text-2xl
                            font-bold
                            text-slate-900
                          "
                        >

                          {item.disease}

                        </h2>

                        <p
                          className="
                            text-sm
                            text-slate-500
                          "
                        >

                          AI Diagnosis Result

                        </p>

                      </div>

                    </div>

                    <div
                      className="
                        mt-5
                        flex
                        flex-wrap
                        gap-2
                      "
                    >

                      {

                        item.symptoms.map(
                          (symptom) => (

                            <span

                              key={symptom}

                              className="
                                rounded-full
                                bg-slate-100
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-slate-700
                              "
                            >

                              {symptom}

                            </span>

                          )
                        )

                      }

                    </div>

                  </div>

                  <div
                    className="
                      flex
                      gap-4
                    "
                  >

                    <div
                      className="
                        rounded-2xl
                        bg-slate-100
                        px-5
                        py-4
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <CalendarDays
                          className="
                            h-4
                            w-4
                          "
                        />

                        <span
                          className="
                            text-sm
                            font-medium
                          "
                        >

                          {item.date}

                        </span>

                      </div>

                    </div>

                    <div
                      className="
                        rounded-2xl
                        bg-black
                        px-5
                        py-4
                        text-white
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <Clock3
                          className="
                            h-4
                            w-4
                          "
                        />

                        <span
                          className="
                            text-sm
                            font-medium
                            capitalize
                          "
                        >

                          {item.riskLevel} Risk

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </motion.div>

            )
          )

        }

      </div>

    </main>

  );

}