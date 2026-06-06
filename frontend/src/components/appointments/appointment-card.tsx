
interface Props {

  doctorName: string;

  department: string;

  appointmentDate: string;

  timeSlot: string;

  status: string;

}

export function AppointmentCard({

  doctorName,

  department,

  appointmentDate,

  timeSlot,

  status

}: Props) {

  const formattedDate =
    new Date(
      appointmentDate
    ).toLocaleDateString();

  return (

    <div
      className="
        rounded-3xl
        border
        bg-background
        p-6
        shadow-sm
        transition
        hover:shadow-lg
      "
    >

      {/* TOP */}

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

            {doctorName}

          </h2>

          <p
            className="
              mt-1
              text-muted-foreground
            "
          >

            {department}

          </p>

        </div>

        <div
          className="
            rounded-full
            bg-black
            px-4
            py-2
            text-xs
            font-medium
            text-white
          "
        >

          {status}

        </div>

      </div>

      {/* DETAILS */}

      <div
        className="
          mt-8
          grid
          grid-cols-2
          gap-4
        "
      >

        <div
          className="
            rounded-2xl
            bg-muted/50
            p-4
          "
        >

          <p
            className="
              text-sm
              text-muted-foreground
            "
          >

            Appointment Date

          </p>

          <h3
            className="
              mt-2
              font-semibold
            "
          >

            {formattedDate}

          </h3>

        </div>

        <div
          className="
            rounded-2xl
            bg-muted/50
            p-4
          "
        >

          <p
            className="
              text-sm
              text-muted-foreground
            "
          >

            Time Slot

          </p>

          <h3
            className="
              mt-2
              font-semibold
            "
          >

            {timeSlot}

          </h3>

        </div>

      </div>

    </div>

  );

}
