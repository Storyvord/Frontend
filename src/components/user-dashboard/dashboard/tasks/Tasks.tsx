"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { taskFormType } from "@/types";
import ShowTasks from "./ShowTasks";
import CreateTask from "@/components/tasks/CreateTask";
import { useCreateNewCompanyTask } from "@/lib/react-query/queriesAndMutations/company/tasks";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

type Props = {
  employeeList: { value: number; label: string }[];
};

const Tasks = ({ employeeList }: Props) => {
  const [formOpen, setFormOpen] = useState(false);
  const { toast } = useToast();

  const { mutateAsync: createTaskMutation } = useCreateNewCompanyTask();

  const createTask = async (task: taskFormType) => {
    const newTask = {
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      assigned_to: task.assigned_to,
    };

    const res = await createTaskMutation(newTask);
    if (res) {
      toast({ title: "Task created" });
    } else {
      toast({ title: "Failed to create new task", variant: "destructive" });
    }
  };
  return (
    <div className=" p-2">
      <header className=" flex justify-between items-center">
        <span className=" flex gap-2 items-center">
          <Image height={20} width={20} src="/icons/task.svg" alt="plus-icon" />
          <h1 className=" text-lg md:text-lg">My Task</h1>
        </span>
        <Button onClick={() => setFormOpen(true)} className=" flex gap-2">
          <Image height={20} width={20} src="/icons/plus-2.svg" alt="plus-icon" /> Add Task
        </Button>
      </header>
      <ShowTasks />
      <CreateTask
        setFormOpen={setFormOpen}
        formOpen={formOpen}
        handleSubmission={createTask}
        crewList={employeeList}
      />
    </div>
  );
};

export default Tasks;
