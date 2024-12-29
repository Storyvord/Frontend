import { Announcements } from "@/types";
import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { customFetch } from "./api";

export const getAllAnnouncements = async (projectId: string) => {
  return customFetch(
    `${NEW_API_URL_V2}/announcement/v2/project-announcements/?project_id=${projectId}`,
    {
      method: "GET",
    }
  );
};

export const CreateAnnouncement = async (announcementData: Announcements) => {
  return customFetch(`${NEW_API_URL_V2}/announcement/v2/project-announcements/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(announcementData),
  });
};

export const updateAnnouncement = async (announcementData: Announcements) => {
  return customFetch(`${NEW_API_URL_V2}/announcement/v2/project-announcements/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(announcementData),
  });
};

export const deleteAnnouncement = async (id: number) => {
  return customFetch(`${NEW_API_URL_V2}/announcement/v2/project-announcements/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
