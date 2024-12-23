"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateEndorsement,
  useGetEndorsement,
  useGetProfile,
  useUpdateEndorsement,
} from "@/lib/react-query/queriesAndMutations/crew/profile";
import { endorsementFormValidationSchema } from "@/lib/validation/crew";
import { EndorsementFormType, FormFieldConfig } from "@/types/crew";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomForm from "@/components/form-component/CustomForm";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";

const endorsementFormFields: FormFieldConfig<EndorsementFormType>[] = [
  {
    name: "text",
    label: "Text",
    type: "text",
    placeholder: "Enter text",
  },
  {
    name: "givenBy",
    label: "Given By",
    type: "text",
    placeholder: "Enter name of the person who gave the endorsement",
  },
];

const endorsementDefaultValue: EndorsementFormType = {
  text: "",
  givenBy: "",
};

type Props = {
  setOpenDialog: (openDialog: boolean) => void;
  openDialog: boolean;
  fieldId?: number;
};

const EndorsementsForm = ({ openDialog, setOpenDialog, fieldId }: Props) => {
  const { data: profileData } = useGetUserProfile();
  const [crewProfileId, setCrewProfileId] = useState();
  useEffect(() => {
    setCrewProfileId(profileData?.data?.crew_profile?.id);
  }, [profileData]);

  const { toast } = useToast();

  const { mutateAsync, isPending, isError } = useCreateEndorsement();
  const { mutateAsync: updateEndorsement } = useUpdateEndorsement();
  const { data: endorsementData } = useGetEndorsement();

  const editableData = endorsementData?.data.find(
    (item: EndorsementFormType) => item.id === fieldId
  );

  const form = useForm({
    resolver: zodResolver(endorsementFormValidationSchema),
    defaultValues: endorsementDefaultValue,
  });

  useEffect(() => {
    if (editableData) {
      form.reset({
        text: editableData.text,
        givenBy: editableData.givenBy,
      });
    } else {
      form.reset(endorsementDefaultValue);
    }
  }, [editableData, form, fieldId]);

  const onSubmit = async (data: EndorsementFormType) => {
    if (editableData && fieldId) {
      const res = await updateEndorsement({ endorsementData: data, id: fieldId });
      if (res) {
        form.reset();
        toast({
          title: "Your endorsement details successfully updated",
        });
      }
      setOpenDialog(false);
    } else {
      const res = await mutateAsync({ ...data, crew: crewProfileId || 0 });
      if (res) {
        form.reset();
        toast({
          title: "Your endorsement successfully submitted",
        });
      }

      setOpenDialog(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent className=" max-w-[700px] mx-auto">
        <DialogHeader>
          <DialogTitle>Endorsement Details</DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto px-2">
          <CustomForm
            form={form}
            formFields={endorsementFormFields}
            onSubmit={onSubmit}
            isLoading={isPending}
            isError={isError}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EndorsementsForm;
