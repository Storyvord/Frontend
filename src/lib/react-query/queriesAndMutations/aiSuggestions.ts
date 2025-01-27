import {
  getAiWorkStatus,
  getRequirements,
  getSuggestions,
  startAiWork,
} from "@/lib/api/aiSuggestions";
import { useQuery, useMutation } from "@tanstack/react-query";

const status = ["pending", "success"] as const;

export type Status = (typeof status)[number];

export const useGetSuggestions = (projectId: string, status: Status) => {
  return useQuery({
    queryKey: ["getSuggestions", projectId, status],
    queryFn: () => getSuggestions(projectId),
    enabled: !!projectId, // Fetch only if projectId is available
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minutes (data stays fresh for this duration)
  });
};

export const useStartAIWork = () => {
  return useMutation({
    mutationFn: startAiWork,
    onSuccess: (data) => {
      return data;
    },
  });
};

export const useGetAiWorkStatus = (taskId: string) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["taskStatus", taskId],
    queryFn: () => getAiWorkStatus(taskId),
    refetchInterval: (data) => (data?.state?.data?.status === "pending" ? 30000 : false), // Poll every 30s if "pending"
    enabled: !!taskId,
  });

  // Compute loading status based on the task status
  const isLoading = data?.status === "pending";

  return {
    data,
    isError,
    isPending: isLoading || isFetching,
  };
};

export const useGetRequirements = (reqId: string) => {
  return useQuery({
    queryKey: ["getRequirements", reqId],
    queryFn: () => getRequirements(reqId),
    enabled: !!reqId,
    retry: false, // Disable retry since error handling is manual
    staleTime: 60000, // 1 minutes (data stays fresh for this duration)
  });
};
