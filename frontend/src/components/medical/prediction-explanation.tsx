"use client";

import {

  Card,

  CardContent,

  CardHeader,

  CardTitle

} from "@/components/ui/card";

type Props = {

  breakdown: {

    primaryMatches: number;

    secondaryMatches: number;

    signatureMatches: number;

    emergencyMatches: number;

    coverageRatio?: number;

    reliability?: number;

  };

};

export function PredictionExplanation({

  breakdown

}: Props) {

  return (

    <Card
      className="
        border
        bg-muted/30
      "
    >

      <CardHeader>

        <CardTitle
          className="
            text-sm
          "
        >

          AI Prediction Explanation

        </CardTitle>

      </CardHeader>

      <CardContent
        className="
          space-y-3
          text-sm
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
            Primary Matches
          </span>

          <span
            className="
              font-medium
            "
          >

            {
              breakdown.primaryMatches
            }

          </span>

        </div>

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <span>
            Secondary Matches
          </span>

          <span
            className="
              font-medium
            "
          >

            {
              breakdown.secondaryMatches
            }

          </span>

        </div>

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <span>
            Signature Matches
          </span>

          <span
            className="
              font-medium
            "
          >

            {
              breakdown.signatureMatches
            }

          </span>

        </div>

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <span>
            Emergency Matches
          </span>

          <span
            className="
              font-medium
            "
          >

            {
              breakdown.emergencyMatches
            }

          </span>

        </div>

        {

          breakdown.coverageRatio !==
          undefined && (

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <span>
                Coverage Ratio
              </span>

              <span
                className="
                  font-medium
                "
              >

                {

                  (
                    breakdown.coverageRatio * 100
                  ).toFixed(0)

                }%

              </span>

            </div>

          )

        }

        {

          breakdown.reliability !==
          undefined && (

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <span>
                Reliability
              </span>

              <span
                className="
                  font-medium
                "
              >

                {

                  (
                    breakdown.reliability * 100
                  ).toFixed(0)

                }%

              </span>

            </div>

          )

        }

      </CardContent>

    </Card>

  );

}