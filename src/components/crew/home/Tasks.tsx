"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { taskFormType } from "@/types";
import CreateTask from "@/components/tasks/CreateTask";
import { useCreateNewCompanyTask } from "@/lib/react-query/queriesAndMutations/company/tasks";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ShowTasks from "./ShowTasks";

const Tasks = () => {
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

    const res = await createTaskMutation(newTask);
    if (res) {
      toast({ title: "Task created" });
    } else {
      toast({ title: "Failed to create new task", variant: "destructive" });
    }
  };

  return (
    <section className="h-full mt-8 md:mt-0">
      {/* Header */}
      <header className="flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <Image height={20} width={20} src="/icons/task.svg" alt="Task icon" />
          <h1 className="text-lg md:text-lg">{t("my-tasks")}</h1>
        </span>
        <Button
          onClick={() => setFormOpen(true)}
          className="flex gap-2 rounded-sm border border-gray-600 bg-transparent"
          size="sm"
          variant="outline"
        >
          <Image height={20} width={20} src="/icons/plus.svg" alt="Add icon" />
          {t("button.task")}
        </Button>
      </header>

      {/* Content Section */}
      <div className="border bg-white rounded-3xl p-4 w-full mt-3">
        {/* Scrollable section */}
        <section className="overflow-y-auto max-h-96 min-h-40 p-2 space-y-4">
          <ShowTasks />
        </section>
        {/* Create Task Modal */}
        <CreateTask setFormOpen={setFormOpen} formOpen={formOpen} handleSubmission={createTask} />
      </div>
    </section>
  );
};

export default Tasks;
