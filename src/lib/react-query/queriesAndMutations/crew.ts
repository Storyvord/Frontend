import { getCrewFullProfile, getInvitedCrewList, sentInvitationToCrew } from "@/lib/api/crew";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useSentInvitationToCrew = () => {
  return useMutation({
    mutationFn: sentInvitationToCrew,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useGetCrewList = (projectId: string) => {
  return useQuery({
    queryKey: ["getInvitedCrewList", projectId],
    queryFn: () => getInvitedCrewList(projectId),
  });
};

export const useGetCrewFullProfile = (crewId: number) => {
  return useQuery({
    queryKey: ["getCrewFullProfile", crewId],
    queryFn: () => getCrewFullProfile(crewId),
  });
};
