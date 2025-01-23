"use client";
import { useGetCompanyTasks } from "@/lib/react-query/queriesAndMutations/company/tasks";
import { useGetCrewTasks } from "@/lib/react-query/queriesAndMutations/crew/tasks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ShowTasks = () => {
  const { data: tasksList, isPending, isError } = useGetCrewTasks();
  return (
    <div className=" bg-white rounded-xl mt-2 p-3">
      {tasksList?.length === 0 && <p className=" text-center text-gray-500">No tasks found</p>}
      {tasksList?.data?.tasks?.map((task: any) => (
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
      <Link href="/crew/tasks" className=" grid place-content-end cursor-pointer">
        <Image height={30} width={30} src="/icons/right-arrow.svg" alt="arrow" className=" mt-3" />
      </Link>
    </div>
  );
};

export default ShowTasks;
