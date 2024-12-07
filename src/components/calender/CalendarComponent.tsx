"use client";

import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Event as BigCalendarEvent } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalenderEventType, CalenderFormFieldType } from "@/types";
import AddEvent from "@/components/calender/AddEvent";
import EventDialog from "@/components/calender/EventDialog";

type CalendarComponentProps = {
  events: CalenderEventType[];
  calendarType: "month" | "week" | "day" | "agenda";
  crewList: { value: string; label: string }[] | undefined;
  isCreateLoading: boolean;
  isCreateError: boolean;
  isDeleteLoading: boolean;
  isDeleteError: boolean;
  isEditLoading: boolean;
  isEditError: boolean;
  openFormDialog: boolean;
  setOpenFormDialog: (value: boolean) => void;
  handleCreateEvent: (formData: CalenderFormFieldType) => void;
  handleEditEvent: (eventId: number, formData: CalenderFormFieldType) => void;
  openEventDialog: boolean;
  setOpenEventDialog: (value: boolean) => void;
  handleDeleteEvent: (eventId: number) => void;
  handleNavigate?: (date: Date) => void;
  currentDate?: Date;
};

const locales = {
  "en-US": enUS,
};

// Setup date-fns localizer
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  events,
  calendarType = "month",
  crewList,
  isCreateLoading,
  isCreateError,
  isDeleteLoading,
  isDeleteError,
  isEditLoading,
  isEditError,
  openFormDialog,
  setOpenFormDialog,
  handleCreateEvent,
  openEventDialog,
  setOpenEventDialog,
  handleDeleteEvent,
  handleEditEvent,
  handleNavigate,
  currentDate,
}) => {
  const [eventToDisplay, setEventToDisplay] = useState<CalenderEventType | null>(null);
  const [transformEvents, setTransformEvents] = useState<CalenderEventType[]>([]);

  // Default form values
  const [formDefaultValue, setFormDefaultValue] = useState({
    start: "",
    end: "",
    title: "",
    participants: [] as number[],
    description: "",
    location: "",
  });

  // Handlers
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setFormDefaultValue({
      start: format(new Date(start), "yyyy-MM-dd'T'HH:mm"),
      end: format(new Date(end), "yyyy-MM-dd'T'HH:mm"),
      title: "",
      participants: [],
      description: "",
      location: "",
    });
    setOpenFormDialog(true);
  };

  const handleSelectEvent = (event: CalenderEventType) => {
    setEventToDisplay(event);
    setOpenEventDialog(true);
  };

  // Transform Events for Calendar
  useEffect(() => {
    const transformed = events?.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
    setTransformEvents(transformed);
  }, [events]);

  return (
    <>
      <div className="h-[500px] 2xl:h-[700px] bg-white mb-3">
        <Calendar
          localizer={localizer}
          events={transformEvents}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          startAccessor="start"
          endAccessor="end"
          defaultView={calendarType}
          onNavigate={handleNavigate}
          date={currentDate}
          selectable
          style={{ height: "100%" }}
        />
      </div>
      <AddEvent
        openDialog={openFormDialog}
        setOpenDialog={setOpenFormDialog}
        formDefaultValue={formDefaultValue}
        createCalenderEvent={handleCreateEvent}
        isLoading={isCreateLoading}
        isError={isCreateError}
        crewList={crewList}
      />
      <EventDialog
        event={eventToDisplay}
        openDialog={openEventDialog}
        setOpenDialog={setOpenEventDialog}
        deleteEvent={handleDeleteEvent}
        isLoading={isDeleteLoading}
        isError={isDeleteError}
        crewList={crewList}
        editEvent={handleEditEvent}
        isEditLoading={isEditLoading}
        isEditError={isEditError}
      />
    </>
  );
};

export default CalendarComponent;
