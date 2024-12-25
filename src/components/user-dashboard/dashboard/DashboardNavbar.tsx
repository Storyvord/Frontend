"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { companySettingsMenuItems } from "@/constant/constant";
import { userLogout } from "@/lib/api/auth/auth";
import { Project as ProjectType } from "@/types/project";
import { useGetProjects } from "@/lib/react-query/queriesAndMutations/project";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { CgProfile } from "react-icons/cg";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getLocalizedString } from "@/i18n/utils";
import { useTranslations } from "next-intl";

const DashboardNavbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { data: projects, isPending, isError } = useGetProjects();
  const [onGoingProjects, setOngoingProjects] = useState<ProjectType[]>([]);

  const t = useTranslations("Dashboard");

  const path = usePathname();

  // Event handler to close the menu
  const handleMenuItemClick = () => {
    setToggleMenu(false);
  };

  useEffect(() => {
    if (projects) {
      // Filter ongoing projects based on their status
      const filteredOngoingProjects = projects?.results.filter(
        (project: ProjectType) =>
          !["COMPLETED", "CANCELLED", "POST_PRODUCTION"].includes(project.status)
      );
      // setOngoingProjects(filteredOngoingProjects);
      setOngoingProjects(projects?.results);
    }
  }, [projects]);

  const companyInformation = companySettingsMenuItems.slice(0, 3).map((details) => (
    <>
      <h2 className=" text-md font-semibold sm:mt-3 mt-1">
        {getLocalizedString(`DashboardMenuItems.${details.title}.title`)}
      </h2>
      {details.items.map((item) => (
        <Link
          key={item.text}
          href={`/dashboard/${item.link}`}
          className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md sm:p-2 p-1 "
        >
          <item.icon />
          <h3> {getLocalizedString(`DashboardMenuItems.${details.title}.items.${item.link}`)} </h3>
        </Link>
      ))}
    </>
  ));

  const projectList = (
    <>
      {isError && <p className=" text-sm text-red-600">Failed to get projects</p>}
      {onGoingProjects.map((project) => (
        <Link
          href={`/project-details/${project.project_id}`}
          key={project.project_id}
          className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2"
        >
          <Image
            width={20}
            height={20}
            className="w-[20px]"
            src={"/icons/camera.svg"}
            alt="camera-icon"
          />
          <p className=" ml-4 line-clamp-1"> {project.name} </p>
        </Link>
      ))}

      <span className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2">
        <Image width={20} height={20} className="w-[20px]" src={"/icons/back.svg"} alt="icon" />
        <Link href="/dashboard/#all-projects" className=" ml-4">
          {t("all-projects")}
        </Link>
      </span>
    </>
  );

  const profile = ["profile", "settings", "subscriptions"].map((item) => (
    <Link
      href={`/dashboard/${item}`}
      key={item}
      className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2"
    >
      {item.slice(0, 1).toUpperCase() + item.slice(1)}
    </Link>
  ));

  return (
    <header className=" bg-white p-2 flex-col md:flex-row justify-between md:justify-end fixed w-screen  top-0 left-0 z-50 shadow-sm pr-4">
      <nav className="flex justify-between w-full mx-auto max-w-[2000]">
        <section className=" flex items-center gap-4 xl:gap-16 sm:ml-8">
          {(path === "/dashboard" || path.includes("message")) && (
            <Link href="/dashboard">
              <Image
                className=" w-[125px] md:w-[150px]"
                src={"/logo.svg"}
                width={50}
                height={10}
                alt="storyvord-logo"
              />
            </Link>
          )}
          {/* temporary comment */}
          {/* <div className="hidden lg:flex gap-4 border p-2 rounded-lg h-10 lg:ml-16">
            <Image
              className="w-[30px]"
              src={"/icons/search.svg"}
              width={50}
              height={10}
              alt="search"
            />
            <input
              className=" border-l-2 pl-4 focus:border-l-2 focus:outline-none"
              placeholder="Search or type"
            />
          </div> */}
        </section>
        <section className=" flex items-center gap-3 sm:gap-10">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className=" hidden sm:block">
                <NavigationMenuTrigger className=" text-sm sm:text-base font-poppins-normal">
                  {t("select-project")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[400px]">{projectList}</ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className=" text-sm sm:text-base font-poppins-normal">
                  {t("org")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[250px] px-3">{companyInformation}</ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/dashboard/message">
            <Image
              width={20}
              height={20}
              className="w-[20px] sm:w-[24px] cursor-pointer"
              src={"/icons/message.svg"}
              alt="message"
            />
          </Link>
          <Image
            width={20}
            height={20}
            className="w-[20px] sm:w-[24px] cursor-pointer"
            src={"/icons/notification.svg"}
            alt="notification"
          />
          <div className=" hidden sm:flex">
            <DropdownMenu>
              <DropdownMenuTrigger className=" flex items-center gap-2 cursor-pointer">
                {/* <Image width={40} height={40} src={"/profile.png"} alt="profile" /> */}
                <CgProfile className=" w-10 h-10 text-gray-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {profile}
                <button
                  onClick={() => userLogout()}
                  className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2 w-full"
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
            className=" flex sm:hidden cursor-pointer gap-1 sm:gap-3 items-center"
          >
            {/* <Image width={30} height={30} src={"/profile.png"} alt="profile" /> */}
            <CgProfile className=" w-8 h-8 text-gray-500" />
            {toggleMenu ? (
              <Image
                width={15}
                height={15}
                className="w-[12px]"
                src={"/icons/up-arrow.svg"}
                alt="notification"
              />
            ) : (
              <Image
                width={15}
                height={15}
                className="w-[12px]"
                src={"/icons/down-arrow.svg"}
                alt="notification"
              />
            )}
          </button>
          {toggleMenu && (
            <div className=" absolute z-50 bg-white top-14 left-0 w-full min-h-[95vh] sm:hidden p-3 space-y-4 pt-8">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className=" p-2 bg-gray-100 border-none rounded-md">
                    {t("all-projects")}
                  </AccordionTrigger>
                  <AccordionContent onClick={handleMenuItemClick} className=" px-4">
                    {projectList}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className=" p-2 bg-gray-100 rounded-md">
                    {t("org")}
                  </AccordionTrigger>
                  <AccordionContent onClick={handleMenuItemClick} className=" px-4">
                    {companyInformation}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <h3 className=" p-2 bg-gray-100 rounded-md">
                <Link onClick={handleMenuItemClick} href="/dashboard/profile">
                  {t("profile")}
                </Link>
              </h3>
              <h3 className=" p-2 bg-gray-100 rounded-md">
                <Link onClick={handleMenuItemClick} href="/dashboard/settings">
                  {t("settings")}
                </Link>
              </h3>
              <h3 className=" p-2 bg-gray-100 rounded-md">
                <Link onClick={handleMenuItemClick} href="/dashboard/subscriptions">
                  {t("subscriptions")}
                </Link>
              </h3>
              <div className=" flex gap-2">
                <LanguageSwitcher />

                <button
                  onClick={() => userLogout()}
                  className=" w-full border rounded-md cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </section>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
