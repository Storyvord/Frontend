"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full bg-white z-50 transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">
          <Image src="/logo.svg" width={130} height={50} alt="logo" />
        </Link>
        <nav className="hidden md:flex space-x-6 ">
          <Link href="#" className="text-sm hover:text-gray-900 border-g">
            Product
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Cases
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Client
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            About
          </Link>
        </nav>
        <Button className="bg-[#1e1e1e] text-white hover:bg-[#2e2e2e]">Get Started</Button>
      </div>
    </header>
  );
}
