"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { userLogout } from "@/lib/api/auth/auth";
import { Project as ProjectType } from "@/types/project";
import {
  useGetProjectDetails,
  useGetProjects,
} from "@/lib/react-query/queriesAndMutations/project";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProjectControl } from "@/context/ProjectContext";
import { useSideBarControl } from "@/context/SideBarContext";
import { Button } from "@/components/ui/button";
import { CgProfile } from "react-icons/cg";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";

const ProjectDetailsNavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [onGoingProjects, setOngoingProjects] = useState<ProjectType[]>([]);
  const { id: projectId }: { id: string } = useParams();

  const { data: projects, isPending, isError } = useGetProjectDetails(projectId);
  const { data: userProfile } = useGetUserProfile();

  const { project } = useProjectControl();
  const { toggle } = useSideBarControl();

  const segments = useSelectedLayoutSegments();

  // Event handler to close the menu
  const handleMenuItemClick = () => {
    setToggleMenu(false);
  };

  // useEffect(() => {
  //   if (projects) {
  //     // Filter ongoing projects based on their status
  //     const filteredOngoingProjects = projects?.results.filter(
  //       (project: ProjectType) =>
  //         !["COMPLETED", "CANCELLED", "POST_PRODUCTION"].includes(project.status)
  //     );
  //     setOngoingProjects(projects);
  //   }
  // }, [projects]);

  const profile = ["profile", "settings", "subscriptions", , "help & support"].map((item) => (
    <Link
      href={item === "help & support" ? "/help-support" : `/dashboard/${item}`}
      key={item}
      className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2 capitalize"
    >
      {item}
    </Link>
  ));

  return (
    <header className=" bg-white p-2 flex-col md:flex-row justify-between md:justify-end fixed w-screen  top-0 left-0 z-50 shadow-sm pr-4">
      <nav className="flex justify-between w-full mx-auto max-w-[2000]">
        <Link href={`/project-details/${projectId}`}>
          <Image
            className="w-[125px] md:ml-8 md:hidden"
            src={"/logo.svg"}
            width={50}
            height={10}
            alt="storyvord-logo"
          />
        </Link>

        <section className=" flex items-center gap-3 sm:gap-5">
          <Link href="/dashboard/message">
            <Image
              width={20}
              height={20}
              className="w-6 cursor-pointer"
              src={"/icons/message.svg"}
              alt="message"
            />
          </Link>
          <Image
            width={20}
            height={20}
            className="w-6 cursor-pointer"
            src={"/icons/notification.svg"}
            alt="notification"
          />
          <div className=" hidden sm:flex">
            <DropdownMenu>
              <DropdownMenuTrigger className=" flex items-center gap-2 cursor-pointer">
                {userProfile?.data?.personal_info?.image ? (
                  <Image
                    src={userProfile?.data?.personal_info.image}
                    alt="Profile"
                    className="rounded-full w-12 h-12 border-4 border-white"
                    width={96}
                    height={96}
                  />
                ) : (
                  <CgProfile className="rounded-full w-12 h-12 border-4 border-white text-gray-500" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {profile}
                <button
                  onClick={() => userLogout()}
                  className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2"
                >
                  Logout
                </button>
                <LanguageSwitcher />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* mobile menu */}
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className=" flex sm:hidden cursor-pointer gap-3 items-center"
          >
            {userProfile?.data?.personal_info?.image ? (
              <Image
                src={userProfile?.data?.personal_info.image}
                alt="Profile"
                className="rounded-full w-12 h-12 border-4 border-white"
                width={96}
                height={96}
              />
            ) : (
              <CgProfile className="rounded-full w-12 h-12 border-4 border-white text-gray-500" />
            )}
            {toggleMenu ? (
              <Image
                width={12}
                height={12}
                className="w-[12px]"
                src={"/icons/up-arrow.svg"}
                alt="notification"
              />
            ) : (
              <Image
                width={20}
                height={20}
                className="w-[12px]"
                src={"/icons/down-arrow.svg"}
                alt="notification"
              />
            )}
          </button>
          {toggleMenu && (
            <div className=" absolute z-50 bg-white top-12 left-0 w-full min-h-[95vh] sm:hidden p-3 space-y-4 pt-8">
              <h3 className=" p-2 bg-gray-100 rounded-md">
                <Link onClick={handleMenuItemClick} href="/dashboard/profile">
                  Profile
                </Link>
              </h3>
              <h3 className=" p-2 bg-gray-100 rounded-md">
                <Link onClick={handleMenuItemClick} href="/dashboard/settings">
                  Settings
                </Link>
              </h3>
              <h3 className=" p-2 bg-gray-100 rounded-md">
                <Link onClick={handleMenuItemClick} href="/dashboard/subscriptions">
                  Subscriptions
                </Link>
              </h3>
              <button
                onClick={() => userLogout()}
                className=" w-full border rounded-md mt-12 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </section>
      </nav>
      <section className=" mt-1 block md:hidden">
        <h3 className=" line-clamp-2">{projects?.name}</h3>
        <div className=" flex gap-3 items-center">
          <button onClick={toggle}>
            <Image src="/icons/menu.svg" alt="language-icon" width={20} height={20} />
          </button>
          <Button className="bg-gray-100 mt-2 capitalize min-w-20" variant="ghost">
            {segments.length === 0 ? "Project Details" : segments[1]}
          </Button>
        </div>
      </section>
    </header>
  );
};

export default ProjectDetailsNavBar;
