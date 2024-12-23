"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname, useSelectedLayoutSegments } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSideBarControl } from "@/context/SideBarContext";
import { useProjectControl } from "@/context/ProjectContext";

const SideBarButton = ({
  Icon,
  text,
  link,
  root,
}: {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  link: string;
  root: string;
}) => {
  const { id } = useParams();
  const path = usePathname();
  const { setisSideBarOpen } = useSideBarControl();

  const { setProject } = useProjectControl();

  const handleClick = () => {
    setisSideBarOpen(false);
  };
  const checkLink = path.includes(link);
  return (
    <Link
      href={path.includes("dashboard") ? `/dashboard/${link}` : `/project-details/${id}/${link}`}
    >
      <button
        onClick={handleClick}
        className={cn(
          "w-full h-auto flex items-center gap-4 px-4 py-3 capitalize justify-start rounded-lg ",
          checkLink
            ? "bg-gradient-to-tr from-gray-800 to-gray-600 text-white hover:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
            : "text-[#607D8B] hover:bg-[#607D8B]/10 active:bg-[#607D8B]/30"
        )}
      >
        {Icon && <Icon className="w-6 h-6" />}
        <p className="block antialiased text-base leading-relaxed text-inherit font-poppins-medium capitalize truncate overflow-hidden whitespace-nowrap text-ellipsis">
          {text}
        </p>
      </button>
    </Link>
  );
};

export default SideBarButton;
