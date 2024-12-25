"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";
import { useTranslations } from "next-intl";

export function SiteHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const t = useTranslations("HomePage");

  const { data: userDetails } = useGetUserProfile();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          // if scroll down hide the navbar
          setIsVisible(false);
        } else {
          // if scroll up show the navbar
          setIsVisible(true);
        }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#", label: "Product" },
    { href: "#", label: "Client" },
    { href: "#", label: "About" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-[100%] bg-white z-50 transition-transform duration-300 px-6 lg:px-10 xl:px-28",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="flex items-center justify-between py-2 max-w-[2000px] mx-auto">
        <Link href="/" className="text-xl font-bold">
          <Image src="/logo.svg" width={130} height={50} alt="logo" className=" w-40" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 ">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-sm md:text-base text-gray-600 hover:text-gray-900 relative transition-all duration-300 hover:border-b-2 hover:border-primary-green font-poppins-medium"
            >
              {link.label}
            </Link>
          ))}

          <Button className=" bg-background-2 text-white ">
            {/* stage 2 = Onboarding process completed */}
            {userDetails?.data?.user?.step && (
              // user_type === 1  Represents a client
              // user_type === 2  Represents a crew member
              <Link href={userDetails?.data?.user?.user_type === 1 ? "/dashboard" : "/crew/home"}>
                {t("button.dashboard")}
              </Link>
            )}
            {userDetails && !userDetails?.data?.user?.step && (
              <Link href="/auth/onboard">{t("button.completeOnboarding")}</Link>
            )}
            {!userDetails && <Link href="/auth/sign-in">{t("button.getStarted")}</Link>}
          </Button>
        </nav>
      </div>
    </header>
  );
}
