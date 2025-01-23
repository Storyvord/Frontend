"use client";
import CrewCalendar from "@/components/crew/home/CrewCalendar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const CompanyCalendarPage = () => {
  const [openFormDialog, setOpenFormDialog] = useState(false);

  return (
    <div className=" pt-4 bg-white px-1 md:px-4">
      <Button
        onClick={() => setOpenFormDialog(true)}
        className=" uppercase bg-green-500 hover:bg-green-700 font-bold mb-4"
      >
        Add New Event
      </Button>
      <CrewCalendar
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        calendarType="month"
      />
    </div>
  );
};

export default CompanyCalendarPage;
