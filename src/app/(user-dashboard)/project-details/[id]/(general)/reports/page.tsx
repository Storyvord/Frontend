"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { useGetProjectRequirements } from "@/lib/react-query/queriesAndMutations/project";
import {
  useGetAiWorkStatus,
  useGetRequirements,
  useGetSuggestions,
  useStartAIWork,
} from "@/lib/react-query/queriesAndMutations/aiSuggestions";
import { formatError } from "@/lib/utils";
import CrewPage from "@/components/report/CrewPage";
import ReportDetails from "@/components/report/ReportDetails";
import SuppliersPage from "@/components/report/SuppliersPage";
import Tabs from "@/components/Tabs";

const tabs = [
  "Crew",
  "Suppliers",
  "Logistics",
  "Compliance",
  "Culture",
  "Budget",
  "Sustainability",
];

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("Crew");
  const [aiWorkStatus, setAiWorkStatus] = useState<"pending" | "success">("pending");
  const [taskId, setTaskId] = useState<string | null>(
    () => localStorage.getItem("taskId") // Load from localStorage on mount
  );

  const searchParams = useSearchParams();
  const task_Id = searchParams.get("taskId"); // after create a new project, taskId added to query params
  const { toast } = useToast();
  const { id: projectId }: { id: string } = useParams();

  const {
    data,
    isPending: isPendingAiStatus,
    isError: isErrorAiStatus,
  } = useGetAiWorkStatus(taskId!);

  const {
    data: allAiReports,
    isPending,
    isError,
    refetch,
  } = useGetSuggestions(projectId, aiWorkStatus);

  const { mutateAsync: regenerateAiWork } = useStartAIWork();

  // Save taskId to localStorage when it changes
  useEffect(() => {
    if (task_Id) {
      setTaskId(task_Id);
      localStorage.setItem("taskId", task_Id);
    }
  }, [task_Id]);

  useEffect(() => {
    if (data?.status) setAiWorkStatus(data?.status);
    if (data?.status === "success") localStorage.removeItem("taskId");
  }, [data]);
  console.log(aiWorkStatus);
  const handleRegenerateAiWork = async (reportName: string) => {
    try {
      const res = await regenerateAiWork({ projectId, reportName });

      if (res?.task_id) {
        setTaskId(res?.task_id);
        localStorage.setItem("taskId", res?.task_id); // Update localStorage
      }
    } catch (error) {
      const { title, description } = formatError(error);
      toast({
        title,
        description,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      {activeTab === "Crew" && (
        <CrewPage
          report={allAiReports?.data.suggested_crew}
          isPending={isPending || isPendingAiStatus}
          isError={isError || isErrorAiStatus}
          handleRegenerateAiWork={handleRegenerateAiWork}
        />
      )}
      {activeTab === "Suppliers" && (
        <SuppliersPage
          report={allAiReports?.data.suggested_suppliers}
          isPending={isPending || isPendingAiStatus}
          isError={isError || isErrorAiStatus}
          handleRegenerateAiWork={handleRegenerateAiWork}
        />
      )}
      {activeTab === "Logistics" && (
        <ReportDetails
          report={allAiReports?.data.suggested_logistics}
          isPending={isPending || isPendingAiStatus}
          isError={isError || isErrorAiStatus}
          refetch={refetch}
          handleRegenerateAiWork={handleRegenerateAiWork}
          name="logistics"
        />
      )}
      {activeTab === "Compliance" && (
        <ReportDetails
          report={allAiReports?.data.suggested_compliance}
          isPending={isPending || isPendingAiStatus}
          isError={isError || isErrorAiStatus}
          refetch={refetch}
          handleRegenerateAiWork={handleRegenerateAiWork}
          name="compliance"
        />
      )}
      {activeTab === "Culture" && (
        <ReportDetails
          report={allAiReports?.data.suggested_culture}
          isPending={isPending || isPendingAiStatus}
          isError={isError || isErrorAiStatus}
          refetch={refetch}
          handleRegenerateAiWork={handleRegenerateAiWork}
          name="culture"
        />
      )}
      {activeTab === "Budget" && (
        <ReportDetails
          report={allAiReports?.data.suggested_budget}
          isPending={isPending || isPendingAiStatus}
          isError={isError || isErrorAiStatus}
          refetch={refetch}
          handleRegenerateAiWork={handleRegenerateAiWork}
          name="budget"
        />
      )}
      {activeTab === "Sustainability" && (
        <ReportDetails
          report={allAiReports?.data.suggested_sustainability}
          isPending={isPending || isPendingAiStatus}
          isError={isError || isErrorAiStatus}
          refetch={refetch}
          handleRegenerateAiWork={handleRegenerateAiWork}
          name="sustainability"
        />
      )}
    </div>
  );
};

export default ReportsPage;
