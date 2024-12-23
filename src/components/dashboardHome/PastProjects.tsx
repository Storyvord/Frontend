"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "@/types/project";
import LoadingSkeleton from "./LoadingSkeleton";
import Link from "next/link";
import Image from "next/image";
import {
  useGetProjectRequirements,
  useGetShootDetails,
} from "@/lib/react-query/queriesAndMutations/project";

type Props = {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
};

const PastProjects = ({ projects, isLoading, isError }: Props) => {
  // const { data: projectRequirements } = useGetProjectRequirements(projects?.project_id);
  // const { data: shootDetails } = useGetShootDetails(projects?.project_id);
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <p className=" mt-1 text-center text-red-500">Failed to get your project</p>;
  }
  return (
    <Card
      id="past-project"
      className="relative mt-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden shadow-sm border-blue-gray-100"
    >
      <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 items-center flex justify-start gap-4 p-6">
        <Image width={20} height={20} className="w-[20px]" src={"/icons/back.svg"} alt="icon" />
        <h6 className="block antialiased tracking-normal text-lg md:text-xl leading-relaxed text-blue-gray-900 mb-1">
          Previous Projects
        </h6>
      </div>
      {projects?.length === 0 ? (
        <h1 className=" mt-8 text-center">You don&apos;t have any previous project</h1>
      ) : (
        <CardContent className="overflow-x-auto px-0 pb-2">
          <Table className="min-w-[640px] table-auto">
            <TableHeader>
              <TableRow>
                <TableHead>PROJECT NAME</TableHead>
                <TableHead>START DATE</TableHead>
                <TableHead>END DATE</TableHead>
                <TableHead>BUDGET($)</TableHead>
                <TableHead>LOCATION</TableHead>
                <TableHead>STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects?.map((project) => (
                <TableRow key={project.project_id}>
                  <TableCell>
                    <Link
                      href={`/project-details/${project.project_id}`}
                      className="block antialiased text-base leading-relaxed text-blue-gray-900 font-[800]"
                    >
                      {project?.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <p className="block antialiased text-base leading-relaxed text-blue-gray-900 font-light">
                      {project?.location_details?.at(0)?.start_date}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="block antialiased text-base leading-relaxed text-blue-gray-900 font-light">
                      {project?.location_details?.at(0)?.end_date}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="block antialiased text-base leading-relaxed text-blue-gray-600 font-[600]">
                      {project?.budget_amount}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="block antialiased text-base leading-relaxed text-blue-gray-600 font-[600]">
                      {project?.location_details?.at(0)?.location}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="block antialiased text-base leading-relaxed  text-green-500 font-[600]">
                      {project?.status}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

export default PastProjects;
