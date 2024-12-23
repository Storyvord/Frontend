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
    name: "Message",
    link: "/crew/message",
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
  return (
    <nav className="w-full flex justify-between items-center p-4 border bg-white z-50 font-sans">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-8">
          <Link href="/crew/home">
            <Image src={logo} alt="logo" className="sm:h-10 h-8 w-auto cursor-pointer" />
          </Link>
          <div className="hidden md:flex md:items-center lg:gap-8 gap-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.link}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="md:flex items-center gap-6 hidden mr-4">
          <Button variant="outline">Find Work</Button>
          <MdNotificationsActive className="w-6 h-6" />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <FaRegUser className=" w-8 h-8" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuItem>
                <Link href={"/crew/profile"} className="py-2 w-full text-center">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/crew/settings"} className="py-2 w-full text-center">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Mobile Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <GiHamburgerMenu className=" w-6 h-6 cursor-pointer md:hidden block" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" mr-4">
          {navLinks.map((link) => (
            <DropdownMenuItem key={link.name}>
              <Link href={link.link} className="w-full">
                {link.name}
              </Link>
            </DropdownMenuItem>
          ))}

          <DropdownMenuItem>
            <Link href={"/crew/find-work"} className="w-full">
              Find Work
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/crew/profile"} className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
