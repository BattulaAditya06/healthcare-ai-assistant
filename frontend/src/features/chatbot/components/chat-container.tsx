
"use client";

import {
  useEffect,
  useRef
} from "react";

import { useChatStore } from "../store/chat-store";

import { useChat } from "../hooks/use-chat";

import { ChatMessage } from "./chat-message";

import { ChatInput } from "./chat-input";

import { ChatHeader } from "./chat-header";

export function ChatContainer() {

  const {
  messages,
  sendMessage,
  loading
} = useChat();

 

  // AUTO SCROLL REF
  const messagesEndRef =
    useRef<HTMLDivElement | null>(
      null
    );

  // AUTO SCROLL
  useEffect(() => {

    messagesEndRef.current
      ?.scrollIntoView({

        behavior: "smooth"

      });

  }, [
    messages,
    loading
  ]);

  return (

    <div
      className="
        flex
        h-screen
        flex-col
        bg-muted/30
      "
    >

      <ChatHeader />

      <div
        className="
          flex-1
          overflow-y-auto
          px-4
          py-6
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-xl
            flex-col
            gap-5
          "
        >

          {messages.map((message) => (

            <ChatMessage
  key={message.id}
  message={message}
  sendMessage={
    sendMessage
  }
/>

          ))}

          {loading && (

            <div className="flex justify-start">

              <div
                className="
                  rounded-2xl
                  border
                  bg-card
                  px-5
                  py-4
                  text-sm
                  shadow-sm
                "
              >

                AI is analyzing symptoms...

              </div>

            </div>

          )}

          {/* AUTO SCROLL TARGET */}
          <div ref={messagesEndRef} />

        </div>

      </div>

      <ChatInput />

    </div>

  );

}
