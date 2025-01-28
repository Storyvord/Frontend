"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";
import { useTranslations } from "next-intl";

export function SiteHeader() {
  const t = useTranslations("HomePage");
  const { data: userDetails } = useGetUserProfile();

  const navLinksStyle =
    "text-sm md:text-base text-gray-600 hover:text-gray-900 relative transition-all duration-300 hover:border-b-2 hover:border-primary-green font-poppins-medium";

  return (
    <header className="fixed top-0 left-0 w-[100%] bg-white/90 z-[900] transition-transform duration-300 px-6 lg:px-10 xl:px-28">
      <div className="flex items-center justify-between py-2 max-w-[2000px] mx-auto">
        <Link href="/" className="text-xl font-bold">
          <Image
            src="/logo.svg"
            width={130}
            height={50}
            alt="logo"
            className="w-[125px] md:w-[150px]"
          />
        </Link>
        <div className="flex justify-between items-center gap-6">
          <nav className="hidden md:flex items-center gap-8 ">
            <Link href="#home" className={navLinksStyle}>
              {t("home")}
            </Link>
            <Link href="#product" className={navLinksStyle}>
              {t("product")}
            </Link>
            <Link href="#clients" className={navLinksStyle}>
              {t("client")}
            </Link>
            <Link href="#about" className={navLinksStyle}>
              {t("about")}
            </Link>
          </nav>
          {/* stage 2 = Onboarding process completed */}
          {userDetails?.data?.user?.step && (
            // user_type === 1  Represents a client
            // user_type === 2  Represents a crew member
            <Link href={userDetails?.data?.user?.user_type === 1 ? "/dashboard" : "/crew/home"}>
              <Button className=" bg-background-2 hover:bg-background-2">
                {" "}
                {t("button.dashboard")}
              </Button>
            </Link>
          )}
          {userDetails && !userDetails?.data?.user?.step && (
            <Link href="/auth/onboard">
              <Button className=" bg-background-2 hover:bg-background-2">
                {t("button.completeOnboarding")}
              </Button>
            </Link>
          )}
          {!userDetails && (
            <Button
              onClick={() => (window.location.pathname = "/auth/sign-in")}
              className=" bg-background-2 hover:bg-background-2"
            >
              {t("button.getStarted")}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
