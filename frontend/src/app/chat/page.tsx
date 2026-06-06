
"use client";

import {
  AppShell
} from "@/components/layout/app-shell";

import {
  DiagnosticWorkspace
} from "@/components/dashboard/diagnostic-workspace";

import {
  MedicalInputBar
} from "@/components/chat/medical-input-bar";

import {
  useChat
} from "@/features/chatbot/hooks/use-chat";

export default function ChatPage() {

  const {

    sendMessage,

    loading

  } = useChat();

  return (

    <AppShell>

      <div
        className="
          flex
          min-h-screen
          flex-col
          gap-6
        "
      >

        <div
          className="
            flex-1
          "
        >

          <DiagnosticWorkspace />

        </div>

        <MedicalInputBar

          onSend={
            sendMessage
          }

          loading={
            loading
          }

        />

      </div>

    </AppShell>

  );

}
