"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CrewHireNavBar from "./CrewHireNavBar";
import {
  useGetCrewInviteLists,
  useGetCrewList,
  useSentInvitationToCrew,
  useSentInvitationToCrewEmail,
} from "@/lib/react-query/queriesAndMutations/crew";
import CrewList from "./CrewList";
import { FormFieldConfig } from "@/types";
import { z } from "zod";
import CustomForm from "@/components/form-component/CustomForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { formatError } from "@/lib/utils";

const CrewHire = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();
  const { id: projectId }: { id: string } = useParams();

  const {
    mutateAsync,
    isPending: isLoadingInvitation,
    isError: isErrorInvitation,
  } = useSentInvitationToCrewEmail();
  const { data, isLoading } = useGetCrewInviteLists(projectId);
  const [searchValue, setSearchValue] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutateAsync({
        projectId,
        email,
      });
      setOpenDialog(false);
      toast({
        title: "Invitation sent to crew",
        description: "Invitation sent successfully",
      });
    } catch (error) {
      const { title, description } = formatError(error);
      toast({
        title,
        description,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <CrewHireNavBar
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <CrewList data={data?.data?.at(0)} isLoading={isLoading} />
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
        <DialogContent className="lg:w-[800px] w-[95%]">
          <DialogHeader>
            <DialogTitle>Sent invitation</DialogTitle>
            <form onSubmit={onSubmit} className=" flex items-center gap-2  mt-4">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" Enter crew email"
                className=" h-12"
              />
              <Button>Sent</Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrewHire;
