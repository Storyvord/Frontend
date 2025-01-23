"use client";

import React, { useState } from "react";

import {
  useCreateCompanyCalenderEvents,
  useDeleteCompanyCalenderEvent,
  useEditCompanyCalenderEvent,
} from "@/lib/react-query/queriesAndMutations/company/calender";
import CalendarComponent from "@/components/calender/CalendarComponent";
import { CalenderEventType, CalenderFormFieldType } from "@/types";

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: (value: boolean) => void;
  calendarType: "month" | "week" | "day" | "agenda";
  currentDate?: Date;
  height?: string;
  events?: CalenderEventType[];
  isPending?: boolean;
  isError?: boolean;
  userCalendarId?: number | null;
};
const CrewCalendar = ({
  openFormDialog,
  setOpenFormDialog,
  calendarType,
  height,
  events,
  isPending,
  isError,
  userCalendarId,
}: Props) => {
  const [openEventDialog, setOpenEventDialog] = useState(false);

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
      {isError && <p className="text-center my-1 text-red-500">Error loading data.</p>}
      {isPending && <p className="text-center mt-10">Loading...</p>}
      <CalendarComponent
        events={events || []}
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
