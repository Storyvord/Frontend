import {
  getAiWorkStatus,
  getRequirements,
  getSuggestions,
  startAiWork,
} from "@/lib/api/aiSuggestions";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const status = ["pending", "success"] as const;

export type Status = (typeof status)[number];

export const useGetSuggestions = (projectId: string, status: Status) => {
  return useQuery({
    queryKey: ["getSuggestions", projectId, status],
    queryFn: () => getSuggestions(projectId),
    enabled: !!projectId, // Fetch only if projectId is available
    refetchOnWindowFocus: false,
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
  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["taskStatus", taskId],
    queryFn: () => getAiWorkStatus(taskId),
    refetchInterval: (data) => (data?.state?.data?.status === "pending" ? 30000 : false), // Poll every 30s if "pending"
    enabled: !!taskId,
  });

  // Ensure refetching continues if the taskId changes or the component is remounted
  useEffect(() => {
    if (taskId) {
      refetch();
    }
  }, [taskId, refetch]);

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
    refetchOnWindowFocus: false,
  });
};
