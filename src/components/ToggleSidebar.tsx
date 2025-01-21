"use client";

import { useSideBarControl } from "@/context/SideBarContext";
import { cn } from "@/lib/utils";
import React from "react";

const ToggleSidebar = () => {
  const { isSidebarSmall, toggleSmallBigSidebar } = useSideBarControl();

  return (
    <div
      className={cn(
        "hidden fixed top-1/2 -translate-y-1/2 z-50",
        isSidebarSmall ? "left-[13.5rem]" : "md:left-[13.5rem] xl:left-[16.5rem] "
      )}
    >
      <button
        className="px-2 h-6 md:flex items-center justify-center bg-white shadow-md rounded-lg"
        onClick={() => toggleSmallBigSidebar()}
      >
        {"<<"}
      </button>
    </div>
  );
};

export default ToggleSidebar;
