
interface Props {

  breakdown: {

    primaryMatches: number;

    secondaryMatches: number;

    signatureMatches: number;

    emergencyMatches: number;

    missingPrimary: number;

    missingSignature: number;

    reliability: number;

  };

}

export function PredictionExplanation({

  breakdown

}: Props) {

  return (

    <div
      className="
        rounded-2xl
        border
        bg-muted/30
        p-4
      "
    >

      <h3
        className="
          text-sm
          font-semibold
        "
      >

        AI Reasoning

      </h3>

      <div
        className="
          mt-4
          space-y-2
          text-sm
        "
      >

        <p>

          ✓ Primary Matches:
          {" "}
          {breakdown.primaryMatches}

        </p>

        <p>

          ✓ Secondary Matches:
          {" "}
          {breakdown.secondaryMatches}

        </p>

        <p>

          ✓ Signature Matches:
          {" "}
          {breakdown.signatureMatches}

        </p>

        <p>

          ✓ Emergency Matches:
          {" "}
          {breakdown.emergencyMatches}

        </p>

        <p>

          ✗ Missing Primary:
          {" "}
          {breakdown.missingPrimary}

        </p>

        <p>

          ✗ Missing Signature:
          {" "}
          {breakdown.missingSignature}

        </p>

        <p>

          Reliability:
          {" "}
          {breakdown.reliability}

        </p>

      </div>

    </div>

  );

}
