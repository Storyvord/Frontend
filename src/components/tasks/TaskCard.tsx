"use client";
import { format } from "date-fns";

import { taskFormType, taskType } from "@/types";
import { FC, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, PencilIcon, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CreateTask from "./CreateTask";
import Loader from "../Loader";
import { AnimatedTooltipPreview } from "../AnimatedTooltipPreview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskDetailDialog from "./TaskDetail";

type Status = "not-started" | "initiated" | "in-progress" | "done";

// Map of value to styles
const statusStyles: Record<Status, string> = {
  "not-started": "text-gray-500",
  initiated: "text-blue-500",
  "in-progress": "text-yellow-500",
  done: "text-green-500",
};
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const assignedCrew = crewList?.find((crew) => {
  //   return crew.value == task?.assigned_to;
  // });
  const [selectedValue, setSelectedValue] = useState<Status | null>("not-started");

  return (
    <>
      <Card
        className="min-h-[60px] py-0 px-2 rounded-lg cursor-pointer shadow-sm"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="flex py-2 relative pl-6 gap-2 items-center">
          <div
            className={`absolute top-2 left-2 h-12 w-1.5 ${task.completed ? "bg-green-500" : "bg-yellow-500"}`}
          ></div>
          <div className="flex w-full h-full items-center gap-2 justify-between">
            <div className="flex items-center gap-3">
              <span className=" flex sm:gap-4 flex-col sm:flex-row">
                <h1 className="font-poppins-bold">{task.title}</h1>
              </span>
            </div>
            <div className="flex gap-4 lg:gap-6 xl:gap-8 items-center">
              <div className="hidden sm:block text-center">
                <p className="text-black text-xs font-poppins-semibold">Deadline</p>
                <p className="text-gray-800 text-base font-poppins-bold">
                  {format(task.due_date, "MM/dd/yy")}
                </p>
              </div>
              <div className=" mr-2 flex flex-col justify-center items-center">
                <p className="text-black text-xs font-poppins-semibold">Assign to</p>
                <AnimatedTooltipPreview />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-black text-xs font-poppins-semibold mr-2 z-10">Status</p>
                <Select onValueChange={(value: Status) => setSelectedValue(value)}>
                  <SelectTrigger className="w-fit px-0 -mt-3 bg-transparent border-none focus:ring-0 focus:ring-white">
                    <span
                      className={`${selectedValue ? statusStyles[selectedValue] : ""} font-poppins-bold capitalize`}
                    >
                      {selectedValue ? selectedValue.replace(/-/g, " ") : "Status"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-started" className="text-gray-500">
                      Not Started
                    </SelectItem>
                    <SelectItem value="initiated" className="text-blue-500">
                      Initiated
                    </SelectItem>
                    <SelectItem value="in-progress" className="text-yellow-500">
                      In Progress
                    </SelectItem>
                    <SelectItem value="done" className="text-green-500">
                      Done
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <EllipsisVertical />
              </div>
            </div>
          </div>
        </div>
      </Card>
      <TaskDetailDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </>
  );
};

export default TaskCard;
