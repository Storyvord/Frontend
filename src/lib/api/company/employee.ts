import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { customFetch } from "../api";

export const sentInvitationToEmployee = async (formData: any) => {
  return customFetch(`${NEW_API_URL_V2}/referral/company/invite/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const getOnBoardedEmployeeList = async (companyID: number) => {
  return customFetch(`${NEW_API_URL_V2}/client/company-profile/employees/${companyID}/`, {
    method: "GET",
  });
};

export const getReceivedInvitationsList = async () => {
  return customFetch(`${NEW_API_URL_V2}/referral/company/invitations/`, {
    method: "GET",
  });
};
export const getSendInvitationsList = async () => {
  return customFetch(`${NEW_API_URL_V2}/referral/company/client/employee-invitations/`, {
    method: "GET",
  });
};

export const acceptCompanyInvitation = async (referralCode: string) => {
  return customFetch(
    `${NEW_API_URL_V2}/referral/company/invitations/accept/?referral_code=${referralCode}`,
    {
      method: "GET",
    }
  );
};

export const rejectCompanyInvitation = async (referralCode: string) => {
  return customFetch(
    `${NEW_API_URL_V2}/referral/company/invitations/reject/?referral_code=${referralCode}`,
    {
      method: "GET",
    }
  );
};
