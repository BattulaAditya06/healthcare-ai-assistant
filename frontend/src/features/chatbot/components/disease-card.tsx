
interface DiseaseCardProps {

  disease: string;

  confidence: number;

  riskLevel: string;

  department: string;

  emergencyMatch?: boolean;

}

export function DiseaseCard({

  disease,

  confidence,

  riskLevel,

  department,

  emergencyMatch

}: DiseaseCardProps) {

  // RISK COLORS
  const riskStyles = {

    low:
      "bg-green-100 text-green-700 border-green-200",

    medium:
      "bg-yellow-100 text-yellow-700 border-yellow-200",

    high:
      "bg-red-100 text-red-700 border-red-200",

  };

  // CONFIDENCE BAR COLORS
  const confidenceColor =

  confidence >= 70

    ? "bg-green-500"

    : confidence >= 40

      ? "bg-yellow-500"

      : "bg-gray-400";

  return (

    <div
      className="
        rounded-2xl
        border
        bg-card
        p-5
        shadow-sm
        transition-all
        hover:shadow-md
      "
    >

      <div className="flex items-start justify-between">

        <div>

          <h3
            className="
              text-xl
              font-semibold
            "
          >

            {disease}

          </h3>

          <p
            className="
              mt-1
              text-sm
              text-muted-foreground
            "
          >

            {department}

          </p>

        </div>

        {emergencyMatch && (

          <span
            className="
              rounded-full
              bg-red-500
              px-3
              py-1
              text-xs
              font-medium
              text-white
            "
          >

            Emergency

          </span>

        )}

      </div>

      <div className="mt-4 space-y-3">

        {/* CONFIDENCE */}
        <div>

          <div
            className="
              mb-2
              flex
              items-center
              justify-between
              text-sm
            "
          >

            <span className="font-medium">

              Confidence

            </span>

            <span>

              {confidence}%

            </span>

          </div>

          <div
            className="
              h-1
              rounded-full
              bg-muted
            "
          >

            <div
              className={`
                h-1.5
                rounded-full
                transition-all
                ${confidenceColor}
              `}
              style={{
                width:
                  `${confidence}%`
              }}
            />

          </div>

        </div>

        {/* RISK LEVEL */}
        <div
          className="
            flex
            items-center
            justify-between
            text-sm
          "
        >

          <span className="font-medium">

            Risk Level

          </span>

          <span
            className={`
              rounded-full
              border
              px-3
              py-1
              text-xs
              font-medium

              ${
                riskStyles[
                  riskLevel as keyof typeof riskStyles
                ]
              }
            `}
          >

            {riskLevel}

          </span>

        </div>

      </div>

    </div>

  );

}
