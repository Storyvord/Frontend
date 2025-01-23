import { FormFieldConfig, taskFormType, taskType } from "@/types";
import { FC, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema } from "@/lib/validation";
import CustomForm from "../form-component/CustomForm";

const formFields: FormFieldConfig<taskFormType>[] = [
  {
    name: "title",
    label: "Task Title",
    type: "text",
    placeholder: "Enter task title",
  },
  {
    name: "description",
    label: "Task Description",
    type: "textarea",
    placeholder: "Enter task description",
  },
  {
    name: "due_date",
    label: "Task Deadline",
    type: "date",
  },
  {
    name: "assigned_to",
    label: "Assign To",
    type: "select",
    isMulti: true,
    options: [],
  },
];
interface CreateTaskProps {
  taskEditing?: taskType;
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
      formFields[3].options = crewList;
    }
  }, [crewList]);
  const defaultData: taskFormType = taskEditing
    ? {
        title: taskEditing.title,
        description: taskEditing.description,
        due_date: taskEditing.due_date,
        assigned_to: taskEditing.assigned_to,
      }
    : {
        title: "",
        description: "",
        due_date: "",
        assigned_to: [],
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
        description: formData.description,
        due_date: formData.due_date,
        assigned_to: formData.assigned_to,
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
      <DialogContent className="sm:max-w-[625px] px-6">
        <DialogHeader>
          <DialogTitle>{taskEditing ? "Edit Task" : "Create Task"}</DialogTitle>
        </DialogHeader>
        <CustomForm
          form={form}
          formFields={formFields}
          onSubmit={onSubmit}
          isLoading={false}
          isError={false}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
