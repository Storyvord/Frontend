"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import Tabs from "@/components/Tabs";
import EquipmentPage from "@/components/report/EquipmentPage";
import { useGetProjectRequirements } from "@/lib/react-query/queriesAndMutations/project";
import {
  useGetRequirements,
  useGetSuggestions,
} from "@/lib/react-query/queriesAndMutations/aiSuggestions";
import CrewPage from "@/components/report/CrewPage";
import ReportDetails from "@/components/report/ReportDetails";

const tabs = ["Crew", "Suppliers", "Logistics", "Compliance", "Culture", "Budget"];

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("Crew");

  const { id: project_id }: { id: string } = useParams();

  const { data: projectRequirements } = useGetProjectRequirements(project_id);

  // ai Requirements suggestions
  const {
    data: getRequirementsSuggestions,
    isPending: isPendingRequirementsSuggestions,
    isError: isErrorRequirementsSuggestions,
    refetch: refetchRequirement,
  } = useGetRequirements(projectRequirements?.results[0]?.id);
  const {
    data: suggestions,
    isPending: isPendingSuggestions,
    isError: isErrorSuggestions,
    refetch,
  } = useGetSuggestions(project_id);

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
      {activeTab === "Suppliers" && (
        <EquipmentPage
          equipmentRequirements={getRequirementsSuggestions?.data.suggested_equipment}
          isPending={isPendingRequirementsSuggestions}
          isError={isErrorRequirementsSuggestions}
          refetch={refetchRequirement}
        />
      )}
      {activeTab === "Logistics" && (
        <ReportDetails
          report={suggestions?.data?.report.logistics}
          isPending={isPendingSuggestions}
          isError={isErrorSuggestions}
          refetch={refetch}
        />
      )}
      {activeTab === "Compliance" && (
        <ReportDetails
          report={suggestions?.data?.report.compliance}
          isPending={isPendingSuggestions}
          isError={isErrorSuggestions}
          refetch={refetch}
        />
      )}
      {activeTab === "Culture" && (
        <ReportDetails
          report={suggestions?.data?.report.culture}
          isPending={isPendingSuggestions}
          isError={isErrorSuggestions}
          refetch={refetch}
        />
      )}
      {activeTab === "Budget" && (
        <ReportDetails
          report={suggestions?.data?.report.budget}
          isPending={isPendingSuggestions}
          isError={isErrorSuggestions}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ReportsPage;
