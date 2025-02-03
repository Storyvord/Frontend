import { taskType } from "@/types";
import { FC, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema } from "@/lib/validation";
import RenderFormFields, { FormFieldConfig } from "../form-component/RenderFormFields";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { z } from "zod";

export type taskFormType = z.infer<typeof taskFormSchema>;

const taskStatus = [
  { value: "not-started", label: "Not Started" },
  { value: "initiated", label: "Initiated" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const formFields: FormFieldConfig<taskFormType>[] = [
  {
    name: "title",
    label: "Task Title",
    type: "text",
    placeholder: "Enter task title",
    layout: "row",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Task status",
    options: taskStatus,
    layout: "row",
  },
  {
    name: "due_date",
    label: "Task Deadline",
    type: "date",
    layout: "row",
  },
  {
    name: "tags",
    label: "Tags",
    type: "select",
    placeholder: "Task tags",
    options: taskStatus,
    layout: "row",
  },
  {
    name: "created_by",
    label: "Created By",
    type: "select",
    isMulti: true,
    options: [],
    layout: "row",
  },
  {
    name: "assigned_to",
    label: "Assign To",
    type: "select",
    isMulti: true,
    options: [],
    layout: "row",
  },
  {
    name: "description",
    label: "Task Description",
    type: "textarea",
    placeholder: "Enter task description",
    optional: true,
  },
  {
    name: "attachment",
    label: "Attachment",
    type: "file",
    isMulti: true,
    optional: true,
  },
];
interface CreateTaskProps {
  taskEditing?: taskFormType;
  formOpen: boolean;
  handleSubmission: (newTask: taskFormType) => void;
  setFormOpen: (value: boolean) => void;
  crewList?: { value: number; label: string }[];
}

const CreateTask: FC<CreateTaskProps> = ({
  taskEditing,
  formOpen,
  handleSubmission,
  setFormOpen,
  crewList,
}) => {
  useEffect(() => {
    if (crewList && crewList.length > 0) {
      // formFields[4].options = crewList;
      formFields[5].options = crewList;
    }
  }, [crewList]);
  const defaultData: taskFormType = taskEditing
    ? {
        title: taskEditing.title,
        status: taskEditing.status,
        due_date: taskEditing.due_date,
        tags: taskEditing.tags,
        created_by: taskEditing.created_by,
        assigned_to: taskEditing.assigned_to,
        description: taskEditing.description,
        attachment: taskEditing.attachment,
      }
    : {
        title: "",
        status: "not-started", // Default to "not-started"
        due_date: "",
        tags: "",
        created_by: 0, // Set a default value for created_by
        assigned_to: [],
        description: "",
        attachment: undefined,
      };

  const form = useForm<taskFormType>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: defaultData,
  });

  function onSubmit(formData: taskFormType) {
    try {
      const taskData = {
        ...taskEditing,
        title: formData.title,
        status: formData.status,
        due_date: formData.due_date,
        tags: formData.tags,
        created_by: formData.created_by,
        assigned_to: formData.assigned_to,
        description: formData.description,
        attachment: formData.attachment,
      };
      handleSubmission(taskData);
      setFormOpen(!formOpen);
      form.reset();
    } catch (e) {
      form.setError("root", {
        type: "manual",
        message: "Form submission failed",
      });
      console.error(e);
    }
  }

  return (
    <Dialog open={formOpen} onOpenChange={() => setFormOpen(!formOpen)}>
      <DialogContent className="sm:max-w-[900px] p-0">
        <DialogHeader className="w-full p-4 bg-gray-100 rounded-tr-lg rounded-tl-lg max-h-16">
          <DialogTitle>{taskEditing ? "Edit Task" : "Create Task"}</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 overflow-y-scroll max-h-[80vh]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="justify-center flex flex-col p-0 lg:px-4 lg:pr-10"
            >
              <RenderFormFields form={form} formFields={formFields} />

              <DialogFooter className="flex justify-end pt-6 gap-4 mb-4">
                <Button type="button" onClick={() => setFormOpen(false)} variant="ghost">
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
