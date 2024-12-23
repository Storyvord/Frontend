import { acceptInvitation, getInvitations, rejectInvitation } from "@/lib/api/crew/invitation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetInvitations = () => {
  return useQuery({
    queryKey: ["getInvitations"],
    queryFn: getInvitations,
  });
};

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptInvitation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getInvitations"],
      });
      return data;
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useRejectInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectInvitation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getInvitations"],
      });
      return data;
    },
    onError: (error) => {
      throw error;
    },
  });
};
