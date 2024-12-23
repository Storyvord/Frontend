import {
  getNewAccessToken,
  getUserDetails,
  getUserProfile,
  registerUser,
  userSignIn,
} from "@/lib/api/auth/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useUserSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userSignIn,
    onSuccess: (data) => {
      Cookies.set("accessToken", data?.data?.tokens?.access);
      Cookies.set("refreshToken", data?.data?.tokens?.refresh);
      queryClient.invalidateQueries({
        queryKey: ["getProjects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userDetails"],
      });
      return data;
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("No auth token found");
      }
      return await getUserDetails(token);
    },
    enabled: !!Cookies.get("accessToken"), // Only fetch if token exists
    // cacheTime: 0, // Disable caching
    staleTime: 0, // Data is always considered stale
  });
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });
};
