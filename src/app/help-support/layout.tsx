"use client";
import React, { useEffect } from "react";
import Navbar from "./_components/Navbar";
import ZohoSalesIQ from "@/components/ZohoSalesIQ";
import { Footer } from "@/components/home-page/Footer";
import { usePathname } from "next/navigation";

const HelpAndSupportLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  useEffect(() => {
    const widgetElement = document.querySelector(".zsiq_floatmain");
    if (widgetElement && widgetElement instanceof HTMLElement) {
      if (!path.includes("help-support")) {
        widgetElement.style.display = "none";
      } else {
        widgetElement.style.display = "block";
      }
    }
  }, [path]);
  return (
    <div className="flex flex-col min-h-screen bg-[#eceff180] max-w-[2000px] mx-auto">
      <Navbar />
      <main className=" mt-16">{children}</main>
      <Footer />
      <ZohoSalesIQ />
    </div>
  );
};

export default HelpAndSupportLayout;
