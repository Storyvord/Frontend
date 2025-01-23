import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import CrewCalendar from "./CrewCalendar";
import DisplayAllEvent from "./DisplayAllEvent";
import { useGetAllCrewCalenderEvents } from "@/lib/react-query/queriesAndMutations/crew/calendar";

export type CalendarEvent = {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
  location?: string;
  calendar: number;
  participants?: number[];
};

export type ProjectCalendar = {
  id: number;
  name: string;
  project: string;
  events: CalendarEvent[];
};

const CrewHomeCalendar = () => {
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [userCalendarId, setUserCalendarId] = useState<number | null>(null);
  const [transformEvents, setTransformEvents] = useState<any[]>([]);

  const { data: allEvents, isPending, isError } = useGetAllCrewCalenderEvents();

  useEffect(() => {
    if (allEvents) {
      // Extracting user calendar events
      const userEvents = allEvents?.data?.user_calendar?.user_calendar_events || [];

      // Extracting project calendars and their events
      const projectCalendars = allEvents?.data?.project_calendars || [];
      const projectEvents = projectCalendars.flatMap(
        (calendar: ProjectCalendar) => calendar.events || []
      );

      // Merging user and project events
      const mergedEvents = [...userEvents, ...projectEvents];
      setTransformEvents(mergedEvents);

      // Setting user calendar ID
      setUserCalendarId(allEvents?.data?.user_calendar?.id);
    }
  }, [allEvents]);

  return (
    <div className="mt-4">
      <header className="flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <Image width={27} height={27} src="/icons/calendar.svg" alt="Calendar Icon" />
          <h1 className="text-lg md:text-xl">My Schedule</h1>
        </span>
        <Button
          onClick={() => setOpenFormDialog(true)}
          className="flex gap-2 rounded-sm border border-gray-600 bg-transparent"
          variant="outline"
          size="sm"
        >
          <Image width={20} height={20} src="/icons/plus.svg" alt="Add Icon" /> Add Event
        </Button>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-4">
        {/* event list */}
        <div className="md:col-span-2 md:col-start-1">
          <DisplayAllEvent events={transformEvents} isPending={isPending} isError={isError} />
        </div>
        {/* main calendar */}
        <div className=" pt-2 rounded-3xl flex-1 bg-white md:col-span-4 md:col-start-3 border">
          <CrewCalendar
            openFormDialog={openFormDialog}
            setOpenFormDialog={setOpenFormDialog}
            calendarType="week"
            height="400px"
            events={transformEvents}
            isPending={isPending}
            isError={isError}
            userCalendarId={userCalendarId}
          />
        </div>
      </main>
    </div>
  );
};

export default CrewHomeCalendar;
