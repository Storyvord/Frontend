import { getRequirements, getSuggestions } from "@/lib/api/aiSuggestions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useGetSuggestions = (project_id: string) => {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const fetchSuggestions = async () => {
    const response = await getSuggestions(project_id);
    if (response.status === 202) {
      setTaskId(response.task_id);
      throw new Error("Processing not completed yet.");
    } else if (response.status === 200) {
      setIsFetching(false);
      return response.data;
    } else {
      throw new Error("Unexpected API response.");
    }
  };

  const query = useQuery({
    queryKey: ["getSuggestions", project_id],
    queryFn: fetchSuggestions,
    enabled: !!project_id, // Ensure query runs only if project_id is provided
    refetchInterval: isFetching ? 20000 : false,
    retry: false, // Prevent react-query from retrying immediately on errors
  });

  useEffect(() => {
    if (!isFetching) {
      query.refetch(); // Stop polling when fetching is complete
    }
  }, [isFetching, query]);

  return {
    ...query,
    taskId,
    isPending: isFetching,
  };
};

export const useGetRequirements = (reqId: string) => {
  return useQuery({
    queryKey: ["getRequirements", reqId],
    queryFn: () => getRequirements(reqId),
    // The query will not execute until the reqId exists
    enabled: !!reqId,
    staleTime: 60000, // 2 minutes (data stays fresh for this duration)
  });
};
