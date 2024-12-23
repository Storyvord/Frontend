"use client";
import { projectdetailsItems } from "@/constant/constant";
import { useProjectControl } from "@/context/ProjectContext";
import { useSideBarControl } from "@/context/SideBarContext";
import Image from "next/image";
import Link from "next/link";
import SideBarButton from "./components/SideBarButton";
import SideBarCloseButton from "./components/SideBarCloseButton";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SideBar = () => {
  const { isSideBarOpen } = useSideBarControl();
  const { setProject } = useProjectControl();
  const { id: projectId } = useParams();
  const segment = useSelectedLayoutSegments();
  const [collapsedSections, setCollapsedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (title: string) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };

  return (
    <aside
      className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-80"} overflow-y-auto bg-white shadow-sm fixed inset-0 z-50 h-100vh w-60 xl:w-72 transition-transform duration-300 md:translate-x-0 border border-blue-gray-100 font-poppins pb-8`}
    >
      <div className="relative">
        <SideBarCloseButton />
        <Link href={`/project-details/${projectId}`}>
          <Image
            onClick={() => setProject({ id: "", name: "" })}
            className=" mx-auto w-[150px]"
            src="/logo-a6299cea.png"
            width={150}
            height={78}
            alt=""
          />
        </Link>
      </div>
      <div className="mx-4">
        <Link
          href="/dashboard"
          className=" flex items-center gap-4 py-3 hover:text-text-color-1 pl-4 w-full text-gray-500 font-semibold"
        >
          <Image src="/icons/left-arrow.svg" alt="" width={17} height={17} />
          Dashboard
        </Link>

        <Link
          href={`/project-details/${projectId}`}
          className={cn(
            "w-full h-auto flex items-center gap-4 px-4 py-3 capitalize justify-start rounded-lg ",
            segment?.length === 0
              ? "bg-gradient-to-tr from-gray-800 to-gray-600 text-white hover:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
              : "text-[#607D8B] hover:bg-[#607D8B]/10 active:bg-[#607D8B]/30"
          )}
        >
          <p className="block antialiased text-base leading-relaxed text-inherit font-medium capitalize truncate overflow-hidden whitespace-nowrap text-ellipsis">
            Project Details
          </p>
        </Link>

        {projectdetailsItems.map((details) => (
          <div key={details.title} className="flex flex-col gap-1">
            {/* Section Title */}
            <h1
              className="pl-2 text-sm text-gray-500 mt-4 uppercase cursor-pointer flex justify-between items-center font-poppins-medium"
              onClick={() => toggleSection(details.title)}
            >
              {details.title}
              <span className="text-gray-400">
                {collapsedSections[details.title] ? (
                  <ChevronDown className=" w-5 h-5" />
                ) : (
                  <ChevronUp className=" w-5 h-5" />
                )}
              </span>
            </h1>
            {/* Section Items (collapsible with animation) */}
            <ul
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                collapsedSections[details.title] ? "max-h-0" : "max-h-[500px]"
              )}
            >
              {details.items.map((item) => (
                <li key={item.text} className="list-none">
                  <SideBarButton
                    Icon={item.icon}
                    link={item.link}
                    root="project-details"
                    text={item.text}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
