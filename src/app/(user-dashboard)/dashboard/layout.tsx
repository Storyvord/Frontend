"use client";
import DashboardSidebar from "@/components/sidebar/DashboardSidebar";
import DashboardNavbar from "@/components/user-dashboard/dashboard/DashboardNavbar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const path = usePathname();
  return (
    <div className="max-w-[2000px] mx-auto relative">
      <DashboardNavbar />
      <main
        className={cn(
          "pt-16 relative",
          path === "/dashboard" || path.includes("message") ? "" : "md:ml-60 xl:ml-72 "
        )}
      >
        {path !== "/dashboard" && !path.includes("message") && <DashboardSidebar />}
        {children}
      </main>
    </div>
  );
};

export default Layout;
