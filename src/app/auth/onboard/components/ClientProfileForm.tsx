"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import RenderFormFields from "@/components/form-component/RenderFormFields";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import {
  ClientProfileFormDefaultValues,
  ClientProfileFormFields,
} from "@/constant/formFields/profile";
import { ClientProfileSchema, ClientProfileType } from "@/lib/validation/auth";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";
import {
  usePostPersonalDetails,
  useUpdatePersonalDetails,
} from "@/lib/react-query/queriesAndMutations/onBoard/onBoard";
import { convertToBase64 } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  prevStep?: () => void;
  onSuccessStep?: () => void;
};

const ClientProfileForm = ({ prevStep, onSuccessStep }: Props) => {
  const { mutateAsync: postPersonalDetails, isPending, isError } = usePostPersonalDetails();
  const {
    mutateAsync: updatePersonalDetails,
    isPending: isPendingUpdate,
    isError: isErrorUpdate,
  } = useUpdatePersonalDetails();
  const { data: userProfile } = useGetUserProfile();
  const { personal_info, client_profile } = userProfile?.data;
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ClientProfileSchema),
    defaultValues: ClientProfileFormDefaultValues,
  });

  useEffect(() => {
    if (userProfile?.data?.personal_info?.full_name)
      form.reset({
        full_name: personal_info.full_name,
        contact_number: personal_info.contact_number,
        location: personal_info.location,
        languages: personal_info.languages,
        job_title: personal_info.job_title,
        bio: personal_info.bio,
        role: client_profile.role,
        address: client_profile.address,
        ...(client_profile.personalWebsite && { personalWebsite: client_profile.personalWebsite }),
        drive: client_profile.drive,
      });
  }, [form, userProfile]);

  const onSubmit = async (data: ClientProfileType) => {
    const base64Image = data.image ? await convertToBase64(data.image) : null;

    const formData = {
      personal_info: {
        full_name: data?.full_name,
        contact_number: data.contact_number,
        location: data?.location,
        languages: data.languages,
        job_title: data.job_title,
        bio: data?.bio,
        ...(base64Image && { image: base64Image }),
      },
      client_profile: {
        role: data.role,
        address: data.address,
        personalWebsite: data?.personalWebsite,
        drive: data.drive,
      },
    };

    try {
      if (userProfile?.data?.personal_info?.full_name) {
        await updatePersonalDetails(formData);
      } else {
        await postPersonalDetails(formData);
      }

      toast({
        title: "Update successful",
      });
      if (onSuccessStep) {
        onSuccessStep();
      } else {
        router.push("/dashboard/profile");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      }
    }
  };
  return (
    <div className="p-4">
      {prevStep ? (
        <>
          <h3 className="lg:text-2xl md:text-2xl text-sm font-poppins text-center font-medium text-[#333333]">
            Let&apos;s get to know you better!
          </h3>
          <p className="text-xs lg:text-base md:text-base font-poppins text-center font-normal text-[#666666] mt-2 underline">
            Please provide your basic information to continue.
          </p>
        </>
      ) : (
        <h3 className="lg:text-2xl md:text-2xl pt-4 text-sm font-poppins text-center font-medium text-[#333333]">
          Update Profile
        </h3>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 justify-center flex flex-col w-full lg:w-3/5 pb-4 mx-auto"
        >
          <section>
            <RenderFormFields form={form} formFields={ClientProfileFormFields} />
          </section>

          {isError && (
            <p className="text-center text-sm text-red-600 font-semibold">
              {/* {error?.detail} */}
              <br />
            </p>
          )}
          <div className=" w-full flex justify-between items-center">
            {prevStep && (
              <Button
                type="button"
                disabled={isPending}
                className=" flex items-center gap-3"
                onClick={() => prevStep()}
              >
                <FaArrowLeft />
                Back
              </Button>
            )}
            {userProfile?.data?.personal_info?.full_name ? (
              <Button type="submit" disabled={isPendingUpdate} className="flex items-center gap-3">
                {isPendingUpdate ? <Loader /> : "Update"} <FaArrowRight />
              </Button>
            ) : (
              <Button type="submit" disabled={isPending} className="flex items-center gap-3">
                {isPending ? <Loader /> : "Submit"} <FaArrowRight />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ClientProfileForm;
