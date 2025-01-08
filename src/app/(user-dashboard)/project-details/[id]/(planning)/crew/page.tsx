"use client";
import Tabs from "@/components/Tabs";
import CrewHire from "@/components/user-dashboard/project-details/planning/crew/crewHire/CrewHire";
import CrewSearch from "@/components/user-dashboard/project-details/planning/crew/crewHire/CrewSearch";
import OpenPosition from "@/components/user-dashboard/project-details/planning/crew/OpenPosition";
import React, { useState } from "react";

const tabs = ["Crew Hire", "Open Position", "Crew Search", "Ai Response"];

const Crew = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div className=" mt-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} className=" ml-3"></Tabs>
      <section className=" w-full p-4">
        {activeTab === tabs[0] && <CrewHire />}
        {activeTab === tabs[1] && <OpenPosition />}
        {activeTab === tabs[2] && <CrewSearch />}
        {activeTab === tabs[3] && <CrewSearch />}
      </section>
    </div>
  );
};

export default Crew;
