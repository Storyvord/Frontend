"use client";

import React from "react";

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

type Props = {
  crewMember: CrewMember;
};

const CrewCard = ({ crewMember }: Props) => {
  if (!crewMember) return null;

  return (
    <div className="p-4 border border-gray-300 bg-white rounded-md shadow-sm">
      <h3 className="mb-2 font-poppins-semibold text-base md:text-xl text-gray-800">
        {crewMember.name || "No Name Provided"}
      </h3>
      <p className="mb-2 text-gray-600">
        <strong>Location:</strong> {crewMember.location || "N/A"}
      </p>
      <p className="mb-2 text-gray-600">
        <strong>Experience:</strong> {crewMember.experience || "N/A"}
      </p>
      <p className="mb-2 text-gray-600">
        <strong>Skills:</strong>
        <ul className="list-disc list-inside ml-4">
          {crewMember.skills?.length > 0 ? (
            crewMember.skills.map((skill, idx) => <li key={idx}>{skill}</li>)
          ) : (
            <li>No skills available</li>
          )}
        </ul>
      </p>
      <p className="mb-2 text-gray-600">
        <strong>Standard Rate:</strong> {crewMember.standard_rate || "N/A"}
      </p>
      <p className="mb-2 text-gray-600">
        <strong>Contact:</strong>
        <a href={`tel:${crewMember.contact_number}`} className="text-blue-500 hover:underline">
          {crewMember.contact_number || "No phone available"}
        </a>
      </p>
      <p className="mb-2 text-gray-600">
        <strong>Reason of suggestion:</strong>{" "}
        <span className=" text-sm"> {crewMember.reasoning || "No reasoning provided"}</span>
      </p>
    </div>
  );
};

export default CrewCard;
