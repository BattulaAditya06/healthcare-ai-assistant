"use client";

import Link from "next/link";

import {
  usePathname
} from "next/navigation";

import {

  Activity,

  History,

  Siren,

  CalendarDays,

  Stethoscope

} from "lucide-react";

// =========================
// NAVIGATION ITEMS
// =========================

const navItems = [

  {

    label:
      "New Diagnosis",

    href:
      "/chat",

    icon:
      Activity

  },

  {

    label:
      "History",

    href:
      "/history",

    icon:
      History

  },

  {

    label:
      "Emergency",

    href:
      "/emergency",

    icon:
      Siren

  },

  {

    label:
      "Appointments",

    href:
      "/appointments",

    icon:
      CalendarDays

  }

];

// =========================
// SIDEBAR
// =========================

export default function Sidebar() {

  const pathname =
    usePathname();

  return (

    <aside
      className="
        flex
        min-h-screen
        w-[280px]
        flex-col
        border-r
        border-slate-200
        bg-white
        px-6
        py-8
      "
    >

      {/* LOGO */}

      <div
        className="
          mb-14
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-black
              text-white
            "
          >

            <Stethoscope
              className="
                h-6
                w-6
              "
            />

          </div>

          <div>

            <h1
              className="
                text-4xl
                font-black
                tracking-tight
                text-slate-900
              "
            >

              MedAI

            </h1>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >

              Intelligent healthcare workspace

            </p>

          </div>

        </div>

      </div>

      {/* NAVIGATION */}

      <nav
        className="
          flex
          flex-col
          gap-4
        "
      >

        {

          navItems.map(
            (item) => {

              const isActive =

                pathname ===
                item.href;

              return (

                <Link

                  key={
                    item.label
                  }

                  href={
                    item.href
                  }

                  className={`

                    group

                    flex
                    items-center
                    gap-4

                    rounded-2xl

                    px-5
                    py-4

                    text-lg
                    font-semibold

                    transition-all
                    duration-200

                    ${
                      isActive

                        ? `

                          bg-black
                          text-white
                          shadow-lg

                        `

                        : `

                          text-slate-700

                          hover:bg-slate-100
                          hover:text-black

                        `
                    }

                  `}
                >

                  <item.icon
                    className={`

                      h-5
                      w-5

                      transition

                      ${
                        isActive

                          ? "text-white"

                          : `
                            text-slate-500

                            group-hover:text-black
                          `
                      }

                    `}
                  />

                  <span>

                    {item.label}

                  </span>

                </Link>

              );

            }

          )

        }

      </nav>

      {/* FOOTER */}

      <div
        className="
          mt-auto
          rounded-3xl
          border
          border-slate-200
          bg-slate-50
          p-5
        "
      >

        <h3
          className="
            text-lg
            font-bold
            text-slate-900
          "
        >

          AI Health Assistant

        </h3>

        <p
          className="
            mt-2
            text-sm
            leading-relaxed
            text-slate-600
          "
        >

          Analyze symptoms, book appointments,
          and receive intelligent healthcare
          recommendations instantly.

        </p>

      </div>

    </aside>

  );

}