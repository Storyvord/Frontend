"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ComplianceCategory from "@/components/user-dashboard/project-details/planning/compliance/ComplianceCategory";
import { useParams } from "next/navigation";
import { useGetSuggestions } from "@/lib/react-query/queriesAndMutations/aiSuggestions";
import Tabs from "@/components/Tabs";
import ReportDetails from "@/components/report/ReportDetails";

// Define the type for each compliance task
type ComplianceTask = {
  id: number;
  description: string;
  completed: boolean;
};

// Initial data for each compliance category
const initialCategories = {
  permits: [
    { id: 1, description: "Obtain filming permits for public locations", completed: false },
    { id: 2, description: "Submit filming schedule to local authorities", completed: false },
  ],
  insurance: [
    { id: 1, description: "Arrange liability insurance coverage", completed: false },
    { id: 2, description: "Confirm insurance policy for equipment", completed: true },
  ],
  healthSafety: [
    { id: 1, description: "Conduct health and safety briefing for crew", completed: false },
    { id: 2, description: "Establish emergency contact protocols", completed: false },
  ],
};
const tabs = ["Overview", "Ai Response"];

const CompliancePage: React.FC = () => {
  const [compliance, setCompliance] = useState(initialCategories);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { id: project_id }: { id: string } = useParams();

  const {
    data: suggestions,
    isPending: isPendingSuggestions,
    isError: isErrorSuggestions,
    refetch,
  } = useGetSuggestions(project_id);

  const handleUpdate = (category: string, updatedTasks: ComplianceTask[]) => {
    setCompliance((prev) => ({ ...prev, [category]: updatedTasks }));
  };

  // Calculate overall completion percentage
  const calculateCompletion = () => {
    const allTasks = Object.values(compliance).flat();
    const completedTasks = allTasks.filter((task) => task.completed).length;
    return ((completedTasks / allTasks.length) * 100).toFixed(2);
  };

  return (
    <div className="p-6">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} className=" ml-3"></Tabs>
      {activeTab === tabs[0] && (
        <>
          <h1 className="text-2xl font-bold my-6">Compliance Overview</h1>

          {/* Render Compliance Categories */}
          <ComplianceCategory
            title="Permits"
            tasks={compliance.permits}
            onUpdate={(tasks) => handleUpdate("permits", tasks)}
          />
          <ComplianceCategory
            title="Insurance"
            tasks={compliance.insurance}
            onUpdate={(tasks) => handleUpdate("insurance", tasks)}
          />
          <ComplianceCategory
            title="Health & Safety"
            tasks={compliance.healthSafety}
            onUpdate={(tasks) => handleUpdate("healthSafety", tasks)}
          />

          {/* Display Completion Status */}
          <div className="mt-8 flex justify-between items-center">
            <span className="text-lg font-semibold">Overall Compliance Completion:</span>
            <span className="text-xl font-bold">{calculateCompletion()}%</span>
          </div>
          <Button className="mt-4">Save Compliance Status</Button>
        </>
      )}
      {activeTab === tabs[1] && (
        <ReportDetails
          report={suggestions?.data?.report.compliance}
          isPending={isPendingSuggestions}
          isError={isErrorSuggestions}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default CompliancePage;
