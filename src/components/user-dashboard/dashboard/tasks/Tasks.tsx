"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { taskFormType } from "@/types";
import ShowTasks from "./ShowTasks";
import CreateTask from "@/components/tasks/CreateTask";
import { useCreateNewCompanyTask } from "@/lib/react-query/queriesAndMutations/company/tasks";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { formatError } from "@/lib/utils";

type Props = {
  employeeList: { value: number; label: string }[];
};

const Tasks = ({ employeeList }: Props) => {
  const [formOpen, setFormOpen] = useState(false);
  const { toast } = useToast();

  const t = useTranslations("Dashboard");

  const { mutateAsync: createTaskMutation } = useCreateNewCompanyTask();

  const createTask = async (task: taskFormType) => {
    const newTask = {
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      assigned_to: task.assigned_to,
    };

    try {
      const res = await createTaskMutation(newTask);
      toast({ title: "Task created" });
    } catch (error) {
      const { title, description } = formatError(error);
      toast({
        title,
        description,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="md:col-span-2 md:col-start-1 flex flex-col">
      <header className="flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <Image height={20} width={20} src="/icons/task.svg" alt="plus-icon" />
          <h1 className="text-lg md:text-xl">{t("my-tasks")}</h1>
        </span>
        <Button
          onClick={() => setFormOpen(true)}
          className="flex gap-2 bg-transparent border-gray-500 rounded-sm h-10"
          variant="outline"
          size="sm"
        >
          <Image height={20} width={20} src="/icons/plus.svg" alt="plus-icon" /> {t("button.task")}
        </Button>
      </header>
      {/* Scrollable content */}
      <div className="overflow-y-auto mt-4 border flex-1 bg-white rounded-3xl">
        <ShowTasks />
        <CreateTask
          setFormOpen={setFormOpen}
          formOpen={formOpen}
          handleSubmission={createTask}
          crewList={employeeList}
        />
      </div>
    </div>
  );
};

export default Tasks;
