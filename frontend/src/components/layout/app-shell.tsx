
"use client";

import { ReactNode } from "react";

import {
  Sidebar
} from "./sidebar";

import {
  Topbar
} from "./topbar";

import {
  AIHealthPanel
} from "@/components/ai/ai-health-panel";

interface Props {

  children:
    ReactNode;

}

export function AppShell({

  children

}: Props) {

  return (

    <div
      className="
        flex
        h-screen
        overflow-hidden
        bg-background
      "
    >

      {/* LEFT SIDEBAR */}

      <aside
        className="
          w-[280px]
          border-r
          overflow-y-auto
          bg-background
        "
      >

        <Sidebar />

      </aside>

      {/* MAIN SECTION */}

      <div
        className="
          flex
          flex-1
          flex-col
          overflow-hidden
        "
      >

        {/* TOPBAR */}

        <Topbar />

        {/* CONTENT */}

        <main
          className="
            flex-1
            overflow-y-auto
            p-6
          "
        >

          {children}

        </main>

      </div>

      {/* RIGHT AI PANEL */}

      <aside
        className="
          w-[380px]
          border-l
          overflow-y-auto
          bg-background
        "
      >

        <AIHealthPanel />

      </aside>

    </div>

  );

}
