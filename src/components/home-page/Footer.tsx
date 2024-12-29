"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";
import TermsAndConditions from "../TermsAndConditions";
import { useState } from "react";

export function Footer() {
  const [openDialog, setOpenDialog] = useState(false);
  const t = useTranslations("HomePage.Footer");
  const currentYear = new Date().getFullYear();
  return (
    <footer className=" bg-[#FAFAFA] mt-6 py-3 flex flex-col items-center justify-between">
      <div className="container flex flex-col md:flex-row justify-between items-center border-b pb-2">
        <div className=" md:mb-0">
          <Link href="/" className="text-xl font-bold">
            <Image src="/logo.svg" width={130} height={50} alt="logo" className=" w-40" />
          </Link>
        </div>
        <div className="container mt-4 text-center text-sm text-gray-600 flex gap-10 items-center justify-center">
          <button onClick={() => setOpenDialog(!openDialog)}>Privacy Policy</button>
          <button onClick={() => setOpenDialog(!openDialog)}>Terms & Condtion</button>
        </div>
        <div className="flex items-center space-x-6 mt-4 ">
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <Image
              src="/icons/social/x.svg"
              width={130}
              height={50}
              alt="logo"
              className=" w-6 h-6"
            />
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <Image
              src="/icons/social/instagram.svg"
              width={130}
              height={50}
              alt="logo"
              className=" w-6 h-6"
            />
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <Image
              src="/icons/social/youtube.svg"
              width={130}
              height={50}
              alt="logo"
              className=" w-6 h-6"
            />
          </Link>
        </div>
        <div className=" justify-self-end pt-4 pl-4">
          <LanguageSwitcher />
        </div>
      </div>
      <p className="py-4">
        {" "}
        © {currentYear} {t("rights")}
      </p>
      <TermsAndConditions openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </footer>
  );
}
