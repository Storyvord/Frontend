"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Tabs from "@/components/Tabs";
import EquipmentPage from "@/components/report/EquipmentPage";
import LogisticsPage from "@/components/report/logistics/LogisticsPage";
import CompliancePage from "@/components/report/compliance/CompliancePage";
import CulturePage from "@/components/report/culture/CulturePage";
import BudgetPage from "@/components/report/BudgetPage";
import { useGetProjectRequirements } from "@/lib/react-query/queriesAndMutations/project";
import {
  useGetRequirements,
  useGetSuggestions,
} from "@/lib/react-query/queriesAndMutations/aiSuggestions";
import CrewPage from "@/components/report/CrewPage";
import ReportDetails from "@/components/report/ReportDetails";

const tabs = ["Crew", "Equipment", "Logistics", "Compliance", "Culture", "Budget"];

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("Crew");
  const [crewRequirements, setCrewRequirements] = useState<any>(null);
  const [equipmentRequirements, setEquipmentRequirements] = useState<any>(null);
  // const [logisticsData, setLogisticsData] = useState<any>(null);
  // const [complianceData, setComplianceData] = useState<any>(null);
  // const [cultureData, setCultureData] = useState<any>(null);
  // const [budgetData, setBudgetData] = useState<any>(null);

  const { id: project_id }: { id: string } = useParams();

  const { data: projectRequirements } = useGetProjectRequirements(project_id);
  const {
    mutateAsync: getRequirementsSuggestions,
    isPending: isPendingRequirementsSuggestions,
    isError: isErrorRequirementsSuggestions,
  } = useGetRequirements();
  const {
    data: suggestions,
    isPending: isPendingSuggestions,
    isError: isErrorSuggestions,
    refetch,
  } = useGetSuggestions(project_id);

  useEffect(() => {
    (async () => {
      if (projectRequirements) {
        const requirementsSuggestions = await getRequirementsSuggestions(
          projectRequirements.results[0].id
        );

        setCrewRequirements(requirementsSuggestions?.data.suggested_crew);
        setEquipmentRequirements(requirementsSuggestions?.data.suggested_equipment);
      }
    })();
  }, [projectRequirements]);

  // useEffect(() => {
  //   if (suggestions?.data?.suggestion?.data) {
  //     const logistics: any[] = [];
  //     const compliance: any[] = [];
  //     const culture: any[] = [];
  //     const budget: any[] = [];

  //     suggestions.data.suggestion.data.forEach((item: any) => {
  //       logistics.push({ location: item.location, data: item.ai_suggestion[0].logistics });
  //       compliance.push({ location: item.location, data: item.ai_suggestion[0].compliance });
  //       culture.push({ location: item.location, data: item.ai_suggestion[0].culture });
  //       budget.push({ location: item.location, data: item.ai_suggestion[0].budget });
  //     });

  //     setLogisticsData(logistics);
  //     setComplianceData(compliance);
  //     setCultureData(culture);
  //     setBudgetData(budget);
  //   }
  // }, [suggestions]);

  return (
    <div className="container mx-auto p-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      {activeTab === "Crew" && (
        <CrewPage
          crewRequirements={crewRequirements}
          isPending={isPendingRequirementsSuggestions}
          isError={isErrorRequirementsSuggestions}
        />
      )}
      {activeTab === "Equipment" && (
        <EquipmentPage
          equipmentRequirements={equipmentRequirements}
          isPending={isPendingRequirementsSuggestions}
          isError={isErrorRequirementsSuggestions}
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
