"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Edit } from "lucide-react";
import { CalenderEventType, CalenderFormFieldType } from "@/types";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddEvent from "./AddEvent";
import Loader from "../Loader";

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  event: CalenderEventType | null;
  deleteEvent?: (eventId: number) => void;
  editEvent?: (eventId: number, formData: CalenderFormFieldType) => void;
  isLoading?: boolean;
  isError?: boolean;
  isEditLoading: boolean;
  isEditError: boolean;
  crewList?: { value: number; label: string }[];
  calendarId?: number | null;
};

const EventDialog = ({
  openDialog,
  setOpenDialog,
  event,
  deleteEvent,
  editEvent,
  isLoading,
  isError,
  isEditLoading,
  isEditError,
  crewList,
  calendarId,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!event) return null;

  // Format dates using date-fns
  const formattedStartDate = format(new Date(event.start), "dd-MM-yyyy");
  const formattedStartTime = format(new Date(event.start), "HH:mm");
  const formattedEndDate = format(new Date(event.end), "dd-MM-yyyy");
  const formattedEndTime = format(new Date(event.end), "HH:mm");

  const participants = event?.participants
    ?.map((valueToFind) => {
      const foundObject = crewList?.find((item) => Number(item.value) === valueToFind);
      return foundObject ? foundObject.label : null;
    })
    .filter((label) => label !== null);

  const handleEdit = (formData: CalenderFormFieldType) => {
    if (editEvent && event) {
      editEvent(event.id, formData);
      setIsEditing(false);
    }
  };
  const handleOpenEditDialog = () => {
    setIsEditing(true);
    setOpenDialog(false);
  };

  const formDefaultValue = {
    title: event.title,
    start: format(new Date(event.start), "yyyy-MM-dd'T'HH:mm"),
    end: format(new Date(event.end), "yyyy-MM-dd'T'HH:mm"),
    participants: event.participants || [],
    description: event.description || "",
    location: event.location || "",
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="font-sans max-h-[85vh] overflow-auto lg:w-[700px] w-[95%]">
          <DialogTitle className="text-2xl">{event.title}</DialogTitle>
          <div className="text-gray-700 text-[18px] space-y-2">
            <h5>
              <strong>Start:</strong> {formattedStartDate}, {formattedStartTime}
            </h5>
            <h5>
              <strong>End:</strong> {formattedEndDate}, {formattedEndTime}
            </h5>

            {event.location && (
              <h5>
                <strong>Location:</strong> {event.location}
              </h5>
            )}

            {event.description && (
              <h5>
                <strong>Description:</strong> {event.description}
              </h5>
            )}

            {participants && participants.length > 0 && (
              <h5>
                <strong>Participants:</strong> {participants.join(", ")}
              </h5>
            )}
          </div>
          {isError && <p className="my-2 text-red-600">Failed to delete event</p>}
          {isEditError && <p className="my-2 text-red-600">Failed to edit event</p>}
          {event.calendar === calendarId && (
            <div className="flex flex-wrap justify-between gap-1 w-full mt-4">
              <Button
                className="flex items-center gap-4 font-poppins-semibold"
                onClick={handleOpenEditDialog}
                variant="outline"
              >
                <Edit className="w-5 h-5" />
                Edit
              </Button>
              {deleteEvent && (
                <Button
                  disabled={isLoading}
                  onClick={() => deleteEvent(event.id)}
                  className="w-[150px] font-bold"
                  variant="destructive"
                >
                  {isLoading ? <Loader /> : "Delete"}
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <AddEvent
        openDialog={isEditing}
        setOpenDialog={setIsEditing}
        formDefaultValue={formDefaultValue}
        createCalenderEvent={handleEdit}
        isLoading={isEditLoading || false}
        isError={isEditError || false}
        crewList={crewList}
        isEdit={true}
      />
    </>
  );
};

export default EventDialog;
