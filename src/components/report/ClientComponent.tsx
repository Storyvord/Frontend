"use client";

import { useState } from "react";

import Tabs from "@/components/report/TabComponent";
import CrewPageClient from "./CrewPageClient";
import EquipmentPage from "./EquipmentPage";
import LogisticsPage from "./logistics/LogisticsPage";
import CompliancePage from "./CompliancePage";
import BudgetPage from "./BudgetPage";
import { CrewRequirement } from "@/types";
import CulturePage from "./culture/CulturePage";

interface ClientComponentProps {
  project_id: string;
  crewRequirements: CrewRequirement[];
}

const ClientComponent: React.FC<ClientComponentProps> = ({
  project_id,
  crewRequirements,
}) => {
  const [activeTab, setActiveTab] = useState("Crew");

  return (
    <div className="container mx-auto p-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Crew" && <CrewPageClient crewRequirements={crewRequirements} />}
      {activeTab === "Equipment" && <EquipmentPage />}
      {activeTab === "Logistics" && <LogisticsPage project_id={project_id} />}
      {activeTab === "Compliance" && <CompliancePage />}
      {activeTab === "Culture" && <CulturePage project_id={project_id} />}
      {activeTab === "Budget" && <BudgetPage />}
    </div>
  );
};

export default ClientComponent;