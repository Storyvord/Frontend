"use client";
import { FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const taskNavbarMenu = [
  {
    name: "All Task",
    type: "all-task",
  },
  {
    name: "My Task",
    type: "my-task",
  },
  {
    name: "Pending Task",
    type: "pending-task",
  },
  {
    name: "Request Approval",
    type: "requested-approval",
  },
  {
    name: "Completed Task",
    type: "completed-task",
  },
];

interface TaskNavbarProps {
  taskFilter: string;
  setTaskFilter: (type: string) => void;
}

const TaskNavbar: FC<TaskNavbarProps> = ({ taskFilter, setTaskFilter }) => {
  return (
    //code a for a navbar
    <Tabs defaultValue="all-task" className="w-full hover:overflow-x-scroll">
      <TabsList className=" bg-transparent">
        {taskNavbarMenu.map((item) => {
          return (
            <TabsTrigger
              key={item.name}
              onClick={() => setTaskFilter(item.type)}
              className={`${taskFilter == item.type ? "active" : ""}`}
              value={item.type}
            >
              <h1>{item.name}</h1>
            </TabsTrigger>
          );
        })}
      </TabsList>
      <hr className=" hidden md:block my-2" />
    </Tabs>
  );
};

export default TaskNavbar;
