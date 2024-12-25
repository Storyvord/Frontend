"use client";
import Image from "next/image";
import { companySettingsMenuItems } from "@/constant/constant";
import Link from "next/link";
import { useProjectControl } from "@/context/ProjectContext";
import { useSideBarControl } from "@/context/SideBarContext";
import SideBarButton from "./components/SideBarButton";
import SideBarCloseButton from "./components/SideBarCloseButton";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getLocalizedString } from "@/i18n/utils";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const DashboardSidebar = () => {
  const { isSideBarOpen } = useSideBarControl();
  const { setProject } = useProjectControl();
  const [collapsedSections, setCollapsedSections] = useState<{ [key: string]: boolean }>({});
  const t = useTranslations();

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
        <Link className="" href={`/dashboard`}>
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
          className=" flex items-center gap-4 py-3 hover:text-text-color-1 pl-4 w-full text-[#607D8B] font-semibold"
        >
          <Image src="/icons/left-arrow.svg" alt="" width={17} height={17} />
          {t("dashboard")}
        </Link>

        {companySettingsMenuItems.map((details) => {
          // We'll build dynamic keys to match JSON structure
          const sectionTitleKey = `DashboardMenuItems.${details.title}.title`;

          return (
            <div key={details.title} className="flex flex-col gap-1">
              {/* Section Title */}
              <h1
                className="pl-2 text-sm text-gray-400 mt-4 uppercase cursor-pointer flex justify-between items-center font-poppins-medium"
                onClick={() => toggleSection(details.title)}
              >
                {getLocalizedString(sectionTitleKey)}
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
                  // e.g. "DashboardMenuItems.general.items.employeesStaff"
                  const itemKey = `DashboardMenuItems.${details.title}.items.${item.link}`;

                  return (
                    <li key={item.text} className="list-none">
                      <SideBarButton
                        Icon={item.icon}
                        link={item.link}
                        root="dashboard"
                        text={getLocalizedString(itemKey)}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
