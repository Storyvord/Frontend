"use client";
import React from "react";
import { useGetCompanyTasks } from "@/lib/react-query/queriesAndMutations/company/tasks";
import { cn } from "@/lib/utils";
import { useGetProjectTasks, useGetTasks } from "@/lib/react-query/queriesAndMutations/tasks";
import { useParams } from "next/navigation";

const ShowTasks = () => {
  const { id: projectId }: { id: string } = useParams();
  const { data: tasksList, isPending: isLoadingTask } = useGetProjectTasks(projectId);
  return (
    <div className=" bg-white rounded-xl mt-0 p-3">
      {(tasksList?.data?.length === 0 || !tasksList) && (
        <p className=" text-center text-gray-500">No tasks found</p>
      )}
      {tasksList?.data?.map((task: any) => (
        <div
          key={task.id}
          className=" bg-gray-100 p-2 flex justify-between items-center mt-2 rounded-md"
        >
          <p>{task.title}</p>
          <p
            className={cn(
              "px-2 py-1 rounded-md bg-gray-200 text-sm",
              task.completed ? "text-green-500" : "text-yellow-500"
            )}
          >
            {task.completed ? "Completed" : "Pending"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShowTasks;
