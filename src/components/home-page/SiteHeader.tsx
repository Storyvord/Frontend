"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "../LanguageSwitcher";
import { Button } from "@/components/ui/button";

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

  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#", label: "Product" },
    { href: "#", label: "Client" },
    { href: "#", label: "About" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-screen bg-white z-50 transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container flex items-center justify-between py-2">
        <Link href="/" className="text-xl font-bold">
          <Image src="/logo.svg" width={130} height={50} alt="logo" className=" w-40" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 ">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-sm text-gray-600 hover:text-gray-900 relative transition-all duration-300 hover:border-b-2 hover:border-primary-green"
            >
              {link.label}
            </Link>
          ))}
          <Button className=" bg-background-2 text-white ">
            <Link href="/auth/sign-in">Get Started</Link>
          </Button>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
