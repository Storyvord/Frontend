"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();
  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white shadow-md fixed w-full">
      <Link href="/dashboard" className=" flex gap-3 items-center">
        <Image
          className=" w-[120px] md:w-[130px]"
          src={"/logo.svg"}
          width={50}
          height={10}
          alt="storyvord-logo"
        />
        <h3 className=" font-poppins-semibold text-gray-600 hidden md:block">Help Center</h3>
      </Link>
      <ul className="flex space-x-4">
        <li>
          <button
            onClick={() => router.back()}
            className="hover:text-gray-300 text-sm md:text-base font-poppins-medium"
          >
            Go Back
          </button>
        </li>
        <li>
          <Link
            href="/dashboard"
            className="hover:text-gray-300 text-sm md:text-base font-poppins-medium"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-gray-300 text-sm md:text-base font-poppins-medium">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
