"use client";
import DashboardSidebar from "@/components/sidebar/DashboardSidebar";
import DashboardNavbar from "@/components/user-dashboard/dashboard/DashboardNavbar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import { useSideBarControl } from "@/context/SideBarContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const path = usePathname();
  const { isSidebarSmall, toggleSmallBigSidebar } = useSideBarControl();
  return (
    <div className="max-w-[2000px] mx-auto relative">
      <DashboardNavbar />
      <main
        className={cn(
          "pt-16 relative",
          path === "/dashboard" || path.includes("message")
            ? ""
            : isSidebarSmall
              ? "ml-20"
              : "md:ml-60 xl:ml-72"
        )}
      >
        {path !== "/dashboard" && !path.includes("message") && (
          <>
            <DashboardSidebar />
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
          </>
        )}

        {children}
      </main>
    </div>
  );
};

export default Layout;
