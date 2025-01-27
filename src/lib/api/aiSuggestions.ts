import { NEW_API_URL_V2 } from "@/constant/constant";
import { customFetch } from "./api";

const regenerate = [
  "logistics",
  "crew",
  "budget",
  "compliance",
  "culture",
  "sustainability",
  "suppliers",
];

export const getSuggestions = async (projectId: string) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/get_suggestion/?project_id=${projectId}`, {
    method: "GET",
  });
};

export const startAiWork = async (projectId: string) => {
  return customFetch(
    `${NEW_API_URL_V2}/project/v2/ai_suggestion/?regenerate=${regenerate}&project_id=${projectId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getAiWorkStatus = async (taskId: string) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/taskstatus/?task_id=${taskId}`, {
    method: "GET",
  });
};

export const getRequirements = async (reqId: string) => {
  return customFetch(`${NEW_API_URL_V2}/v2/requirement/?req_id=${reqId}`, {
    method: "GET",
  });
};
