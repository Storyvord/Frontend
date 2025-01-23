"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useParams, useSelectedLayoutSegments } from "next/navigation";

import { cn } from "@/lib/utils";
import { getLocalizedString } from "@/i18n/utils";
import { projectdetailsItems } from "@/constant/constant";
import { useProjectControl } from "@/context/ProjectContext";
import { useSideBarControl } from "@/context/SideBarContext";
import SideBarButton from "./components/SideBarButton";
import SideBarCloseButton from "./components/SideBarCloseButton";

const SideBar = () => {
  const { isSideBarOpen, isSidebarSmall } = useSideBarControl();
  const { setProject } = useProjectControl();
  const { id: projectId } = useParams();
  const segment = useSelectedLayoutSegments();
  const t = useTranslations("common");
  const [collapsedSections, setCollapsedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (title: string) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };

  return (
    <aside
      className={cn(
        "bg-white shadow-sm fixed inset-0 z-50 h-100vh transition-transform duration-300 md:translate-x-0 font-poppins pb-8",
        isSidebarSmall ? "w-20" : "w-60 xl:w-72",
        isSideBarOpen ? "translate-x-0" : "-translate-x-80",
        "overflow-hidden hover:overflow-y-auto"
      )}
    >
      <div className="relative">
        <SideBarCloseButton />
        <Link href={`/project-details/${projectId}`}>
          <Image
            onClick={() => setProject({ id: "", name: "" })}
            className=" mx-auto w-[150px]"
            src={isSidebarSmall ? "/logo1.jpeg" : "/logo-a6299cea.png"}
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
          {!isSidebarSmall && t("dashboard")}
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
            {t("project-details")}
          </p>
        </Link>

        {projectdetailsItems.map((details) => (
          <div key={details.title} className="flex flex-col gap-1">
            {/* Section Title (localized) */}
            <h1
              className="pl-2 text-sm text-gray-500 mt-4 uppercase cursor-pointer 
                       flex justify-between items-center font-poppins-medium"
              onClick={() => toggleSection(details.title)}
            >
              {!isSidebarSmall && getLocalizedString(`ProjectDetailsItems.${details.title}.title`)}

              <span className="text-gray-400">
                {collapsedSections[details.title] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronUp className="w-5 h-5" />
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
              {details.items.map((item) => {
                // e.g. "ProjectDetailsItems.general.items.report"
                const itemKey = `ProjectDetailsItems.${details.title}.items.${item.link}`;
                return (
                  <li key={item.text} className="list-none">
                    <SideBarButton
                      Icon={item.icon}
                      link={item.link}
                      root="project-details"
                      text={getLocalizedString(itemKey)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
