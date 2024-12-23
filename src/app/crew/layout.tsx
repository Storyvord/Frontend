import React, { FC } from "react";
import { Toaster } from "@/components/ui/toaster";

import SideBarContextProvider from "@/context/SideBarContext";
import UserContextProvider from "@/context/UserContext";
import ProjectContextProvider from "@/context/ProjectContext";
import Navbar from "@/components/crew/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <UserContextProvider>
      <div className="w-full min-h-screen bg-[#eceff180] relative">
        <SideBarContextProvider>
          <ProjectContextProvider>
            <Navbar />
            <div className=" px-4 lg:px-8 py-4">{children}</div>
            <Toaster />
          </ProjectContextProvider>
        </SideBarContextProvider>
      </div>
    </UserContextProvider>
  );
};

export default Layout;
