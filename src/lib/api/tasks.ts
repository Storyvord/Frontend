import { taskFormType, taskType } from "@/types";
import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { customFetch } from "./api";

export const getTasks = async (project_id: string) => {
  // return customFetch(`${USER_API}/api/tasks/projects/${project_id}/tasks/`, {
  //   method: "GET",
  // });
  return customFetch(`${NEW_API_URL_V2}/tasks/v2/tasks/`, {
    method: "GET",
  });
};

export const getProjectTasks = async (projectId: string) => {
  return customFetch(`${NEW_API_URL_V2}/tasks/v2/tasks/${projectId}/`, {
    method: "GET",
  });
};

export const createNewTask = async ({
  taskData,
  projectId,
}: {
  taskData: taskFormType;
  projectId: string;
}) => {
  return customFetch(`${NEW_API_URL_V2}/tasks/v2/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
};

export const deleteTask = async (taskId: number) => {
  return customFetch(`${NEW_API_URL_V2}/tasks/v2/tasks/${taskId}/`, {
    method: "DELETE",
  });
};

export const completeTask = async ({
  taskId,
  taskData,
}: {
  taskId: number;
  taskData: taskType;
}) => {
  return customFetch(`${NEW_API_URL_V2}/tasks/v2/tasks/${taskId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
};

export const taskCompletionApproval = async (taskId: number) => {
  return customFetch(`${USER_API}/api/tasks/tasks/${taskId}/approve-completion/`, {
    method: "POST",
  });
};
