"use client";
import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import RenderFormFields from "@/components/form-component/RenderFormFields";
import { Form } from "@/components/ui/form";
import Loader from "@/components/Loader";

import { formFields } from "@/constant/formFields/createShots";
import { shotValidationSchema } from "@/lib/validation";
import CreateShootInformation from "./CreateShootInformation";

type Props = { openDialog: boolean; setOpenDialog: (openDialog: boolean) => void };
export type ShotsFormType = z.infer<typeof shotValidationSchema>;

const CreateShots = ({ openDialog, setOpenDialog }: Props) => {
  const [openShootInformation, setOpenShootInformation] = useState(false);
  const form = useForm({
    resolver: zodResolver(shotValidationSchema),
    defaultValues: {
      shotId: "",
      subject: "",
      visual: "",
      audio: "",
      //   imageAndProduction: "",
    },
  });

  // this manage when apis will integrate
  const isLoading = false;
  const isError = false;
  const isEdit = false;

  const onSubmit = (data: ShotsFormType) => {
    // console.log(data);
    //api call
    form.reset();
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent className=" lg:w-[800px] w-[95%] p-0">
        <DialogHeader className=" w-full p-4 bg-gray-200 rounded-tr-lg rounded-tl-lg">
          <DialogTitle>Create Shot</DialogTitle>
        </DialogHeader>
        <section className=" px-6 lg:px-16 pb-4 -mt-4 max-h-[80vh] overflow-y-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 justify-center flex flex-col"
            >
              <RenderFormFields form={form} formFields={formFields} />

              {isError && (
                <p className="text-center text-sm text-red-600 font-semibold">
                  {/* {error?.detail} */}
                  <br />
                </p>
              )}
              <section className=" flex justify-between mt-2 gap-4">
                <div>
                  <p className=" text-sm text-gray-400">More Options</p>
                  <Button
                    type="button"
                    onClick={() => setOpenShootInformation(true)}
                    className=" flex items-center gap-2 border"
                    variant="ghost"
                  >
                    <Image src="/icons/camera-2.svg" alt="icon" width={20} height={20} />
                    Shoot Information
                  </Button>
                </div>
                <div>
                  <Button type="button" onClick={() => setOpenDialog(false)} variant="ghost">
                    Cancel
                  </Button>
                  {isEdit ? (
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? <Loader /> : "Update"}
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isLoading} className="">
                      {isLoading ? <Loader /> : "Save"}
                    </Button>
                  )}
                </div>
              </section>
            </form>
          </Form>
        </section>
      </DialogContent>
      <CreateShootInformation
        openDialog={openShootInformation}
        setOpenDialog={setOpenShootInformation}
      />
    </Dialog>
  );
};

export default CreateShots;
