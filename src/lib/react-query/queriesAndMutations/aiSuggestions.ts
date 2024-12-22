import { getRequirements, getSuggestions } from "@/lib/api/aiSuggestions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetSuggestions = (project_id: string) => {
  return useQuery({
    queryKey: ["getSuggestions", project_id],
    queryFn: () => getSuggestions(project_id),
  });
};

export const useGetRequirements = (reqId: string) => {
  return useQuery({
    queryKey: ["getRequirements", reqId],
    queryFn: () => getRequirements(reqId),
    // The query will not execute until the reqId exists
    enabled: !!reqId,
  });
};
