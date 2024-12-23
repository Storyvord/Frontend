import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calenderFormSchema } from "@/lib/validation";
import { CalenderFormFieldType, FormFieldConfig } from "@/types";
import CustomForm from "../form-component/CustomForm";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const formFields: FormFieldConfig<CalenderFormFieldType>[] = [
  { name: "title", label: "Title", type: "text", placeholder: "Enter event title" },
  { name: "start", label: "Start", type: "datetime-local" },
  { name: "end", label: "End", type: "datetime-local" },
  {
    name: "participants",
    label: "Participants",
    type: "select",
    isMulti: true,
    options: [{ value: "", label: "" }],
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "Enter event location",
    optional: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter event description",
    optional: true,
  },
];

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  formDefaultValue: CalenderFormFieldType;
  createCalenderEvent: (formData: CalenderFormFieldType) => void;
  isLoading: boolean;
  isError: boolean;
  crewList?: { value: number; label: string }[];
  isEdit?: boolean;
};

const AddEvent = ({
  openDialog,
  setOpenDialog,
  formDefaultValue,
  createCalenderEvent,
  isLoading,
  isError,
  crewList,
  isEdit = false,
}: Props) => {
  useEffect(() => {
    formFields[3].options = crewList;
  }, [crewList]);

  const form = useForm<CalenderFormFieldType>({
    resolver: zodResolver(calenderFormSchema),
    defaultValues: formDefaultValue,
  });

  useEffect(() => {
    if (formDefaultValue) {
      form.reset(formDefaultValue);
    }
  }, [formDefaultValue, form]);

  const onSubmit = (formData: CalenderFormFieldType) => {
    createCalenderEvent(formData);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="lg:w-[800px] w-[95%] p-8">
        <DialogTitle className="text-lg">{isEdit ? "Edit Event" : "Add New Event"}</DialogTitle>
        <DialogDescription>
          {isEdit
            ? "Update the event details below."
            : "Please fill out the details for your new event."}
        </DialogDescription>
        <div className="max-h-[75vh] overflow-y-auto px-2">
          <CustomForm
            form={form}
            formFields={formFields}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEvent;
