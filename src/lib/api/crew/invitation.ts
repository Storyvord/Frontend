import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { customFetch } from "../api";

export const getInvitations = async () => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/get_invites/`, {
    method: "GET",
  });
};

export const acceptInvitation = async (inviteId: string) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/invites/${inviteId}/respond/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "accept" }),
  });
};

export const rejectInvitation = async (inviteId: string) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/invites/${inviteId}/respond/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "reject" }),
  });
};
