"use client";

import React from "react";
import LoadingUi from "./LoadingUi";
import { Button } from "../ui/button";
import CrewCard from "./CrewCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";

export type CrewMember = {
  name: string;
  role: string;
  location: string;
  experience: string;
  skills: string[];
  standard_rate: string;
  contact_number: string;
  reasoning: string;
};

type CrewData = {
  [role: string]: CrewMember[];
};

type Props = {
  report: CrewData;
  isPending: boolean;
  isError: boolean;
  handleRegenerateAiWork: (reportName: "crew") => Promise<void>;
};

const CrewPage = ({ report, isPending, isError, handleRegenerateAiWork }: Props) => {
  if (isPending) {
    return <LoadingUi isPending={isPending} text="Fetching crew data..." />;
  }

  if (isError && !isPending) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center pt-8 md:p-6">
        <p className="text-xl font-poppins-semibold text-red-600">
          An error occurred while fetching data. Please try again.
        </p>
      </div>
    );
  }

  if (typeof report === "string") {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-400 text-yellow-700 rounded-md mt-10 w-fit mx-auto">
        <p className="text-center font-poppins-semibold w-fit">
          Unable to display data. Please check the report format.
        </p>
      </div>
    );
  }

  return (
    <div className="p-2 md:-p-4 mt-3 relative">
      <Popover>
        <PopoverTrigger className=" absolute right-0">
          <EllipsisVertical />
        </PopoverTrigger>
        <PopoverContent className=" w-fit">
          <Button
            onClick={() => handleRegenerateAiWork("crew")}
            className="font-poppins-medium text-sm"
            size="sm"
            variant="outline"
          >
            Re-Generate
          </Button>
        </PopoverContent>
      </Popover>
      <h1 className="mb-6 font-poppins-semibold text-2xl text-gray-900">
        Recommended Crew Members
      </h1>
      <section className="space-y-8">
        {Object.keys(report).map((role) => (
          <div key={role} className="p-3 md:p-6 border border-gray-200 rounded-lg shadow-md">
            <h2 className="mb-4 font-poppins-semibold text-lg md:text-xl text-center text-gray-900 capitalize">
              Role: {role}
            </h2>
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {report[role].map((member, index) => (
                <CrewCard key={`${role}-${index}`} crewMember={member} />
              ))}
            </main>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CrewPage;
