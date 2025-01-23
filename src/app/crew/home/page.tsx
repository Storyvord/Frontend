"use client";

import React from "react";
import Actions from "@/components/crew/home/Actions";
import CrewHomeCalendar from "@/components/crew/home/CrewHomeCalendar";
import Notification from "@/components/crew/home/Notification";
import Posting from "@/components/crew/home/Posting";
import Project from "@/components/crew/home/Project";
import Tasks from "@/components/crew/home/Tasks";
import MyNetwork from "@/components/user-dashboard/dashboard/network/MyNetwork";

const CrewDashboard = () => {
  return (
    <main className=" pl-3 md:pl-6 pr-3 md:pr-0 lg:pl-10">
      <div className=" grid grid-cols-1 lg:grid-cols-4 gap-5 mt-0">
        <section className="md:col-span-3 h-full pt-3 space-y-8 md:pr-2">
          <h1 className="text-xl md:text-2xl font-semibold -mb-4">Crew Dashboard</h1>
          <Project />
          <CrewHomeCalendar />
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
            <Posting />
            <Tasks />
          </div>
        </section>

        {/* TODO: this 3 sections are static fix when api ready */}
        <section className=" h-full xl:px-4 space-y-6 bg-white">
          <Notification />
          <Actions />
          <MyNetwork />
        </section>
      </div>
    </main>
  );
};

export default CrewDashboard;
