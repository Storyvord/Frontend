"use client";
import Image from "next/image";
import React, { useState } from "react";

import { MdOutlineModeEdit } from "react-icons/md";
import BasicDetails from "../update-profile/BasicDetails";
import { CgProfile } from "react-icons/cg";

interface ProfileProps {
  profile:
    | {
        personal_info: {
          image: string | null;
          full_name: string;
          contact_number: string;
          location: string;
          languages: string;
          job_title: string;
          bio: string;
        };
        crew_profile: {
          experience: string;
          skills: string;
          standardRate: string;
          technicalProficiencies: string;
          specializations: string;
          drive: boolean;
          active: boolean;
        };
      }
    | undefined;
  isClient?: boolean;
}

const Profile = ({ profile, isClient }: ProfileProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div className="bg-white p-6 shadow-md max-w-4xl mx-auto relative">
      <span className=" flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        {!isClient && (
          <MdOutlineModeEdit
            className=" w-6 h-6 cursor-pointer"
            onClick={() => setOpenDialog(true)}
          />
        )}
      </span>
      <hr />

      <>
        <div className="flex flex-col items-center sm:flex-row sm:items-start">
          {profile?.personal_info.image ? (
            <Image
              className="rounded-full sm:w-40 sm:h-40 object-fill"
              src={profile?.personal_info.image}
              alt={profile?.personal_info.full_name}
              width={120}
              height={120}
            />
          ) : (
            <CgProfile className="rounded-full sm:w-32 sm:h-32 object-fill text-gray-600" />
          )}
          <div className="sm:ml-6 text-center sm:text-left mt-2 sm:mt-0">
            <h1 className="sm:text-3xl text-xl font-bold">{profile?.personal_info.full_name}</h1>
            <h2 className="sm:text-xl text-md text-gray-600">{profile?.personal_info.job_title}</h2>
            <p className="text-gray-500">{profile?.personal_info.location}</p>
            <p className="text-gray-500">{profile?.personal_info.contact_number}</p>
          </div>
        </div>
        <div className="mt-6 border-t pt-6">
          <h3 className="text-xl font-semibold">About</h3>
          <p className="mt-2 text-gray-700">{profile?.personal_info.bio}</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Experience</h4>
              <p className=" text-sm sm:text-md text-gray-700">
                {profile?.crew_profile.experience}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Languages</h4>
              <p className=" text-sm sm:text-md text-gray-700">
                {profile?.personal_info.languages}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Skills</h4>
              <p className=" text-sm sm:text-md text-gray-700">{profile?.crew_profile.skills}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Technical Proficiencies</h4>
              <p className=" text-sm sm:text-md text-gray-700">
                {profile?.crew_profile.technicalProficiencies}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Specializations</h4>
              <p className=" text-sm sm:text-md text-gray-700">
                {profile?.crew_profile.specializations}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Day Rate</h4>
              <p className=" text-sm sm:text-md text-gray-700">
                {profile?.crew_profile.standardRate}
              </p>
            </div>
          </div>
        </div>
      </>

      <BasicDetails openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default Profile;
