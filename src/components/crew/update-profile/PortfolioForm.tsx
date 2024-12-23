"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortfolioFormData, FormFieldConfig } from "@/types/crew";
import { portfolioFormValidationSchema } from "@/lib/validation/crew";
import {
  useCreatePortfolio,
  useUpdatePortfolio,
  useGetPortfolio,
  useGetProfile,
} from "@/lib/react-query/queriesAndMutations/crew/profile";
import { convertToBase64 } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomForm from "@/components/form-component/CustomForm";

const portfolioFormFields: FormFieldConfig<PortfolioFormData>[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter the title",
  },
  {
    name: "link",
    label: "Link",
    type: "text",
    placeholder: "Enter the link",
  },
  {
    name: "image",
    label: "Image",
    type: "file",
  },
  {
    name: "contentTag",
    label: "Content Tag",
    type: "text",
    placeholder: "Enter the content tag",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter the description",
  },
  {
    name: "providedService",
    label: "Provided Service",
    type: "text",
    placeholder: "Enter the provided service",
  },
];

const defaultValues: PortfolioFormData = {
  title: "",
  link: "",
  image: null,
  contentTag: "",
  description: "",
  providedService: "",
};

type Props = {
  setOpenDialog: (openDialog: boolean) => void;
  openDialog: boolean;
  fieldId?: number;
};

const PortfolioForm = ({ openDialog, setOpenDialog, fieldId }: Props) => {
  const { toast } = useToast();

  const { mutateAsync, isPending, isError } = useCreatePortfolio();
  const { mutateAsync: updatePortfolio } = useUpdatePortfolio();
  const { data } = useGetPortfolio();

  const editableData = data?.data.find((item: PortfolioFormData) => item.id === fieldId);

  const form = useForm({
    resolver: zodResolver(portfolioFormValidationSchema),
    defaultValues,
  });

  useEffect(() => {
    if (editableData) {
      form.reset({
        title: editableData.title,
        link: editableData.link,
        image: editableData.image,
        contentTag: editableData.contentTag,
        description: editableData.description,
        providedService: editableData.providedService,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [editableData, form, fieldId]);

  const onSubmit = async (data: PortfolioFormData) => {
    const base64 = await convertToBase64(data.image);
    const transformData = { ...data, image: base64, verification_type: "client_reference" };

    if (editableData && fieldId) {
      const res = await updatePortfolio({ portfolioData: transformData, id: fieldId });
      if (res) {
        form.reset();
        toast({
          title: "Your portfolio details successfully updated",
        });
      }
      setOpenDialog(false);
    } else {
      const res = await mutateAsync(transformData);
      if (res) {
        form.reset();
        toast({
          title: "Your portfolio details successfully submitted",
        });
      }
      setOpenDialog(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent className=" max-w-[700px] mx-auto">
        <DialogHeader>
          <DialogTitle>Portfolio Details</DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto px-2">
          <CustomForm
            form={form}
            formFields={portfolioFormFields}
            onSubmit={onSubmit}
            isLoading={isPending}
            isError={isError}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioForm;
