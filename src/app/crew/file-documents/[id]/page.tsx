"use client";
import { FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useGetCrewFileDocumentRooms } from "@/lib/react-query/queriesAndMutations/crew/files";
import RoomCard from "@/components/user-dashboard/project-details/general/file-documents/RoomCard";
import { Button } from "@/components/ui/button";

type RoomDataType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  default: boolean;
};

const FileSection: FC = () => {
  const { id: projectId }: { id: string } = useParams();
  const router = useRouter();

  const { data: roomData, isPending: isLoadingFiles } = useGetCrewFileDocumentRooms(projectId);

  const handleCardClick = (roomId: string) => {
    router.push(`/crew/file-documents/${projectId}/${roomId}`);
  };

  return (
    <section className="relative py-5 px-4">
      <Button
        variant="outline"
        className="my-4"
        onClick={() => router.push(`/crew/file-documents/`)}
      >
        <IoMdArrowRoundBack /> Back
      </Button>
      {isLoadingFiles && <p className=" text-center">Fetching your rooms...</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5">
        {roomData?.data?.map((room: RoomDataType, index: number) => (
          <RoomCard key={index} room={room} onClick={handleCardClick} />
        ))}
      </div>
    </section>
  );
};

export default FileSection;
