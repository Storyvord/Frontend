"use client";

import { taskFormType, taskType } from "@/types";
import { FC, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CreateTask from "./CreateTask";
import Loader from "../Loader";

interface TaskCardProps {
  task: taskType;
  completeTask: (task: taskType) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, task: any) => void;
  crewList: { value: number; label: string }[];
  approveTaskCompletion: (taskId: number) => void;
  isLoading: boolean;
}

const TaskCard: FC<TaskCardProps> = ({
  task,
  completeTask,
  deleteTask,
  editTask,
  crewList,
  approveTaskCompletion,
  isLoading,
}) => {
  const [formOpen, setFormOpen] = useState(false);
  // const assignedCrew = crewList?.find((crew) => {
  //   return crew.value == task?.assigned_to;
  // });
  return (
    <Card className="min-h-[60px] py-0 px-2 rounded-sm">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <div className="flex py-2 relative pl-6 gap-2 items-center">
            <div
              className={`absolute top-2 left-2 h-[47px] w-[6px] ${task.completed ? "bg-green-500" : "bg-yellow-500"}`}
            ></div>
            <div className="flex w-full h-full items-center gap-2 justify-between">
              <div className="flex items-center gap-3">
                <Checkbox checked={task.completed} onClick={() => completeTask(task)} />
                <span className=" flex sm:gap-4 flex-col sm:flex-row">
                  <h1 className="font-sans text-gray-700 font-bold">{task.title}</h1>
                  {/* {assignedCrew?.label && (
                    <h3 className=" text-sm text-gray-600">Assign to: {assignedCrew?.label}</h3>
                  )} */}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="hidden sm:block font-sans mr-10 text-center">
                  <p className="text-black text-[10px]">Task Deadline</p>
                  <p className="text-gray-500 text-[14px]">{task.due_date}</p>
                </div>
                <Button variant="outline" size="icon" onClick={() => setFormOpen(!formOpen)}>
                  <PencilIcon className="w-5 h-5" />
                </Button>
                <CreateTask
                  formOpen={formOpen}
                  handleSubmission={(newTask) => editTask(task.id, newTask)}
                  taskEditing={task}
                  setFormOpen={setFormOpen}
                  crewList={crewList}
                />
                <Button variant="destructive" size="icon" onClick={() => deleteTask(task.id)}>
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <AccordionTrigger className=""></AccordionTrigger>
          </div>
          <AccordionContent>
            <div className=" flex justify-between gap-2">
              <p className="text-gray-500">
                <span className="font-sans text-gray-700 font-bold text-[14px] mr-1">
                  Task Description:{" "}
                </span>
                {task.description}
              </p>
              {!task.completed && task.completion_requested && (
                <Button
                  onClick={() => approveTaskCompletion(task.id)}
                  size="sm"
                  variant="outline"
                  className=" border-green-700"
                >
                  {isLoading ? <Loader /> : "Approve"}
                </Button>
              )}
            </div>
            <p className="text-gray-500 sm:hidden">
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

export default TaskCard;
