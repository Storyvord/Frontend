import React, { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import CrewCalendar from "./CrewCalendar";
import DisplayAllEvent from "./DisplayAllEvent";

const CrewHomeCalendar = () => {
  const [openFormDialog, setOpenFormDialog] = useState(false);

  return (
    <div className="mt-4">
      <header className="flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <Image width={27} height={27} src="/icons/calendar.svg" alt="Calendar Icon" />
          <h1 className="text-lg md:text-xl">My Schedule</h1>
        </span>
        <Button
          onClick={() => setOpenFormDialog(true)}
          className="flex gap-2 rounded-sm border border-gray-600"
          variant="outline"
          size="sm"
        >
          <Image width={20} height={20} src="/icons/plus-2.svg" alt="Add Icon" /> Add Event
        </Button>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-4">
        <div className="md:col-span-2 md:col-start-1">
          <DisplayAllEvent />
        </div>
        <div className=" pt-2 rounded-3xl flex-1 bg-white md:col-span-4 md:col-start-3 border">
          <CrewCalendar
            openFormDialog={openFormDialog}
            setOpenFormDialog={setOpenFormDialog}
            calendarType="week"
            height="400px"
          />
        </div>
      </main>
    </div>
  );
};

export default CrewHomeCalendar;
