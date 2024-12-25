import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { customFetch } from "../api";

export const getCrewFileDocumentRooms = async (project_id: string) => {
  return customFetch(`${NEW_API_URL_V2}/files/folders/${project_id}/`, {
    method: "GET",
  });
};

export const getAllFiles = async (room_id: string) => {
  return customFetch(`${NEW_API_URL_V2}/files/folders/details/${room_id}/`, {
    method: "GET",
  });
};
