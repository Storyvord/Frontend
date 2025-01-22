"use client";

import Dashboard from "@/components/crew/Dashboard";
import Actions from "@/components/crew/home/Actions";
import CrewHomeCalendar from "@/components/crew/home/CrewHomeCalendar";
import Notification from "@/components/crew/home/Notification";
import Posting from "@/components/crew/home/Posting";
import Project from "@/components/crew/home/Project";
import Tasks from "@/components/crew/home/Tasks";
import DashboardCalendar from "@/components/user-dashboard/dashboard/calendar/DashboardCalendar";
import MyNetwork from "@/components/user-dashboard/dashboard/network/MyNetwork";
import { useGetInvitations } from "@/lib/react-query/queriesAndMutations/crew/invitations";
import React from "react";

const CrewSection = () => {
  const { data: listOfProjects } = useGetInvitations();

  return (
    <main className=" pl-3 md:pl-6 pr-3 md:pr-0 lg:pl-10">
      <div className=" grid grid-cols-1 lg:grid-cols-4 gap-5 mt-0">
        <section className="md:col-span-3 h-full py-3 space-y-8 md:pr-2">
          <h1 className="text-xl md:text-2xl font-semibold -mb-4">Crew Dashboard</h1>
          <Project listOfProjects={listOfProjects?.data} />
          <CrewHomeCalendar />
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
            <Posting />
            <Tasks />
          </div>
        </section>
        <section className=" h-full px-4 space-y-6 bg-white">
          <Notification />
          <Actions />
          <MyNetwork />
          {/* <AllProjects projects={projects} /> */}
        </section>
      </div>
      {/* <PastProjects projects={pastProjects} isLoading={isPending} isError={isError} /> */}
    </main>
  );
};

export default CrewSection;
