import { NEW_API_URL } from "@/constant/constant";
import { customFetch } from "./api";

export const getPreviousChatbotSessions = () => {
  return customFetch(`${NEW_API_URL}/ai_chat/sessions/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getSessionDetails = (id: string) => {
  return customFetch(`${NEW_API_URL}/ai_chat/history/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
