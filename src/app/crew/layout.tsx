import React, { FC } from "react";
import { Toaster } from "@/components/ui/toaster";

import UserContextProvider from "@/context/UserContext";
import Navbar from "@/components/crew/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <UserContextProvider>
      <div className="w-full min-h-screen bg-[#eceff180] relative">
        <Navbar />
        <div className="max-w-[2000px] mx-auto py-4 pt-16">{children}</div>
        <Toaster />
      </div>
    </UserContextProvider>
  );
};

export default Layout;
