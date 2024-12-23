import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import Cookies from "js-cookie";
import { customFetch } from "../api";

export const registerUser = async (data: {
  email: string;
  // userType: string;
  password: string;
  confirmPassword: string;
  agreePolicy: boolean;
}) => {
  const signUpUserData = {
    // user_type: data.userType,
    email: data.email,
    password: data.password,
    confirm_password: data.confirmPassword,
    terms_accepted: data.agreePolicy,
  };
  const res = await fetch(`${NEW_API_URL_V2}/accounts/v2/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpUserData),
  });
  if (!res.ok) {
    const errorData = await res.json(); // Extract error message from response
    throw errorData;
  }
  return res.json();
};

export const userSignIn = async ({ email, password }: { email: string; password: string }) => {
  // const res = await fetch(`${USER_API}/auth/jwt/create/`, {
  const res = await fetch(`${NEW_API_URL_V2}/accounts/v2/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const errorData = await res.json(); // Extract error message from response
    throw errorData;
  }
  return res.json();
};

export const userLogout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("isClient");
  localStorage.clear();
  location.replace("/auth/sign-in");

  return null;
};

export const getUserDetails = async (token: string) => {
  const res = await fetch(`${USER_API}/api/accounts/api/user/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }
  return await res.json();
};

export const getUserProfile = async () => {
  return customFetch(`${NEW_API_URL_V2}/accounts/v2/getprofile/`, {
    method: "GET",
  });
};

export const getNewAccessToken = async () => {
  const refreshToken = Cookies.get("refreshToken");
  const res = await fetch(`${NEW_API_URL_V2}/accounts/v2/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });
  if (!res.ok) {
    throw new Error("Failed to refresh access token");
  }
  return res.json();
};
