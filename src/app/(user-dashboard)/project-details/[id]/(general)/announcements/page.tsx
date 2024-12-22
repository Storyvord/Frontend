"use client";
import React, { useState } from "react";

import {
  useCreateAnnouncement,
  useDeleteAnnouncement,
  useGetAllAnnouncements,
} from "@/lib/react-query/queriesAndMutations/announcements";
import Announcement from "@/components/user-dashboard/project-details/general/announcements/Announcement";
import CreateAnnouncementDialog, {
  AnnouncementFormType,
} from "@/components/user-dashboard/project-details/general/announcements/CreateAnnouncementDialog";
import CreateButton from "@/components/user-dashboard/project-details/general/announcements/CreateButton";
import AnnouncementSkeleton from "@/components/user-dashboard/project-details/general/announcements/AnnouncementSkeleton";
import Navbar from "@/components/user-dashboard/project-details/general/announcements/Navbar";
import { ReturnAnnouncements } from "@/types";
import { useParams } from "next/navigation";
import { useGetCrewList } from "@/lib/react-query/queriesAndMutations/crew";
import { useToast } from "@/components/ui/use-toast";
import { useCrewOptions } from "@/hooks/useCrewOptions";

const Announcements = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { id: projectId }: { id: string } = useParams();
  const { toast } = useToast();
  const { data, isPending } = useGetAllAnnouncements(projectId);
  const {
    mutateAsync,
    isPending: isPendingCreate,
    isError: isErrorCreate,
  } = useCreateAnnouncement();

  const { crewList, isCrewLoading, isCrewError } = useCrewOptions(projectId);

  const createAnnouncement = async (data: AnnouncementFormType) => {
    try {
      const transformData = {
        ...data,
        project: projectId,
      };

      const res = await mutateAsync(transformData);
      if (res) setOpenDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, Try again",
        variant: "destructive",
      });
    }
  };
  const deleteAnnouncement = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full px-4">
      <h1 className=" text-3xl my-4 underline">Announcements</h1>

      {isPending && <AnnouncementSkeleton />}

      <Navbar openDialog={openDialog} setOpenDialog={setOpenDialog} />
      {data?.results.length === 0 && <p className=" text-center pt-6 lg:pt-24">No Announcement</p>}

      <section
        className="my-4 grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        {data?.results.map((item: ReturnAnnouncements) => (
          <Announcement key={item.id} title={item.title} message={item.message} id={item.id} />
        ))}
      </section>

      <CreateAnnouncementDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        crewList={crewList}
        createAnnouncement={createAnnouncement}
        isPending={isPendingCreate}
        isError={isErrorCreate}
      />
    </div>
  );
};

export default Announcements;
