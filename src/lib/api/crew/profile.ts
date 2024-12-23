import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import {
  CreditsFormFields,
  EducationFormType,
  EndorsementFormType,
  PortfolioFormData,
  ProfileFormData,
  SocialLinkFormType,
} from "@/types/crew";
import Cookies from "js-cookie";
import { customFetch } from "../api";

export const createProfile = async (profileData: ProfileFormData) => {
  return customFetch(`${NEW_API_URL_V2}/crew/crew-profile/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });
};

export const createPortfolio = async (portfolioData: PortfolioFormData) => {
  return customFetch(`${NEW_API_URL_V2}/crew/portfolios/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(portfolioData),
  });
};

export const createEducation = async (educationData: EducationFormType & { crew: number }) => {
  return customFetch(`${NEW_API_URL_V2}/crew/crew-education/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(educationData),
  });
};

export const createSocialLink = async (socialLinkData: SocialLinkFormType & { crew: number }) => {
  return customFetch(`${NEW_API_URL_V2}/crew/social-links/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(socialLinkData),
  });
};

export const createEndorsement = async (
  endorsementData: EndorsementFormType & { crew: number }
) => {
  return customFetch(`${NEW_API_URL_V2}/crew/endorsement-from-peers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(endorsementData),
  });
};

export const createCredit = async (creditData: CreditsFormFields & { crew: number }) => {
  return customFetch(`${NEW_API_URL_V2}/crew/crew-credits/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creditData),
  });
};

/////////////////////////////get details////////////////

export const getProfile = async () => {
  return customFetch(`${NEW_API_URL_V2}/crew/crew-profile/`, {
    method: "GET",
  });
};

export const getPortfolio = async () => {
  return customFetch(`${NEW_API_URL_V2}/crew/portfolios/`, {
    method: "GET",
  });
};

export const getEducation = async () => {
  return customFetch(`${NEW_API_URL_V2}/crew/crew-education/`, {
    method: "GET",
  });
};

export const getSocialLink = async () => {
  return customFetch(`${NEW_API_URL_V2}/crew/social-links/`, {
    method: "GET",
  });
};

export const getEndorsement = async () => {
  return customFetch(`${NEW_API_URL_V2}/crew/endorsement-from-peers/`, {
    method: "GET",
  });
};

export const getCredit = async () => {
  return customFetch(`${NEW_API_URL_V2}/crew/crew-credits/`, {
    method: "GET",
  });
};

//////////////////////////////////////////////////////////////////////
export const updatePortfolio = async ({
  portfolioData,
  id,
}: {
  portfolioData: PortfolioFormData;
  id: number;
}) => {
  return customFetch(`${NEW_API_URL_V2}/crew/portfolios/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(portfolioData),
  });
};

export const updateEducation = async ({
  educationData,
  id,
}: {
  educationData: EducationFormType;
  id: number;
}) => {
  return customFetch(`${NEW_API_URL_V2}/crew/crew-education/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(educationData),
  });
};

export const updateSocialLink = async ({
  socialLinkData,
  id,
}: {
  socialLinkData: SocialLinkFormType;
  id: number;
}) => {
  return customFetch(`${NEW_API_URL_V2}/crew/social-links/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(socialLinkData),
  });
};

export const updateEndorsement = async ({
  endorsementData,
  id,
}: {
  endorsementData: EndorsementFormType;
  id: number;
}) => {
  return customFetch(`${NEW_API_URL_V2}/crew/endorsement-from-peers/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(endorsementData),
  });
};

export const updateCredit = async ({
  creditData,
  id,
}: {
  creditData: CreditsFormFields;
  id: number;
}) => {
  return customFetch(`${NEW_API_URL_V2}/crew/crew-credits/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creditData),
  });
};

// Delete functions for each resource
export const deletePortfolio = async (id: number) => {
  return customFetch(`${NEW_API_URL_V2}/crew/portfolios/${id}/`, {
    method: "DELETE",
  });
};

export const deleteEducation = async (id: number) => {
  return customFetch(`${NEW_API_URL_V2}/crew/crew-education/${id}/`, {
    method: "DELETE",
  });
};

export const deleteSocialLink = async (id: number) => {
  return customFetch(`${NEW_API_URL_V2}/crew/social-links/${id}/`, {
    method: "DELETE",
  });
};

export const deleteEndorsement = async (id: number) => {
  return customFetch(`${NEW_API_URL_V2}/crew/endorsement-from-peers/${id}/`, {
    method: "DELETE",
  });
};

export const deleteCredit = async (id: number) => {
  return customFetch(`${NEW_API_URL_V2}/crew/crew-credits/${id}/`, {
    method: "DELETE",
  });
};
