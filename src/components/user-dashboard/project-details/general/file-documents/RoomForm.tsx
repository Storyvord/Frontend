"use client";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomForm from "@/components/form-component/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRoomFormSchema } from "@/lib/validation";
import { FormFieldConfig, RoomFormData } from "@/types";
import { useEffect } from "react";

type RoomFormProps = {
  onSubmit: (data: RoomFormData) => void;
  isLoading: boolean;
  isError: boolean;
  open: boolean;
  onClose: () => void;
  crewList?: { value: number; label: string }[];
  mode: "create" | "edit";
  initialData?: RoomFormData | null;
};

const formData: FormFieldConfig<RoomFormData>[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter room name",
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Enter room description",
  },
  {
    name: "accessRight",
    type: "select",
    isMulti: true,
    options: [{ value: "", label: "" }],
    label: "Access Right",
    placeholder: "",
  },
];

const RoomForm = ({
  onSubmit,
  isLoading,
  isError,
  open,
  onClose,
  crewList,
  mode = "create",
  initialData,
}: RoomFormProps) => {
  formData[2].options = crewList;
  const form = useForm<RoomFormData>({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues: { name: "", description: "", accessRight: [] },
  });
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [form, initialData]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:w-[650px] w-[95%]">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create Room" : "Edit Room"}</DialogTitle>
        </DialogHeader>
        <CustomForm
          form={form}
          formFields={formData}
          onSubmit={onSubmit}
          isLoading={isLoading}
          isError={isError}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RoomForm;
