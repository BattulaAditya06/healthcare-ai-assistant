import {
  useState
} from "react";

interface FollowUpActionsProps {

  question: string;

  sendMessage:
    (
      message: string
    ) => Promise<void>;

}

export function FollowUpActions({

  question,

  sendMessage

}: FollowUpActionsProps) {

  const [
    answered,
    setAnswered
  ] = useState(false);

  const handleAnswer =
    async (
      answer: "yes" | "no"
    ) => {

      if (answered) {

        return;

      }

      setAnswered(true);

      await sendMessage(
        answer
      );

    };

  return (

    <div
      className="
        rounded-2xl
        border
        p-5
      "
    >

      <p
        className="
          mb-4
          text-lg
        "
      >

        {question}

      </p>

      <div className="flex gap-3">

        <button

          disabled={answered}

          onClick={() =>
            handleAnswer(
              "yes"
            )
          }

          className="
            rounded-xl
            bg-black
            px-5
            py-2
            text-white
            disabled:opacity-50
          "
        >

          Yes

        </button>

        <button

          disabled={answered}

          onClick={() =>
            handleAnswer(
              "no"
            )
          }

          className="
            rounded-xl
            border
            px-5
            py-2
            disabled:opacity-50
          "
        >

          No

        </button>

      </div>

    </div>

  );

}