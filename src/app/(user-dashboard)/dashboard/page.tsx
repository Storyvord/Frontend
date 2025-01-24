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
import AllProjects from "@/components/user-dashboard/dashboard/all-projects/AllProjects";
import { useTranslations } from "next-intl";
import Notification from "@/components/crew/home/Notification";
import Actions from "@/components/crew/home/Actions";

const Dashboard = () => {
  const [pastProjects, setPastProjects] = useState<ProjectType[]>([]);
  const [onGoingProjects, setOngoingProjects] = useState<ProjectType[]>([]);

  const { data: projects, isPending, isError } = useGetProjects();
  const { data: companyProfile } = useGetCompanySettings();
  const { data: employeeListData } = useGetOnBoardedEmployeeList(companyProfile?.data?.id);

  const t = useTranslations("common");

  const employeeList = employeeListData?.data.map((crew: { id: string; user_email: string }) => ({
    value: crew.id,
    label: crew.user_email,
  }));

  useEffect(() => {
    if (projects) {
      const filteredPastProjects = projects?.results?.filter((project: ProjectType) =>
        ["COMPLETED", "CANCELLED", "POST_PRODUCTION"].includes(project.status)
      );
      const filteredOngoingProjects = projects?.results.filter(
        (project: ProjectType) =>
          !["COMPLETED", "CANCELLED", "POST_PRODUCTION"].includes(project.status)
      );

      setPastProjects(filteredPastProjects);
      setOngoingProjects(filteredOngoingProjects);
    }
  }, [projects]);
  {
    t("dashboard");
  }
  return (
    <main className=" pl-3 md:pl-6 pr-3 md:pr-0 lg:pl-10 pb-12">
      <div className=" grid grid-cols-1 lg:grid-cols-4 gap-5 mt-0">
        <section className="md:col-span-3 h-full pt-3 space-y-8 md:pr-2">
          <h1 className="text-xl md:text-2xl font-semibold -mb-4"> {t("dashboard")}</h1>
          <Project onGoingProjects={onGoingProjects} />
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-4">
            <Tasks employeeList={employeeList} />
            <DashboardCalendar employeeList={employeeList} height="400px" />
          </div>
        </section>
        {/* TODO: this 3 sections are static fix when api ready */}
        <section className=" h-full xl:px-4 space-y-6 bg-white">
          <Notification />
          <Actions />
          <MyNetwork />
        </section>
      </div>
      {/* <PastProjects projects={pastProjects} isLoading={isPending} isError={isError} /> */}
    </main>
  );
};

export default Dashboard;
