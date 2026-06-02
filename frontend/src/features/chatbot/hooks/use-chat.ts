import {
  useEffect,
  useState
} from "react";

import {
  sendChatMessage,
  getChatMessages
} from "@/shared/services/chatbot-service";

import { useChatStore }
from "../store/chat-store";

import {
  ChatResponse,
  StoredMessage,
  ChatMessageType
} from "../types/chat";

export function useChat() {

  const [loading, setLoading] =
    useState(false);

  const {

    addMessage,

    messages,

    setMessages

  } = useChatStore();

  useEffect(() => {

    const loadMessages =
      async () => {

        try {

          const response =
            await getChatMessages();

          const formattedMessages:
            ChatMessageType[] =

            response.messages.map(

              (
                message:
                  StoredMessage
              ) => ({

                id:
                  message.id,

                role:
                  message.role,

                type:
                  message.type,

                content:
                  message.content

              })

            );

          setMessages(
            formattedMessages
          );

        } catch (error) {

          console.log(error);

        }

      };

    loadMessages();

  }, [setMessages]);

  const sendMessage =
    async (
      message: string
    ) => {

      try {

        setLoading(true);

        addMessage({

          id:
            crypto.randomUUID(),

          role:
            "user",

          type:
            "text",

          content:
            message

        });

        const response:
          ChatResponse =

          await sendChatMessage({

            message

          });

        addMessage({

          id:
            crypto.randomUUID(),

          role:
            "assistant",

          type:
            "diagnosis",

          content:
            response

        });

      } catch (error) {

        console.error(error);

        addMessage({

          id:
            crypto.randomUUID(),

          role:
            "assistant",

          type:
            "text",

          content:
            "Something went wrong. Please try again."

        });

      } finally {

        setLoading(false);

      }

    };

  return {

    sendMessage,

    loading,

    messages

  };

}