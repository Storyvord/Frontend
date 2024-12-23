import React, { useEffect } from "react";
import CustomForm from "@/components/form-component/CustomForm";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateProfile,
  useGetProfile,
} from "@/lib/react-query/queriesAndMutations/crew/profile";
import { convertToBase64 } from "@/lib/utils";
import { profileFormValidationSchema } from "@/lib/validation/crew";
import { FormFieldConfig, ProfileFormData } from "@/types/crew";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CrewProfileForm from "@/app/auth/onboard/components/CrewProfileForm";

const profileFormFields: FormFieldConfig<ProfileFormData>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    name: "phone",
    label: "Phone",
    type: "number",
    placeholder: "Enter your phone number",
  },
  {
    name: "image",
    label: "Image",
    type: "file",
    placeholder: "Enter the URL of your profile image",
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "Enter your location",
  },
  {
    name: "languages",
    label: "Languages",
    type: "text",
    placeholder: "Enter the languages you speak",
  },
  {
    name: "job_title",
    label: "Job Title",
    type: "text",
    placeholder: "Enter your job title",
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Write a short bio about yourself",
  },
  {
    name: "experience",
    label: "Experience",
    type: "text",
    placeholder: "Enter your experience",
  },
  {
    name: "skills",
    label: "Skills",
    type: "text",
    placeholder: "Enter your skills",
  },
  {
    name: "standardRate",
    label: "Standard Rate",
    type: "text",
    placeholder: "Enter your standard rate (e.g., $100/hr)",
  },
  {
    name: "technicalProficiencies",
    label: "Technical Proficiencies",
    type: "text",
    placeholder: "List your technical proficiencies",
  },
  {
    name: "specializations",
    label: "Specializations",
    type: "text",
    placeholder: "Enter your areas of specialization",
  },
  {
    name: "drive",
    label: "Drive",
    type: "checkbox",
  },
  {
    name: "active",
    label: "Active",
    type: "checkbox",
  },
];

type Props = {
  setOpenDialog: (openDialog: boolean) => void;
  openDialog: boolean;
};

const BasicDetails = ({ openDialog, setOpenDialog }: Props) => {
  const { toast } = useToast();
  const { data: profileData } = useGetProfile();
  const { mutateAsync, isPending, isError } = useCreateProfile();

  const form = useForm({
    resolver: zodResolver(profileFormValidationSchema),
    defaultValues: profileData || {},
  });

  useEffect(() => {
    if (profileData) {
      form.reset(profileData);
    }
  }, [profileData, form]);

  const onSubmit = async (data: ProfileFormData) => {
    const base64 = await convertToBase64(data.image);
    const transformData = { ...data, image: base64 };
    const res = await mutateAsync(transformData);
    if (res) {
      form.reset();
      toast({
        title: "Your profile details successfully submitted",
      });
      setOpenDialog(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent className=" max-w-[800px] mx-auto border">
        <DialogHeader>
          <DialogTitle>Basic Details</DialogTitle>
        </DialogHeader>
        <div className=" max-h-[80vh] overflow-y-auto">
          <CrewProfileForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BasicDetails;
