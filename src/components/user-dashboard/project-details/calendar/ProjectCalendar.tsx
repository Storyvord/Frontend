"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import {
  useCreateCalenderEvents,
  useDeleteEvent,
  useEditEvent,
  useGetAllCalenderEvents,
} from "@/lib/react-query/queriesAndMutations/calender";
import { useGetCrewList } from "@/lib/react-query/queriesAndMutations/crew";
import CalendarComponent from "@/components/calender/CalendarComponent";
import { CalenderFormFieldType } from "@/types";
import { useCrewOptions } from "@/hooks/useCrewOptions";

const ProjectCalendar = ({
  openFormDialog,
  setOpenFormDialog,
  handleNavigate,
  currentDate,
  calendarType,
  height,
}: {
  openFormDialog: boolean;
  setOpenFormDialog: (value: boolean) => void;
  handleNavigate?: (date: Date) => void;
  currentDate?: Date;
  calendarType: "month" | "week" | "day" | "agenda";
  height?: string;
}) => {
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [calendarId, setCalendarId] = useState<number | null>(null);
  const { id: projectId } = useParams<{ id: string }>();

  // Fetch all calendar events
  const {
    data: events,
    isPending: isEventsLoading,
    isError: isEventsError,
  } = useGetAllCalenderEvents(projectId);

  // Fetch crew list
  const { crewList, isCrewLoading, isCrewError } = useCrewOptions(projectId);

  // Create calendar event mutation
  const {
    mutateAsync: createCalenderEvent,
    isPending: isCreateLoading,
    isError: isCreateError,
  } = useCreateCalenderEvents();

  // Delete event mutation
  const {
    mutateAsync: deleteEvent,
    isPending: isDeleteLoading,
    isError: isDeleteError,
  } = useDeleteEvent();

  const { mutateAsync: editEvent, isPending: isEditLoading, isError: isEditError } = useEditEvent();

  // Prepare crew list for the CalendarComponent
  // const crewList = crewListData?.accepted.map(
  //   (crew: { invited_user: { id: number }; firstName: string }) => ({
  //     value: crew.invited_user?.id,
  //     label: crew.firstName,
  //   })
  // );

  const handleCreateEvent = async (formData: CalenderFormFieldType) => {
    await createCalenderEvent({ eventData: formData, projectId });
    setOpenFormDialog(false);
  };

  const handleDeleteEvent = async (eventId: number) => {
    await deleteEvent({ eventId, projectId });
    setOpenEventDialog(false);
  };

  const handleEditEvent = async (eventId: number, formData: CalenderFormFieldType) => {
    await editEvent({ eventId, projectId, eventData: formData });
  };

  return (
    <div className="bg-white md:px-4 py-2">
      {(isEventsError || isCrewError) && (
        <p className="text-center my-1 text-red-500">Error loading data.</p>
      )}
      {(isEventsLoading || isCrewLoading) && <p className="text-center mt-10">Loading...</p>}
      <CalendarComponent
        events={events?.data || []}
        calendarType={calendarType}
        crewList={crewList}
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

export default ProjectCalendar;
