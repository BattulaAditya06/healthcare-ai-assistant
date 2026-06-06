
"use client";

import {
  useState
} from "react";

import {
  motion
} from "framer-motion";

import {
  Send,
  Sparkles
} from "lucide-react";

import {
  Textarea
} from "@/components/ui/textarea";

import {
  Button
} from "@/components/ui/button";

interface Props {

  onSend:
    (
      message: string
    ) => Promise<void>;

  loading: boolean;

}

export function MedicalInputBar({

  onSend,

  loading

}: Props) {

  const [message, setMessage] =
    useState("");

  const handleSend =
    async () => {

      if (
        !message.trim()
      ) {

        return;

      }

      await onSend(
        message
      );

      setMessage("");

    };

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      className="
        sticky
        bottom-0
        rounded-3xl
        border
        bg-background/95
        p-4
        shadow-2xl
        backdrop-blur-xl
      "
    >

      <div
        className="
          flex
          items-end
          gap-4
        "
      >

        <div
          className="
            relative
            flex-1
          "
        >

          <Sparkles
            className="
              absolute
              left-4
              top-4
              h-5
              w-5
              text-muted-foreground
            "
          />

          <Textarea

            value={message}

            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }

            placeholder="
              Describe symptoms, pain areas,
              severity, duration...
            "

            className="
              min-h-[80px]
              rounded-2xl
              pl-12
              pr-4
              pt-4
              text-base
            "

            onKeyDown={async (
              e
            ) => {

              if (

                e.key === "Enter" &&

                !e.shiftKey

              ) {

                e.preventDefault();

                await handleSend();

              }

            }}

          />

        </div>

        <Button

          onClick={handleSend}

          disabled={loading}

          size="lg"

          className="
            h-14
            rounded-2xl
            px-6
          "
        >

          <Send
            className="
              h-5
              w-5
            "
          />

        </Button>

      </div>

    </motion.div>

  );

}
