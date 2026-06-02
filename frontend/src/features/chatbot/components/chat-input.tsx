
"use client";

import { useState } from "react";

import { useChat } from "../hooks/use-chat";

export function ChatInput() {

  const [message, setMessage] =
    useState("");

  const {
    sendMessage,
    loading
  } = useChat();

  const handleSendMessage =
    async () => {

      if (!message.trim()) {
        return;
      }

      await sendMessage(
        message
      );

      setMessage("");
    };

  const handleKeyDown =
    async (
      e: React.KeyboardEvent<
        HTMLTextAreaElement
      >
    ) => {

      // ENTER SENDS
      if (
        e.key === "Enter" &&
        !e.shiftKey
      ) {

        e.preventDefault();

        await handleSendMessage();

      }

      // SHIFT + ENTER = NEW LINE
    };

  return (

    <div
      className="
        border-t
        bg-background
        p-4
      "
    >

      <div
        className="
          mx-auto
          flex
          max-w-4xl
          gap-3
        "
      >

        <textarea

          value={message}

          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }

          onKeyDown={
            handleKeyDown
          }

          rows={1}

          placeholder="
Describe your symptoms...
(Enter to send • Shift+Enter for new line)
"

          className="
            min-h-[52px]
            flex-1
            resize-none
            rounded-xl
            border
            bg-background
            px-4
            py-3
            outline-none
          "
        />

        <button

          onClick={
            handleSendMessage
          }

          disabled={loading}

          className="
            rounded-xl
            bg-primary
            px-5
            py-3
            text-primary-foreground
          "
        >

          {loading
            ? "..."
            : "Send"}

        </button>

      </div>

    </div>

  );

}
