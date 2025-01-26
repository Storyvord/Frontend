import { getRequirements, getSuggestions, startAiWork } from "@/lib/api/aiSuggestions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const regenerate = [
  "logistics",
  "crew",
  "budget",
  "compliance",
  "culture",
  "sustainability",
  "suppliers",
] as const;

export type ReportName = (typeof regenerate)[number];

export const useGetSuggestions = (project_id: string, report: ReportName) => {
  const [loading, setLoading] = useState(true); // Initially set to true to handle loading state
  const [reportValue, setReportValue] = useState(null);

  // Utility function to check if a field is empty (null or {})
  const isFieldEmpty = (field: any) => {
    return field === null || (typeof field === "object" && Object.keys(field).length === 0);
  };

  const fetchSuggestions = async () => {
    const response = await getSuggestions(project_id);
    const data = response?.[0]; // API returns an array
    if (!data) throw new Error("No data found.");

    const reportField = Object.keys(data).find((key) => key.includes(report));
    const newReportValue = reportField ? data[reportField] : null;

    setReportValue(newReportValue);
    return data;
  };

  const query = useQuery({
    queryKey: ["getSuggestions", project_id, report],
    queryFn: fetchSuggestions,
    enabled: !!project_id, // Fetch only if project_id is available
    refetchInterval: () => {
      // Continue polling if the field is empty
      if (isFieldEmpty(reportValue)) return 15000; // Poll every 15 seconds
      return false; // Stop polling if data is available
    },
    retry: false, // Disable retry since error handling is manual
    staleTime: 300000,
  });

  useEffect(() => {
    if (query.isSuccess) {
      const data = query.data;
      const reportField = Object.keys(data || {}).find((key) => key.includes(report));
      const fieldValue = reportField ? data[reportField] : null;

      setReportValue(fieldValue);

      if (isFieldEmpty(fieldValue)) {
        setLoading(true); // Continue loading if field is empty
      } else {
        setLoading(false); // Stop loading if field is filled
      }
    }

    if (query.isError) {
      setLoading(false); // Stop loading on error
    }

    if (query.isFetching) {
      setLoading(true); // Show loading while fetching
    }
  }, [query.data, query.isSuccess, query.isError, query.isFetching, report]);

  return {
    ...query,
    data: reportValue,
    isPending: loading,
  };
};

export const useStartAIWork = (projectId: string) => {
  return useQuery({
    queryKey: ["startAiWork", projectId],
    queryFn: () => startAiWork(projectId),
  });
};

export const useGetRequirements = (reqId: string) => {
  return useQuery({
    queryKey: ["getRequirements", reqId],
    queryFn: () => getRequirements(reqId),
    // The query will not execute until the reqId exists
    enabled: !!reqId,
    retry: false, // Disable retry since error handling is manual
    staleTime: 60000, // 2 minutes (data stays fresh for this duration)
  });
};
