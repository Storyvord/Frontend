"use client";
import { FC, ReactNode, Suspense, useEffect } from "react";
import Cookies from "js-cookie";

import UserContextProvider from "@/context/UserContext";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";

import Chatbot from "@/components/chat/Chatbot";
import { Toaster } from "@/components/ui/toaster";
import Loading from "../loading";
import { usePathname } from "next/navigation";
import SideBarContextProvider from "@/context/SideBarContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const token = Cookies.get("accessToken");
  const { data: userDetails, isPending } = useGetUserProfile();
  const path = usePathname();

  useEffect(() => {
    const widgetElement = document.querySelector(".zsiq_floatmain");
    const widgetPopup = document.querySelector(".zls-sptwndw");
    if (widgetElement && widgetElement instanceof HTMLElement) {
      if (!path.includes("help-support")) {
        widgetElement.style.display = "none";
      } else {
        widgetElement.style.display = "block";
      }
    }
    if (widgetPopup && widgetPopup instanceof HTMLElement) {
      if (!path.includes("help-support")) {
        widgetPopup.style.display = "none";
      } else {
        widgetPopup.style.display = "block";
      }
    }
  }, [path]);

  return (
    <UserContextProvider>
      <SideBarContextProvider>
        <div className="w-full min-h-screen bg-[#eceff180] relative">
          {userDetails && token && !isPending ? (
            <>
              <div className="">
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </div>
              <Toaster />
              <Chatbot />
            </>
          ) : (
            <Loading />
          )}
        </div>
      </SideBarContextProvider>
    </UserContextProvider>
  );
};

export default Layout;
