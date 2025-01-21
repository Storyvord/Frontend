"use client";
import SideBar from "@/components/sidebar/SideBar";
import { FC, ReactNode } from "react";

import ProjectContextProvider from "@/context/ProjectContext";
import { useSideBarControl } from "@/context/SideBarContext";
import ProjectDetailsNavBar from "@/components/user-dashboard/project-details/ProjectDetailsNavBar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { isSidebarSmall, toggleSmallBigSidebar } = useSideBarControl();

  return (
    <div className="w-full min-h-screen md:bg-[#eceff180] bg-white relative">
      <ProjectContextProvider>
        <main className="max-w-[2000px] mx-auto relative min-h-screen">
          <ProjectDetailsNavBar />
          <div className={cn("md:pt-16 pt-40", isSidebarSmall ? "ml-20" : "md:ml-60 xl:ml-72 ")}>
            <SideBar />
            {/* Fixed Center-Right Element */}
            <button
              className={cn(
                "hidden fixed top-1/2 -translate-y-1/2 z-50 px-2 h-6 md:flex items-center justify-center bg-white hover:bg-slate-200 border rounded-lg",
                isSidebarSmall ? "left-[4rem]" : "md:left-[14rem] xl:left-[17rem] "
              )}
              onClick={() => toggleSmallBigSidebar()}
            >
              {isSidebarSmall ? ">" : "<"}
            </button>
            {children}
          </div>
        </main>
      </ProjectContextProvider>
    </div>
  );
};

export default Layout;
