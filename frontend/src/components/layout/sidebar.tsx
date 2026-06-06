
export function Sidebar() {

  return (

    <aside
      className="
        w-72
        border-r
        bg-card
        p-6
      "
    >

      <div
        className="
          flex
          flex-col
          gap-8
        "
      >

        <div>

          <h1
            className="
              text-3xl
              font-bold
            "
          >

            MedAI

          </h1>

          <p
            className="
              mt-2
              text-sm
              text-muted-foreground
            "
          >

            Intelligent healthcare workspace

          </p>

        </div>

        <nav
          className="
            flex
            flex-col
            gap-3
          "
        >

          <button
            className="
              rounded-xl
              bg-primary
              px-4
              py-3
              text-left
              text-primary-foreground
            "
          >

            New Diagnosis

          </button>

          <button
            className="
              rounded-xl
              px-4
              py-3
              text-left
              hover:bg-muted
            "
          >

            History

          </button>

          <button
            className="
              rounded-xl
              px-4
              py-3
              text-left
              hover:bg-muted
            "
          >

            Emergency

          </button>

          <button
            className="
              rounded-xl
              px-4
              py-3
              text-left
              hover:bg-muted
            "
          >

            Appointments

          </button>

        </nav>

      </div>

    </aside>

  );

}
