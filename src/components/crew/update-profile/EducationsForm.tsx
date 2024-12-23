"use client";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateEducation,
  useGetEducation,
  useGetProfile,
  useUpdateEducation,
} from "@/lib/react-query/queriesAndMutations/crew/profile";
import { educationFormValidationSchema } from "@/lib/validation/crew";
import { EducationFormType, FormFieldConfig } from "@/types/crew";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomForm from "@/components/form-component/CustomForm";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";

const educationFormFields: FormFieldConfig<EducationFormType>[] = [
  {
    name: "academicQualifications",
    label: "Academic Qualifications",
    type: "text",
    placeholder: "Enter your academic qualification",
  },
  {
    name: "professionalCourses",
    label: "Professional Courses",
    type: "text",
    placeholder: "Enter your professional courses",
  },
  {
    name: "workshopsAttended",
    label: "Workshops Attended",
    type: "text",
    placeholder: "Enter your workshops attended",
  },
];
const defaultValues: EducationFormType = {
  academicQualifications: "",
  professionalCourses: "",
  workshopsAttended: "",
};
type Props = {
  setOpenDialog: (openDialog: boolean) => void;
  openDialog: boolean;
  fieldId?: number;
};

const EducationsForm = ({ openDialog, setOpenDialog, fieldId }: Props) => {
  const { data: profileData } = useGetUserProfile();
  const [crewProfileId, setCrewProfileId] = useState();
  useEffect(() => {
    setCrewProfileId(profileData?.data?.crew_profile?.id);
  }, [profileData]);

  const { toast } = useToast();

  const { mutateAsync, isPending, isError } = useCreateEducation();
  const { mutateAsync: updateEducation } = useUpdateEducation();
  const { data } = useGetEducation();

  const editableData = data?.data.find((item: EducationFormType) => item.id === fieldId);

  const form = useForm({
    resolver: zodResolver(educationFormValidationSchema),
    defaultValues,
  });

  // Reset form values when editableData changes
  useEffect(() => {
    if (editableData) {
      form.reset({
        academicQualifications: editableData.academicQualifications,
        professionalCourses: editableData.professionalCourses,
        workshopsAttended: editableData.workshopsAttended,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [editableData, form, fieldId]);

  const onSubmit = async (data: EducationFormType) => {
    if (editableData && fieldId) {
      const res = await updateEducation({ educationData: data, id: fieldId });
      if (res) {
        form.reset();
        toast({
          title: "Your education details successfully updated",
        });
      }
      setOpenDialog(false);
    } else {
      const res = await mutateAsync({ ...data, crew: crewProfileId || 0 });
      if (res) {
        form.reset();
        toast({
          title: "Your education details successfully submitted",
        });
      }
      setOpenDialog(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent className=" max-w-[700px] mx-auto">
        <DialogHeader>
          <DialogTitle>Education Details</DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto px-2">
          <CustomForm
            form={form}
            formFields={educationFormFields}
            onSubmit={onSubmit}
            isLoading={isPending}
            isError={isError}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EducationsForm;
