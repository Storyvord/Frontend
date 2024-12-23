import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { customFetch } from "./api";

export const sentInvitationToCrew = async ({
  projectId,
  userId,
  roleId,
}: {
  projectId: string;
  userId: number;
  roleId?: string;
}) => {
  return customFetch(`${USER_API}/project/v2/projects/${projectId}/add_member/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      role_id: roleId || "2",
    }),
  });
};

export const getInvitedCrewList = async (projectId: string) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/memberships/?project_id=${projectId}`, {
    method: "GET",
  });
};

export const getCrewFullProfile = async (crewId: string) => {
  return customFetch(`${NEW_API_URL_V2}/crew/crew-list/${crewId}/`, {
    method: "GET",
  });
};

export const searchCrew = async ({
  location,
  service,
  name,
}: {
  location: string;
  service: string;
  name: string;
}) => {
  return customFetch(`${NEW_API_URL_V2}/crew/crew-profile/search/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      location,
      skills: service,
      name,
    }),
  });
};
