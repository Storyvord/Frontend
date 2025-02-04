import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns/format";
import Image from "next/image";
import React from "react";

type Props = {
  name: string;
  status: string;
  date: string;
};
const ProjectCard = ({ name, status, date }: Props) => {
  return (
    <div className=" w-80 md:min-h-full border rounded-3xl p-4 bg-white flex flex-col gap-4 cursor-pointer">
      <div className=" flex justify-between">
        <Image height={25} width={25} src="/icons/project.svg" alt="icon" />
        <p className=" px-2 py-1 rounded-md bg-gray-200 text-green-500 text-sm ">{status}</p>
      </div>
      <span>
        <h2>{name}</h2>
        <h4>Storyvord</h4>
      </span>
      {/* <Image height={40} width={40} className=" mt-auto" src="/profile-2.png" alt="icon" /> */}
      {date && (
        <p className=" mt-auto text-sm text-gray-600">{format(new Date(date), "dd MMM yyyy")}</p>
      )}
    </div>
  );
};

export default ProjectCard;

export const ShimmerCard = () => {
  return (
    <div className="w-80 md:min-h-full border rounded-3xl p-4 bg-white flex flex-col gap-4 cursor-pointer">
      <div className="flex justify-between">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>

      <span>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-5 w-24" />
      </span>

      <div className="mt-auto">
        <Skeleton className="h-5 w-28" />
      </div>
    </div>
  );
};
