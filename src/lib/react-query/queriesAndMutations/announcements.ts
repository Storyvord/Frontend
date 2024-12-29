import {
  CreateAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  updateAnnouncement,
} from "@/lib/api/announcements";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * The function `useGetAllAnnouncements` returns a query for fetching all announcements.
 * @returns A custom hook named `useGetAllAnnouncements` is being returned. This hook uses the
 * `useQuery` function from an external library and configures it to fetch all announcements by
 * providing a query key and a query function.
 */
export const useGetAllAnnouncements = (projectId: string) => {
  return useQuery({
    queryKey: ["getAllAnnouncements"],
    queryFn: () => getAllAnnouncements(projectId),
  });
};

/**
 * The useCreateAnnouncement function is a custom hook in TypeScript that uses useMutation to create an
 * announcement and invalidate the getAllAnnouncements query on success.
 * @returns The `useCreateAnnouncement` custom hook is being returned. This hook uses `useMutation`
 * from React Query to handle the creation of an announcement. It calls the `CreateAnnouncement`
 * function as the mutation function, invalidates the "getAllAnnouncements" query key in the query
 * client on success, and logs an error message to the console on error.
 */
export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateAnnouncement,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllAnnouncements"],
      });
      return data;
    },
  });
};
export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAnnouncement,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllAnnouncements"],
      });
      return data;
    },
  });
};

/**
 * The useDeleteAnnouncement function is a custom hook in TypeScript that uses useMutation to delete an
 * announcement and invalidate the getAllAnnouncements query in the queryClient on success.
 * @returns The `useDeleteAnnouncement` custom hook is being returned. This hook uses `useMutation`
 * from React Query to handle the deletion of an announcement. It calls the `deleteAnnouncement`
 * function as the mutation function, invalidates the "getAllAnnouncements" query key in the query
 * client on success, and logs an error message if there is an error during the deletion process.
 */
export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllAnnouncements"],
      });
      return data;
    },
  });
};
