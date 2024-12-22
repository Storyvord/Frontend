"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CrewHireNavBar from "./CrewHireNavBar";
import {
  useGetCrewList,
  useSentInvitationToCrew,
} from "@/lib/react-query/queriesAndMutations/crew";
import CrewList from "./CrewList";
import { FormFieldConfig } from "@/types";
import { z } from "zod";
import CustomForm from "@/components/form-component/CustomForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = z.object({
  crew_email: z.string().min(1, "This field may not be blank."), // Ensures the field is not empty
  firstName: z.string().min(1, "This field is required."), // Ensures the field is required and not empty
  lastName: z.string().min(1, "This field is required."), // Ensures the field is required and not empty
  message: z.string().min(1, "This field is required."), // Ensures the field is required and not empty
});
type ValidationSchemaType = z.infer<typeof validationSchema>;

const formFields: FormFieldConfig<ValidationSchemaType>[] = [
  {
    name: "crew_email",
    label: "Crew Email",
    type: "email",
    placeholder: "Enter crew email",
  },
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter crew first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter crew last name",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "message",
  },
];
const defaultValues = {
  crew_email: "",
  firstName: "",
  lastName: "",
  message: "",
};
const CrewHire = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { id: projectId }: { id: string } = useParams();

  const {
    mutateAsync,
    isPending: isLoadingInvitation,
    isError: isErrorInvitation,
  } = useSentInvitationToCrew();
  const { data: crewList, isPending: isLoadingCrewList } = useGetCrewList(projectId);
  const [searchValue, setSearchValue] = useState("");
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  // const onSubmit = async (data: ValidationSchemaType) => {
  //   const transFormData = { ...data, project_id: projectId };
  //   const res = await mutateAsync(transFormData);
  //   if (res) setOpenDialog(false);
  // };

  return (
    <div>
      <CrewHireNavBar
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <CrewList data={crewList?.data} isLoading={isLoadingCrewList} />
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
        <DialogContent className="lg:w-[800px] w-[95%]">
          <DialogHeader>
            <DialogTitle> Invite </DialogTitle>
            {/* <CustomForm
              form={form}
              formFields={formFields}
              onSubmit={onSubmit}
              isLoading={isLoadingInvitation}
              isError={isErrorInvitation}
            /> */}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrewHire;
