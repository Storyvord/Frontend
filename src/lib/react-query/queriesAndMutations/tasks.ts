import {
  completeTask,
  createNewTask,
  deleteTask,
  getProjectTasks,
  getTasks,
  taskCompletionApproval,
} from "@/lib/api/tasks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetTasks = (projectId: string) => {
  return useQuery({
    queryKey: ["getTasks", projectId],
    queryFn: ({ queryKey }) => {
      const [_key, projectId] = queryKey;
      return getTasks(projectId);
    },
  });
};

export const useGetProjectTasks = (projectId: string) => {
  return useQuery({
    queryKey: ["getProjectTasks", projectId],
    queryFn: ({ queryKey }) => {
      const [_key, projectId] = queryKey;
      return getProjectTasks(projectId);
    },
  });
};

export const useCreateNewTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getProjectTasks"],
      });
      return data;
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getProjectTasks"],
      });
    },
  });
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getProjectTasks"],
      });
      return data;
    },
  });
};

export const useTaskCompletionApproval = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: taskCompletionApproval,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getProjectTasks"],
      });
      return data;
    },
  });
};
