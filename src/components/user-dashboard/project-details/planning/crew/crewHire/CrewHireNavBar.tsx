"use client";
import React from "react";
import { CiLock } from "react-icons/ci";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type Props = {
  setOpenDialog: (value: boolean) => void;
  openDialog: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const CrewHireNavBar = ({ setOpenDialog, openDialog, searchValue, setSearchValue }: Props) => {
  return (
    <nav className="mx-auto flex gap-4 flex-col sm:flex-row justify-between">
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="search crew"
      />
      <div className=" flex gap-4">
        <Button variant="outline" className=" flex gap-3 font-semibold border border-gray-500">
          <Image src="/icons/download.svg" width={16} height={16} alt="download" />
          Export
        </Button>
        {/* <Button
          onClick={() => setOpenDialog(!openDialog)}
          className="flex gap-3 font-semibold bg-green-500"
        >
          <Image src="/icons/plus-3.svg" width={16} height={16} alt="download" />
          Add
        </Button> */}
        <Button variant="outline" className="flex gap-3 font-semibold border border-gray-500">
          <Image src="/icons/edit.svg" width={16} height={16} alt="download" />
          Edit
        </Button>
        <Button variant="outline" className="flex gap-3 font-semibold border border-gray-500">
          <Image src="/icons/three-dot.svg" width={16} height={16} alt="download" />
          More
        </Button>
      </div>
    </nav>
  );
};

export default CrewHireNavBar;
