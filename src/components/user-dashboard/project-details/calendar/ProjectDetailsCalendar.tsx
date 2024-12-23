import React, { useState } from "react";
import Image from "next/image";
import { addDays } from "date-fns";

import { Button } from "@/components/ui/button";
import DatePickerWithRange from "../../dashboard/calendar/DatePickerWithRange";
import ProjectCalendar from "./ProjectCalendar";

const ProjectDetailsCalendar = () => {
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const [selectedRange, setSelectedRange] = useState<any | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // Keep track of the current date

  const handleSelectRange = (range: any | undefined) => {
    setSelectedRange(range);
    if (range?.from) {
      setCurrentDate(range.from as Date); // Navigate to the start of the selected week
    }
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date); // Update the current date
  };

  return (
    <div className="mt-8 px-3">
      <header className="flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <Image width={27} height={27} src="/icons/calendar.svg" alt="Calendar Icon" />
          <h1 className="text-lg md:text-xl">Calendar</h1>
        </span>
        <Button onClick={() => setOpenFormDialog(true)} className="flex gap-2">
          <Image width={25} height={25} src="/icons/plus-2.svg" alt="Add Icon" /> Add Event
        </Button>
      </header>
      <main className="flex xl:flex-row flex-col md:items-start gap-3 mt-4">
        <DatePickerWithRange onSelectRange={handleSelectRange} />
        <div className="md:px-4 py-2 rounded-xl flex-1 border bg-white">
          <h2 className=" text-md md:text-lg pb-2 p-4 font-semibold text-gray-700 ">My Schedule</h2>
          <ProjectCalendar
            calendarType="week"
            openFormDialog={openFormDialog}
            setOpenFormDialog={setOpenFormDialog}
            handleNavigate={handleNavigate}
            currentDate={currentDate}
          />
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailsCalendar;
