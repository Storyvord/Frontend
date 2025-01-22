"use client";

import React, { useEffect, useState } from "react";

import {
  useCreateCompanyCalenderEvents,
  useDeleteCompanyCalenderEvent,
  useEditCompanyCalenderEvent,
  useGetCompanyCalenderEvents,
} from "@/lib/react-query/queriesAndMutations/company/calender";
import {
  useGetOnBoardedEmployeeList,
  useGetSendInvitationsList,
} from "@/lib/react-query/queriesAndMutations/company/employee";
import CalendarComponent from "@/components/calender/CalendarComponent";
import { CalenderFormFieldType } from "@/types";
import { useGetAllCrewCalenderEvents } from "@/lib/react-query/queriesAndMutations/crew/calendar";

type CalendarEvent = {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
  location?: string;
  calendar: number;
  participants?: number[];
};

type ProjectCalendar = {
  id: number;
  name: string;
  project: string;
  events: CalendarEvent[];
};
type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: (value: boolean) => void;
  calendarType: "month" | "week" | "day" | "agenda";
  currentDate?: Date;
  height?: string;
};
const CrewCalendar = ({ openFormDialog, setOpenFormDialog, calendarType, height }: Props) => {
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [transformEvents, setTransformEvents] = useState<any[]>([]);
  const [userCalendarId, setUserCalendarId] = useState<number | null>(null);

  // Fetch all calendar events
  const {
    data: allEvents,
    isPending: isEventsLoading,
    isError: isEventsError,
  } = useGetAllCrewCalenderEvents();

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

  // Create calendar event mutation
  const {
    mutateAsync: createCalenderEvent,
    isPending: isCreateLoading,
    isError: isCreateError,
  } = useCreateCompanyCalenderEvents();

  // Delete event mutation
  const {
    mutateAsync: deleteEvent,
    isPending: isDeleteLoading,
    isError: isDeleteError,
  } = useDeleteCompanyCalenderEvent();

  const {
    mutateAsync: editEvent,
    isPending: isEditLoading,
    isError: isEditError,
  } = useEditCompanyCalenderEvent();

  const handleCreateEvent = async (formData: CalenderFormFieldType) => {
    await createCalenderEvent(formData);
    setOpenFormDialog(false);
  };

  const handleDeleteEvent = async (eventId: number) => {
    await deleteEvent(eventId);
    setOpenEventDialog(false);
  };

  const handleEditEvent = async (eventId: number, formData: CalenderFormFieldType) => {
    await editEvent({ eventId, eventData: formData });
  };

  return (
    <div className="rounded-3xl">
      {isEventsError && <p className="text-center my-1 text-red-500">Error loading data.</p>}
      {isEventsLoading && <p className="text-center mt-10">Loading...</p>}
      <CalendarComponent
        events={transformEvents || []}
        calendarType={calendarType}
        // crewList={employeeList}
        isCreateLoading={isCreateLoading}
        isCreateError={isCreateError}
        isDeleteLoading={isDeleteLoading}
        isDeleteError={isDeleteError}
        isEditLoading={isEditLoading}
        isEditError={isEditError}
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        handleCreateEvent={handleCreateEvent}
        openEventDialog={openEventDialog}
        setOpenEventDialog={setOpenEventDialog}
        handleDeleteEvent={handleDeleteEvent}
        handleEditEvent={handleEditEvent}
        calendarId={userCalendarId}
        height={height}
      />
    </div>
  );
};

export default CrewCalendar;
