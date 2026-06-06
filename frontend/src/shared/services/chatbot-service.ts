
import { apiClient } from "@/shared/lib/api-client";

export const sendChatMessage =
async (
  data: {
    message: string;
  }
) => {

  const response =
    await apiClient.post(

      "/chat",

      data

    );

  return response.data;

};

export const getChatMessages =
async () => {

  const response =
    await apiClient.get(
      "/chat/messages"
    );

  return response.data;

};
