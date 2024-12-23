"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Posting from "@/components/user-dashboard/dashboard/posting/Posting";
import Project from "@/components/user-dashboard/dashboard/project/Project";
import Tasks from "@/components/user-dashboard/dashboard/tasks/Tasks";
import MyNetwork from "@/components/user-dashboard/dashboard/network/MyNetwork";
import PastProjects from "@/components/dashboardHome/PastProjects";
import { useGetProjects } from "@/lib/react-query/queriesAndMutations/project";
import { Project as ProjectType } from "@/types/project";
import DashboardCalendar from "@/components/user-dashboard/dashboard/calendar/DashboardCalendar";
import { useGetCompanySettings } from "@/lib/react-query/queriesAndMutations/company/settings";
import { useGetOnBoardedEmployeeList } from "@/lib/react-query/queriesAndMutations/company/employee";

const Dashboard = () => {
  const [pastProjects, setPastProjects] = useState<ProjectType[]>([]);
  const [onGoingProjects, setOngoingProjects] = useState<ProjectType[]>([]);

  const { data: projects, isPending, isError } = useGetProjects();
  const { data: companyProfile } = useGetCompanySettings();
  const { data: employeeListData } = useGetOnBoardedEmployeeList(companyProfile?.data?.id);

  const employeeList = employeeListData?.data.map((crew: { id: string; user_email: string }) => ({
    value: crew.id,
    label: crew.user_email,
  }));

  useEffect(() => {
    if (projects) {
      const filteredPastProjects = projects?.results.filter((project: ProjectType) =>
        ["COMPLETED", "CANCELLED", "POST_PRODUCTION"].includes(project.status)
      );
      const filteredOngoingProjects = projects?.results.filter(
        (project: ProjectType) =>
          !["COMPLETED", "CANCELLED", "POST_PRODUCTION"].includes(project.status)
      );

      // setPastProjects(filteredPastProjects);
      setOngoingProjects(projects.results);
    }
  }, [projects]);

  return (
    <main className=" p-2 sm:py-6 sm:px-10">
      <h1 className="text-xl md:text-2xl font-semibold">Dashboard</h1>
      <div className=" grid grid-cols-1 lg:grid-cols-4 gap-4">
        <section className="md:col-span-3 h-full py-3 md:pr-2">
          <Project onGoingProjects={onGoingProjects} />
          <DashboardCalendar employeeList={employeeList} />
        </section>
        <section className=" h-full pl-1 space-y-6">
          <Tasks employeeList={employeeList} />
          <MyNetwork />
          <Posting />
        </section>
      </div>
      <PastProjects projects={pastProjects} isLoading={isPending} isError={isError} />
    </main>
  );
};

export default Dashboard;
