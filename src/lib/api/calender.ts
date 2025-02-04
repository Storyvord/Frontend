import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { CalenderFormType } from "@/types";
import Cookies from "js-cookie";
import { customFetch } from "./api";

export const getAllCalenderEvents = async (projectId: string) => {
  return customFetch(`${NEW_API_URL_V2}/calendar/calendars/${projectId}/events/`, {
    method: "GET",
  });
};

export const createCalenderEvent = async ({
  eventData,
  projectId,
}: {
  eventData: CalenderFormType;
  projectId: string;
}) => {
  return customFetch(`${NEW_API_URL_V2}/calendar/calendars/${projectId}/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
};

export const editCalenderEvent = async ({
  projectId,
  eventId,
  eventData,
}: {
  projectId: string;
  eventId: number | null;
  eventData: CalenderFormType;
}) => {
  return customFetch(`${NEW_API_URL_V2}/calendar/calendars/${projectId}/events/${eventId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
};

export const deleteCalenderEvent = async ({
  projectId,
  eventId,
}: {
  projectId: string;
  eventId: number | null;
}) => {
  return customFetch(`${NEW_API_URL_V2}/calendar/calendars/${projectId}/events/${eventId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
