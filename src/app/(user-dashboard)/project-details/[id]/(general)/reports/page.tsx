"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import Tabs from "@/components/Tabs";
import { useGetProjectRequirements } from "@/lib/react-query/queriesAndMutations/project";
import { useGetRequirements } from "@/lib/react-query/queriesAndMutations/aiSuggestions";
import CrewPage from "@/components/report/CrewPage";
import ReportDetails from "@/components/report/ReportDetails";
import SuppliersPage from "@/components/report/SuppliersPage";

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
  const { id: projectId }: { id: string } = useParams();
  const { data: projectRequirements } = useGetProjectRequirements(projectId);

  // ai Requirements suggestions for crew & Suppliers
  const {
    data: getRequirementsSuggestions,
    isPending: isPendingRequirementsSuggestions,
    isError: isErrorRequirementsSuggestions,
    refetch: refetchRequirement,
  } = useGetRequirements(projectRequirements?.results[0]?.id);

  return (
    <div className="container mx-auto p-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      {activeTab === "Crew" && (
        <CrewPage
          crewRequirements={getRequirementsSuggestions?.data.suggested_crew}
          isPending={isPendingRequirementsSuggestions}
          isError={isErrorRequirementsSuggestions}
          refetch={refetchRequirement}
        />
      )}
      {activeTab === "Suppliers" && <SuppliersPage report="suppliers" projectId={projectId} />}
      {activeTab === "Logistics" && <ReportDetails report="logistics" projectId={projectId} />}
      {activeTab === "Compliance" && <ReportDetails report="compliance" projectId={projectId} />}
      {activeTab === "Culture" && <ReportDetails report="culture" projectId={projectId} />}
      {activeTab === "Budget" && <ReportDetails report="budget" projectId={projectId} />}
      {activeTab === "Sustainability" && (
        <ReportDetails report="sustainability" projectId={projectId} />
      )}
    </div>
  );
};

export default ReportsPage;
