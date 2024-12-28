"use client";

import { useSentInvitationToCrew } from "@/lib/react-query/queriesAndMutations/crew";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { formatError } from "@/lib/utils";
import { Button } from "../ui/button";

// Crew type definition
export type Crew = {
  id: number;
  name: string;
  job_title: string;
  bio: string;
  location: string;
  languages: string;
  contact_number: string;
  experience: string;
  reason_for_suggestion: string;
  skills: string;
  specializations: string;
  standardRate: string;
  technicalProficiencies: string;
};

type CrewRequirements = {
  message: string;
  data: {
    id: string;
    location: string;
    crew_suggestion: Crew[];
  }[];
};

// CrewCard Component
const CrewCard: React.FC<{ crew: Crew }> = ({ crew }) => {
  const { id: projectId }: { id: string } = useParams();
  const { toast } = useToast();
  const { mutateAsync: sendInvitation, isPending: isPendingSendInvitation } =
    useSentInvitationToCrew();

  const handleSendInvitation = async (userId: number) => {
    try {
      await sendInvitation({ projectId, userId });
      toast({
        title: "Invitation sent successfully",
        description: "Invitation has been sent to the crew",
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
    <div className="p-4 bg-gray-50 rounded-md  border border-gray-200">
      <div className=" flex justify-between">
        <h3 className="text-xl font-poppins-bold text-gray-900">{crew.name}</h3>
        <Button variant="outline" onClick={() => handleSendInvitation(crew.id)}>
          Connect
        </Button>
      </div>
      <p className="text-sm md:text-base font-poppins-semibold text-gray-700">{crew.job_title}</p>
      <p className=" text-base mt-3">
        <span className="font-poppins-semibold">Reason for suggestion:</span>{" "}
        {crew.reason_for_suggestion}
      </p>
      <p className="text-sm md:text-base font-poppins-regular text-gray-700 mt-2">{crew.bio}</p>
      <div className="mt-4 text-sm md:text:base text-gray-600">
        <p className=" text-base">
          <span className="font-poppins-semibold">Languages:</span> {crew.languages}
        </p>
        <p className=" text-base">
          <span className="font-poppins-semibold">Contact:</span> {crew.contact_number}
        </p>
        <p className=" text-base">
          <span className="font-poppins-semibold">Experience:</span> {crew.experience}
        </p>
        <p className=" text-base">
          <span className="font-poppins-semibold">Skills:</span> {crew.skills}
        </p>
        <p className=" text-base">
          <span className="font-poppins-semibold">Specializations:</span> {crew.specializations}
        </p>
        <p className=" text-base">
          <span className="font-semibold">Rate:</span> {crew.standardRate}
        </p>
        <p className=" text-base">
          <span className="font-semibold">Tools:</span> {crew.technicalProficiencies}
        </p>
      </div>
    </div>
  );
};

export default CrewCard;
