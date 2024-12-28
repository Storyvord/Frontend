"use client";

import { taskType } from "@/types";
import { FC } from "react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import Loader from "../Loader";

interface TaskCardProps {
  task: taskType;
  handleRequestApproval: (taskId: number) => void;
  isLoading: boolean;
}

const AssignTaskCard: FC<TaskCardProps> = ({ task, handleRequestApproval, isLoading }) => {
  return (
    <Card className="min-h-[60px] py-0 px-2 rounded-sm mt-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <div className="flex py-2 relative pl-6 gap-2 items-center">
            <div
              className={`absolute top-2 left-2 h-[47px] w-[6px] ${task.is_completed ? "bg-green-500" : "bg-yellow-500"}`}
            ></div>
            <div className="flex w-full h-full items-center gap-2 justify-between">
              <div className="flex items-center gap-3">
                <span className=" sm:flex gap-12">
                  <h1 className="font-sans text-gray-700 font-bold text-[14px] sm:text-[16px]">
                    {task.title}
                  </h1>
                  {/* temporary comments */}
                  {/* {task.project && <h3 className="text-sm">Project:- {task.project.name}</h3>} */}
                  {/* {task.created_by } */}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                {task?.completion_requested && (
                  <p className=" my-2 text-center hidden lg:block text-sm font-bold text-orange-400">
                    You have requested this task for approval.
                  </p>
                )}
                {!task?.completion_requested && !task.is_completed && (
                  <Button
                    className="hidden md:block"
                    onClick={() => handleRequestApproval(task.id)}
                    variant="outline"
                    size="sm"
                  >
                    {isLoading ? <Loader /> : " Request completion"}
                  </Button>
                )}
                <span className=" text-gray-500 text-sm mr-4">
                  {task.is_completed ? "Completed" : "Pending"}
                </span>
                <div className="hidden sm:block font-sans mr-10 text-center">
                  <p className="text-black text-[10px]">Task Deadline</p>
                  <p className="text-gray-500 text-[14px]">{task.due_date}</p>
                </div>
              </div>
            </div>
            <AccordionTrigger className=""></AccordionTrigger>
          </div>
          <AccordionContent>
            {task?.completion_requested && (
              <p className=" my-2 block lg:hidden text-center text-sm font-bold text-orange-400">
                You have requested this task for approval.
              </p>
            )}
            <div className=" flex justify-between">
              <p className="text-gray-500">
                <span className="font-sans text-gray-700 font-bold text-[14px] mr-1">
                  Task Description:
                </span>
                {task.description}
              </p>
              {!task?.completion_requested && !task.is_completed && (
                <Button
                  className="md:hidden"
                  onClick={() => handleRequestApproval(task.id)}
                  variant="outline"
                  size="sm"
                >
                  {isLoading ? <Loader /> : " Request completion"}
                </Button>
              )}
            </div>
            <p className="text-gray-500 sm:hidden mt-2">
              <span className="font-sans text-gray-700 font-bold text-[14px] mr-1">
                Task DeadLine:{" "}
              </span>
              {task.due_date}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default AssignTaskCard;
