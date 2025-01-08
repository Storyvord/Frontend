"use client";
import React, { Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import {
  useEditCallSheet,
  useGetCallSheetDetails,
} from "@/lib/react-query/queriesAndMutations/callsheet";

import { useToast } from "@/components/ui/use-toast";
import CallSheetForm, {
  ShootFormType,
} from "@/components/user-dashboard/project-details/planning/call-sheet/CallSheetForm";
import Loader from "@/components/Loader";

const EditCallSheetContent = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { id: projectId } = useParams();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  const { data, isError: getDataIsError, refetch } = useGetCallSheetDetails(id);
  const { mutateAsync: editCallSheet, isPending, isError } = useEditCallSheet();
  const defaultValues = {
    title: data?.data?.title,
    date: data?.data?.date,
    calltime: data?.data?.calltime,
    location: data?.data?.location,
    nearest_hospital_address: data?.data?.nearest_hospital_address,
    nearest_police_station: data?.data?.nearest_police_station,
    nearest_fire_station: data?.data?.nearest_fire_station,
    breakfast: data?.data?.breakfast,
    lunch: data?.data?.lunch,
    dinner: data?.data?.dinner,

    call_time: data?.data?.call_time,

    additional_notes: data?.data?.additional_notes,
    production_notes: data?.data?.production_notes,
  };
  const handleEditCallSheet = async (formData: ShootFormType) => {
    const transformData = { ...formData, project: projectId };
    try {
      const res = await editCallSheet({ formData: transformData, id });
      if (res) {
        toast({ title: "update successfully" });
        router.push(`/project-details/${projectId}/call-sheets`);
      }
    } catch (err) {
      toast({ title: "Failed to update", variant: "destructive" });
    }
  };
  return (
    <>
      {getDataIsError && (
        <div className=" w-full p-4 mt-8 flex- justify-center">
          <p className=" text-red-500">Failed to load Callsheet data</p>
          <button onClick={() => refetch()} className=" text-blue-500">
            Retry
          </button>
        </div>
      )}
      <CallSheetForm
        submitHandler={handleEditCallSheet}
        isLoading={isPending}
        isError={isError}
        isEdit={true}
        defaultValue={defaultValues}
      />
    </>
  );
};

const EditCallSheet = () => (
  <Suspense
    fallback={
      <div className=" w-full p-4 mt-8 flex- justify-center">
        <Loader />
      </div>
    }
  >
    <EditCallSheetContent />
  </Suspense>
);

export default EditCallSheet;
