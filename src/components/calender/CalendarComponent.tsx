"use client";

import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Event as BigCalendarEvent, Views } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/styles/calendar.css";

import { CalenderEventType, CalenderFormFieldType } from "@/types";
import AddEvent from "@/components/calender/AddEvent";
import EventDialog from "@/components/calender/EventDialog";
import { usePathname } from "next/navigation";
import { eventColors } from "@/constant/eventColor";
import { cn } from "@/lib/utils";

type CalendarComponentProps = {
  events: CalenderEventType[];
  calendarType: "month" | "week" | "day" | "agenda";
  crewList?: { value: number; label: string }[] | undefined;
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
  height?: string;
  calendarId: number | null;
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
  height,
  calendarId,
}) => {
  const [eventToDisplay, setEventToDisplay] = useState<CalenderEventType | null>(null);
  const [transformEvents, setTransformEvents] = useState<any>([]);
  const pathname = usePathname();

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

  const eventPropGetter = (event: CalenderEventType) => {
    const colorIndex = event.id % eventColors.length;
    return {
      style: {
        backgroundColor: eventColors[colorIndex],
        borderRadius: "4px",
        color: "rgb(236, 228, 228)",
      },
    };
  };

  // Transform Events for Calendar
  useEffect(() => {
    const transformed = events?.map((event) => {
      // Parse UTC strings directly to local time
      return {
        ...event,
        start: new Date(event.start.replace("Z", "")),
        end: new Date(event.end.replace("Z", "")),
      };
    });
    setTransformEvents(transformed);
  }, [events]);

  return (
    <div className="bg-white md:px-4 px-2 py-2">
      <div className={cn("bg-white mb-3", height ? `h-[${height}]` : "h-[600px]")}>
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
          eventPropGetter={eventPropGetter}
          style={{ height: "100%", width: "100%" }}
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
        calendarId={calendarId}
      />
    </div>
  );
};

export default CalendarComponent;
