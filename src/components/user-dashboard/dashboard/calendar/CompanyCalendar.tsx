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

const CompanyCalender = ({
  openFormDialog,
  setOpenFormDialog,
  handleNavigate,
  currentDate,
  calendarType,
  employeeList,
  height,
}: {
  openFormDialog: boolean;
  setOpenFormDialog: (value: boolean) => void;
  handleNavigate?: (date: Date) => void;
  currentDate?: Date;
  calendarType: "month" | "week" | "day" | "agenda";
  employeeList: { value: number; label: string }[];
  height?: string;
}) => {
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [calendarId, setCalendarId] = useState<number | null>(null);

  // Fetch all calendar events
  const {
    data: events,
    isPending: isEventsLoading,
    isError: isEventsError,
  } = useGetCompanyCalenderEvents();

  useEffect(() => {
    if (events) {
      setCalendarId(events?.data?.id);
    }
  }, [events]);

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
    <div className="">
      {isEventsError && <p className="text-center my-1 text-red-500">Error loading data.</p>}
      {isEventsLoading && <p className="text-center mt-10">Loading...</p>}
      <CalendarComponent
        events={events?.data?.user_calendar_events || []}
        calendarType={calendarType}
        crewList={employeeList}
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
        handleNavigate={handleNavigate}
        currentDate={currentDate}
        height={height}
        calendarId={calendarId}
      />
    </div>
  );
};

export default CompanyCalender;
