import { getPreviousChatbotSessions, getSessionDetails } from "@/lib/api/chatbot";
import { useQuery } from "@tanstack/react-query";

export const useGetChatbotSessions = () => {
  return useQuery({
    queryKey: ["getPreviousChatbotSessions"],
    queryFn: () => getPreviousChatbotSessions(),
  });
};

export const useGetSessionDetails = (id: Number) => {
  return useQuery({
    queryKey: ["getSessionDetails"],
    queryFn: () => getSessionDetails(id),
    enabled: id !== 0,
  });
};
