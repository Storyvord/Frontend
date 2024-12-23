"use client";

import React from "react";
import LoadingUi from "./LoadingUi";
import CrewCard, { Crew } from "./CrewCard";
import { Button } from "../ui/button";

type CrewRequirements = {
  message: string;
  data: {
    id: string;
    location: string;
    crew_suggestion: Crew[];
  }[];
};

type CrewPageClientProps = {
  crewRequirements: CrewRequirements;
  isPending: boolean;
  isError: boolean;
  refetch: () => void;
};

const CrewPage: React.FC<CrewPageClientProps> = ({
  crewRequirements,
  isPending,
  isError,
  refetch,
}) => {
  if (isPending) {
    return <LoadingUi isPending={isPending} text="AI is matching best-fit crew..." />;
  }

  if (isError && !isPending) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center pt-8 md:p-6">
        <p className="text-xl font-poppins-semibold text-red-600">
          An error occurred while fetching data. Please try again.
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="mb-6 text-center font-poppins-semibold text-2xl text-gray-900">
        {crewRequirements?.message}
      </h1>
      <section className="space-y-8">
        {crewRequirements?.data.map((item) => (
          <div key={item.id} className="p-6 border border-gray-200 rounded-lg shadow-md">
            <h2 className="mb-4 font-poppins-semibold text-lg text-gray-900">
              Location: {item.location}
            </h2>
            <main className="space-y-4">
              {item.crew_suggestion.map((crew) => (
                <CrewCard key={crew.id} crew={crew} />
              ))}
            </main>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CrewPage;
