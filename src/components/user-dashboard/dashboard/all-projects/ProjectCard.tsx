"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useGetCompanyTasks } from "@/lib/react-query/queriesAndMutations/company/tasks";
import { cn } from "@/lib/utils";

const tasksList = [
  { id: 1, title: "Create Shooting Schedule Outline", completed: true },
  { id: 2, title: "Coordinate Schedule with Departments", completed: false },
];

const ProjectCard = () => {
  // const { data: tasksList, isPending, isError } = useGetCompanyTasks();

  return (
    <div className=" bg-white rounded-xl p-3">
      {tasksList?.map((task: any) => (
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

export default ProjectCard;
