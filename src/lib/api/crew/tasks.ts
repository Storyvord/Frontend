import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { customFetch } from "../api";

export const getCrewTasks = async () => {
  return customFetch(`${NEW_API_URL_V2}/tasks/v2/tasks/`, {
    method: "GET",
  });
};

export const requestApprovalForTask = async (taskId: number) => {
  return customFetch(`${USER_API}/api/tasks/tasks/${taskId}/request-completion/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completion_requested: true }),
  });
};
