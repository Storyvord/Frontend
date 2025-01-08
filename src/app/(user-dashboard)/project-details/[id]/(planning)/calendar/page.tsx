"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ProjectCalendar from "@/components/user-dashboard/project-details/calendar/ProjectCalendar";

const CompanyCalendarPage = () => {
  const [openFormDialog, setOpenFormDialog] = useState(false);

  return (
    <div className=" pt-2 px-1 md:px-4 h-screen">
      <Button
        onClick={() => setOpenFormDialog(true)}
        className=" uppercase bg-green-500 hover:bg-green-700 font-bold mb-4"
      >
        Add New Event
      </Button>
      <ProjectCalendar
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        calendarType="month"
      />
    </div>
  );
};

export default CompanyCalendarPage;
