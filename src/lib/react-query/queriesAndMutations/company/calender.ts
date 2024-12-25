import {
  createCompanyCalenderEvent,
  deleteCompanyCalenderEvent,
  editCompanyCalenderEvent,
  getCompanyCalenderEvents,
} from "@/lib/api/company/calender";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * The function `useGetCompanyCalenderEvents` returns a query for fetching company calendar events.
 * @returns A custom hook named `useGetCompanyCalenderEvents` is being returned. This hook uses the
 * `useQuery` function from a library like React Query to fetch company calendar events by calling the
 * `getCompanyCalenderEvents` function. The hook sets the query key as `["getCompanyCalenderEvents"]`
 * to identify the query.
 */
export const useGetCompanyCalenderEvents = () => {
  return useQuery({
    queryKey: ["getCompanyCalenderEvents"],
    queryFn: getCompanyCalenderEvents,
  });
};

/**
 * The function `useCreateCompanyCalenderEvents` is a custom hook in TypeScript that uses `useMutation`
 * to create company calendar events and invalidates the query for fetching calendar events on success.
 * @returns The `useCreateCompanyCalenderEvents` custom hook is being returned. This hook uses
 * `useMutation` from React Query to handle the creation of company calendar events. It calls the
 * `createCompanyCalenderEvent` function as the mutation function, invalidates the
 * "getCompanyCalenderEvents" query key on success, and logs an error message to the console on error.
 */
export const useCreateCompanyCalenderEvents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCompanyCalenderEvent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyCalenderEvents"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllCalenderEvents"],
      });
      return data;
    },
  });
};

/**
 * The function `useDeleteCompanyCalenderEvent` is a custom hook in TypeScript that uses `useMutation`
 * to delete a company calendar event and invalidates the corresponding query key on success.
 * @returns The `useDeleteCompanyCalenderEvent` custom hook is being returned. This hook uses
 * `useMutation` from React Query to handle the deletion of a company calendar event. It invalidates
 * the "getCompanyCalenderEvents" query in the `onSuccess` callback when the deletion is successful. In
 * case of an error, it logs an error message to the console.
 */
export const useDeleteCompanyCalenderEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompanyCalenderEvent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyCalenderEvents"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllCalenderEvents"],
      });
      return data;
    },
  });
};

export const useEditCompanyCalenderEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editCompanyCalenderEvent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyCalenderEvents"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllCalenderEvents"],
      });
      return data;
    },
  });
};
