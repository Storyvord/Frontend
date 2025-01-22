"use client";
import Image from "next/image";
import React from "react";
import logo from "@/assets/logo3.png";
import Link from "next/link";
import { Button } from "../ui/button";
import { MdNotificationsActive } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "./LogoutButton";
import { FaRegUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { userLogout } from "@/lib/api/auth/auth";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";
import { useGetInvitations } from "@/lib/react-query/queriesAndMutations/crew/invitations";

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

const navLinks = [
  {
    name: "File & Document",
    link: "/crew/file-documents",
  },
  {
    name: "Projects",
    link: "/crew/projects",
  },
  {
    name: "Tasks",
    link: "/crew/tasks",
  },
  {
    name: "Calender",
    link: "/crew/calender",
  },
];

const Navbar = () => {
  const { data: userProfile } = useGetUserProfile();
  const { data: listOfProjects } = useGetInvitations();

  const profile = ["profile", "settings", "subscriptions", "help & support"].map((item) => (
    <Link
      href={item === "help & support" ? "/help-support" : `/crew/${item}`}
      key={item}
      className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2 capitalize"
    >
      {item}
    </Link>
  ));

  const projectList = (
    <>
      {listOfProjects?.data?.length === 0 && (
        <p className=" text-center text-gray-600 mt-4">You are not on boarder in any project</p>
      )}
      {listOfProjects?.data?.map((item: any) => (
        <Link
          href="#"
          key={item.project_id}
          className=" text-gray-500 text-md flex items-center cursor-pointer hover:bg-gray-100 rounded-md p-2"
        >
          <Image
            width={20}
            height={20}
            className="w-[20px]"
            src={"/icons/camera.svg"}
            alt="camera-icon"
          />
          <p className=" ml-4 line-clamp-1"> {item.project_name} </p>
        </Link>
      ))}
    </>
  );
  return (
    <header className=" bg-white p-2 flex-col md:flex-row justify-between md:justify-end fixed w-screen  top-0 left-0 z-50 shadow-sm md:px-4">
      <nav className="flex justify-between w-full mx-auto max-w-[2000]">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-8">
            <Link href="/crew/home">
              <Image src={logo} alt="logo" className="sm:h-10 h-8 w-auto cursor-pointer" />
            </Link>
            <div className="hidden md:flex font-poppins-normal md:items-center lg:gap-8 gap-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.link} className="hover:font-poppins-medium">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center md:gap-6 gap-3">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className=" hidden sm:block">
                  <NavigationMenuTrigger className=" text-sm sm:text-base font-poppins-normal">
                    Projects
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className=" w-[300px]">{projectList}</div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link href="/crew/message">
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
                <div className=" block md:hidden">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.link}
                      className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2 w-full"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <button
                  onClick={() => userLogout()}
                  className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2 w-full"
                >
                  Logout
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
