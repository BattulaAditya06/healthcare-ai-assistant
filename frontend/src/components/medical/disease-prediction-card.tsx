
"use client";

import { useState }
from "react";

import {

  PredictionExplanation

} from "./prediction-explanation";

import {

  AppointmentModal

} from "@/components/appointments/appointment-modal";

import {

  Card,
  CardContent

} from "@/components/ui/card";

import {

  Badge

} from "@/components/ui/badge";

interface Props {

  disease: string;

  confidence: number;

  riskLevel: string;

  department: string;

  recommendations?: string[];

  scoreBreakdown?: {

    primaryMatches: number;

    secondaryMatches: number;

    signatureMatches: number;

    emergencyMatches: number;

    missingPrimary: number;

    missingSignature: number;

    reliability: number;

  };

}

export function DiseasePredictionCard({

  disease,

  confidence,

  riskLevel,

  department,

  recommendations = [],

  scoreBreakdown

}: Props) {

  const [

    open,

    setOpen

  ] = useState(false);

  // =========================
  // RISK COLOR
  // =========================

  const riskColor =

    riskLevel === "high"

      ? "bg-red-500"

      : riskLevel === "medium"

      ? "bg-yellow-500"

      : "bg-green-500";

  return (

    <>

      <Card
        className="
          border-0
          shadow-lg
        "
      >

        <CardContent
          className="
            space-y-6
            p-6
          "
        >

          {/* HEADER */}

          <div
            className="
              flex
              items-start
              justify-between
            "
          >

            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >

                {disease}

              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-muted-foreground
                "
              >

                Recommended Department:
                {" "}
                {department}

              </p>

            </div>

            <Badge
              className={riskColor}
            >

              {riskLevel}

            </Badge>

          </div>

          {/* CONFIDENCE */}

          <div
            className="
              space-y-2
            "
          >

            <div
              className="
                flex
                justify-between
                text-sm
                font-medium
              "
            >

              <span>

                Confidence

              </span>

              <span>

                {

                  confidence.toFixed(
                    1
                  )

                }%

              </span>

            </div>

            <div
              className="
                h-3
                overflow-hidden
                rounded-full
                bg-muted
              "
            >

              <div
                className="
                  h-full
                  rounded-full
                  bg-black
                  transition-all
                "
                style={{

                  width:
                    `${confidence}%`

                }}
              />

            </div>

          </div>

          {/* RECOMMENDATIONS */}

          {

            recommendations.length > 0 && (

              <div
                className="
                  space-y-3
                "
              >

                <h3
                  className="
                    text-sm
                    font-semibold
                  "
                >

                  Recommendations

                </h3>

                <ul
                  className="
                    list-disc
                    space-y-2
                    pl-5
                    text-sm
                    text-muted-foreground
                  "
                >

                  {

                    recommendations.map(

                      (
                        item
                      ) => (

                        <li
                          key={item}
                        >

                          {item}

                        </li>

                      )

                    )

                  }

                </ul>

              </div>

            )

          }

          {/* EXPLAINABLE AI */}

          {

            scoreBreakdown && (

              <PredictionExplanation

                breakdown={
                  scoreBreakdown
                }

              />

            )

          }

          {/* BOOK BUTTON */}

          <button

            onClick={() =>
              setOpen(true)
            }

            className="
              w-full
              rounded-xl
              bg-black
              px-4
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:opacity-90
            "
          >

            Book Appointment

          </button>

        </CardContent>

      </Card>

      {/* APPOINTMENT MODAL */}

      <AppointmentModal

        open={open}

        onClose={() =>
          setOpen(false)
        }

        department={department}

      />

    </>

  );

}
