import {
  getCrewFullProfile,
  getCrewInviteLists,
  getInvitedCrewList,
  searchCrew,
  sentInvitationToCrew,
  sentInvitationToCrewEmail,
} from "@/lib/api/crew";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useSentInvitationToCrew = () => {
  return useMutation({
    mutationFn: sentInvitationToCrew,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useSentInvitationToCrewEmail = () => {
  return useMutation({
    mutationFn: sentInvitationToCrewEmail,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useGetCrewList = (projectId: string) => {
  return useQuery({
    queryKey: ["getInvitedCrewList", projectId],
    queryFn: () => getInvitedCrewList(projectId),
  });
};

export const useGetCrewFullProfile = (crewId: string) => {
  return useQuery({
    queryKey: ["getCrewFullProfile", crewId],
    queryFn: () => getCrewFullProfile(crewId),
  });
};

export const useGetCrewInviteLists = (projectId: string) => {
  return useQuery({
    queryKey: ["getCrewFullProfile", projectId],
    queryFn: () => getCrewInviteLists(projectId),
  });
};

export const useSearchCrew = () => {
  return useMutation({
    mutationFn: searchCrew,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      throw error;
    },
  });
};
