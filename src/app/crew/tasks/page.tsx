"use client";
import React, { useState } from "react";
import {
  useGetCrewTasks,
  useRequestApprovalForTask,
} from "@/lib/react-query/queriesAndMutations/crew/tasks";
import { taskType } from "@/types";
import Tabs from "@/components/Tabs";
import { useToast } from "@/components/ui/use-toast";
import TaskSkeleton from "@/components/TaskSkeleton";
import AssignTaskCard from "@/components/tasks/AssignTaskCard";

const tabs = ["All Tasks", "Pending", "completed"];
const Tasks = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { toast } = useToast();
  const { data: tasks, isLoading: isLoadingTask } = useGetCrewTasks();
  const { mutateAsync, isPending, isError } = useRequestApprovalForTask();

  const handleRequestApproval = async (taskId: number) => {
    const res = await mutateAsync(taskId);
    if (res) {
      toast({
        title: "Success fully send approval request",
        description: "It will approved by your project producer",
      });
    } else {
      toast({ title: "Failed to send approval request", variant: "destructive" });
    }
  };

  return (
    <div className=" w-full">
      <h1 className=" text-2xl text-gray-800 font-semibold">Tasks</h1>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className="mb-4" />
      {tasks?.length === 0 && (
        <h1 className=" text-xl text-center text-gray-600 mt-4">No task found</h1>
      )}
      {isLoadingTask && <TaskSkeleton />}
      {activeTab === tabs[0] &&
        tasks?.data?.tasks?.map((task: taskType) => (
          <AssignTaskCard
            key={task.id}
            handleRequestApproval={handleRequestApproval}
            isLoading={isPending}
            task={task}
          />
        ))}
      {activeTab === tabs[1] &&
        tasks?.data?.tasks?.map((task: taskType) => {
          if (!task?.is_completed) {
            return (
              <AssignTaskCard
                key={task.id}
                handleRequestApproval={handleRequestApproval}
                isLoading={isPending}
                task={task}
              />
            );
          }
        })}
      {activeTab === tabs[2] &&
        tasks?.data?.tasks?.map((task: taskType) => {
          if (task?.is_completed) {
            return (
              <AssignTaskCard
                key={task.id}
                handleRequestApproval={handleRequestApproval}
                isLoading={isPending}
                task={task}
              />
            );
          }
        })}
    </div>
  );
};

export default Tasks;
