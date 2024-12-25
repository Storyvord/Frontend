import { NEW_API_URL_V2 } from "@/constant/constant";
import { customFetch } from "../api";
export const getAllCrewCalenderEvents = async () => {
  return customFetch(`${NEW_API_URL_V2}/calendar/user/calendar/home/`, {
    method: "GET",
  });
};
