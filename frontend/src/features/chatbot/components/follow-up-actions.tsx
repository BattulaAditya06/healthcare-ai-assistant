interface FollowUpActionsProps {

  question: string;

}

export function FollowUpActions({

  question

}: FollowUpActionsProps) {

  return (

    <div
      className="
        rounded-xl
        border
        bg-muted/30
        p-4
      "
    >

      <p
        className="
          text-sm
        "
      >
        {question}
      </p>

    </div>

  );

}