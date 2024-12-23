"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialLinkFormType, FormFieldConfig } from "@/types/crew";
import { socialLinksFormValidationSchema } from "@/lib/validation/crew";
import {
  useCreateSocialLink,
  useUpdateSocialLink,
  useGetSocialLink,
  useGetProfile,
} from "@/lib/react-query/queriesAndMutations/crew/profile";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomForm from "@/components/form-component/CustomForm";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";

const socialLinksFormFields: FormFieldConfig<SocialLinkFormType>[] = [
  {
    name: "link",
    label: "Link",
    type: "text",
    placeholder: "Enter your social link",
  },
];

const defaultValues: SocialLinkFormType = {
  link: "",
};

type Props = {
  setOpenDialog: (openDialog: boolean) => void;
  openDialog: boolean;
  fieldId?: number;
};

const SocialLinksForm = ({ openDialog, setOpenDialog, fieldId }: Props) => {
  const { data: profileData } = useGetUserProfile();
  const [crewProfileId, setCrewProfileId] = useState();
  useEffect(() => {
    setCrewProfileId(profileData?.data?.crew_profile?.id);
  }, [profileData]);
  const { toast } = useToast();

  const { mutateAsync, isPending, isError } = useCreateSocialLink();
  const { mutateAsync: updateSocialLink } = useUpdateSocialLink();
  const { data } = useGetSocialLink();

  const editableData = data?.data.find((item: SocialLinkFormType) => item.id === fieldId);

  const form = useForm({
    resolver: zodResolver(socialLinksFormValidationSchema),
    defaultValues,
  });

  useEffect(() => {
    if (editableData) {
      form.reset({
        link: editableData.link,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [editableData, form, fieldId]);

  const onSubmit = async (data: SocialLinkFormType) => {
    if (editableData && fieldId) {
      const res = await updateSocialLink({ socialLinkData: data, id: fieldId });
      if (res) {
        form.reset();
        toast({
          title: "Your social link successfully updated",
        });
      }
      setOpenDialog(false);
    } else {
      const res = await mutateAsync({ ...data, crew: crewProfileId || 0 });
      if (res) {
        form.reset();
        toast({
          title: "Your social link successfully submitted",
        });
      }
    }
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent className=" max-w-[700px] mx-auto">
        <DialogHeader>
          <DialogTitle>Social Links</DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto px-2">
          <CustomForm
            form={form}
            formFields={socialLinksFormFields}
            onSubmit={onSubmit}
            isLoading={isPending}
            isError={isError}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialLinksForm;
