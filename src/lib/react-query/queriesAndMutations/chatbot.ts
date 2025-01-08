import { getPreviousChatbotSessions, getSessionDetails } from "@/lib/api/chatbot";
import { useQuery } from "@tanstack/react-query";

export const useGetChatbotSessions = () => {
  return useQuery({
    queryKey: ["getPreviousChatbotSessions"],
    queryFn: () => getPreviousChatbotSessions(),
  });
};

export const useGetSessionDetails = (id: string | "") => {
  return useQuery({
    queryKey: ["getSessionDetails", id],
    queryFn: () => getSessionDetails(id),
    enabled: !!id,
  });
};
